// Active Inference agents — TypeScript reference implementation.
// Faithful to the variational identity F[q] = E_q[-ln p(y, η|m)] - H[q].
// Each agent maintains a variational posterior q over hidden state η,
// observes y, updates q to minimize F[q], and selects an action that
// drives expected future surprisal lower (epistemic + pragmatic value).
//
// The Jido (Elixir/OTP/BEAM) reference implementation lives in
// /ui/agents-elixir/. Both implementations should converge on the same
// belief trajectories given identical observation streams.

const ln = Math.log;
const PI = Math.PI;

// ----- Discrete two-state agent (Test 1 model) -----

export type DiscreteState = {
  step: number;
  qEta1: number;           // q(η=1) — agent's belief
  history: {
    step: number;
    obs: 0 | 1;            // observation
    action: 0 | 1;         // action selected
    qEta1: number;         // belief AFTER update on obs
    F: number;             // free energy at that belief
    surprisal: number;
  }[];
};

export type DiscreteParams = {
  pEta: [number, number];        // generative-process prior over η
  pY1Eta: [number, number];      // p(y=1 | η)
  // Action affects η transition: a=0 leaves η, a=1 flips η.
  flipProbOnAction1: number;     // 0..1
};

export const DEFAULT_DISCRETE_PARAMS: DiscreteParams = {
  pEta: [0.3, 0.7],
  pY1Eta: [0.2, 0.9],
  flipProbOnAction1: 0.6,
};

export function initDiscrete(): DiscreteState {
  return { step: 0, qEta1: 0.5, history: [] };
}

// One forward step of the agent: sample obs, do perceptual inference, select action.
export function stepDiscrete(
  state: DiscreteState,
  params: DiscreteParams,
  trueEta: 0 | 1,
  rng: () => number,
): { state: DiscreteState; trueEta: 0 | 1 } {
  // Sample observation
  const pY1 = params.pY1Eta[trueEta];
  const obs = (rng() < pY1 ? 1 : 0) as 0 | 1;

  // Perceptual inference: exact Bayesian update of q based on obs
  const prior = [1 - state.qEta1, state.qEta1];
  const lik = obs === 1 ? params.pY1Eta : params.pY1Eta.map((p) => 1 - p);
  const unnorm = [prior[0] * lik[0], prior[1] * lik[1]];
  const Z = unnorm[0] + unnorm[1];
  const post = [unnorm[0] / Z, unnorm[1] / Z];
  const qEta1 = post[1];

  // Free energy at the new belief, given the observation
  const q = [1 - qEta1, qEta1];
  const pEta = params.pEta;
  const joint = [pEta[0] * lik[0], pEta[1] * lik[1]];
  let energy = 0;
  for (let i = 0; i < 2; i++) if (q[i] > 0 && joint[i] > 0) energy += q[i] * (-ln(joint[i]));
  const Hq = -(q[0] > 0 ? q[0] * ln(q[0]) : 0) - (q[1] > 0 ? q[1] * ln(q[1]) : 0);
  const F = energy - Hq;
  const surprisal = -ln(joint[0] + joint[1]);

  // Action selection: pick the action that minimizes EXPECTED free energy.
  // We compare a=0 (no flip) vs a=1 (flip with prob flipProbOnAction1).
  function expectedFreeEnergyAfter(action: 0 | 1): number {
    // Predict next-step belief given action
    let nextEta1 = qEta1;
    if (action === 1) nextEta1 = qEta1 * (1 - params.flipProbOnAction1) + (1 - qEta1) * params.flipProbOnAction1;
    // Predicted observation distribution
    const pYpred = nextEta1 * params.pY1Eta[1] + (1 - nextEta1) * params.pY1Eta[0];
    // Expected surprisal of predicted observation = entropy of (pYpred, 1-pYpred)
    const H = -(pYpred > 0 ? pYpred * ln(pYpred) : 0) - (pYpred < 1 ? (1 - pYpred) * ln(1 - pYpred) : 0);
    return H;
  }
  const a0 = expectedFreeEnergyAfter(0);
  const a1 = expectedFreeEnergyAfter(1);
  const action = (a1 < a0 ? 1 : 0) as 0 | 1;

  // Generative process: update true η based on action
  let nextTrue = trueEta;
  if (action === 1 && rng() < params.flipProbOnAction1) {
    nextTrue = (trueEta === 0 ? 1 : 0) as 0 | 1;
  }

  const newState: DiscreteState = {
    step: state.step + 1,
    qEta1,
    history: [...state.history, { step: state.step + 1, obs, action, qEta1, F, surprisal }],
  };
  return { state: newState, trueEta: nextTrue };
}

// ----- Continuous Gaussian agent (Test 4 model) -----

export type GaussianState = {
  step: number;
  mq: number;
  vq: number;
  history: { step: number; obs: number; action: number; mq: number; vq: number; F: number; surprisal: number }[];
};

export type GaussianParams = {
  priorMean: number;
  priorVar: number;
  likVar: number;
  // Action shifts hidden η by (action * actionScale).
  actionScale: number;
};

export const DEFAULT_GAUSSIAN_PARAMS: GaussianParams = {
  priorMean: 0,
  priorVar: 4,
  likVar: 1,
  actionScale: 0.5,
};

export function initGaussian(p: GaussianParams = DEFAULT_GAUSSIAN_PARAMS): GaussianState {
  return { step: 0, mq: p.priorMean, vq: p.priorVar, history: [] };
}

function gaussianRandom(mean: number, std: number, rng: () => number): number {
  // Box-Muller
  const u1 = Math.max(rng(), 1e-12);
  const u2 = rng();
  const z = Math.sqrt(-2 * ln(u1)) * Math.cos(2 * PI * u2);
  return mean + std * z;
}

export function stepGaussian(
  state: GaussianState,
  params: GaussianParams,
  trueEta: number,
  rng: () => number,
): { state: GaussianState; trueEta: number } {
  // Observation y ~ N(η, likVar)
  const obs = gaussianRandom(trueEta, Math.sqrt(params.likVar), rng);

  // Perceptual inference: Gaussian-Gaussian conjugate update of q
  const prec = 1 / state.vq + 1 / params.likVar;
  const newVq = 1 / prec;
  const newMq = newVq * (state.mq / state.vq + obs / params.likVar);

  // F[q] = KL(q || posterior) + surprisal of y
  const margVar = state.vq + params.likVar;
  const surprisal = 0.5 * ln(2 * PI * margVar) + 0.5 * (obs - state.mq) ** 2 / margVar;
  // After update q = exact posterior, KL = 0, F = surprisal
  const F = surprisal;

  // Action: pick action ∈ {-1, 0, +1} that minimizes expected surprisal of NEXT obs.
  // We treat action as a control on η (e.g., we want η at the prior mean).
  function expectedSurprisalAfter(action: number): number {
    // Effect of action: shift η by action*actionScale
    const expectedNextEta = newMq + action * params.actionScale;
    // Expected surprisal at new mean (approximately the marginal entropy)
    const v = newVq + params.likVar;
    return 0.5 * ln(2 * PI * v); // Gaussian entropy term (constant in action mean)
  }
  // For a Gaussian with constant variance, expected surprisal doesn't depend on the mean.
  // So we use a richer rule: choose action to drive belief toward prior (homeostasis).
  const candidates = [-1, 0, 1];
  let best = 0;
  let bestDist = Infinity;
  for (const a of candidates) {
    const next = newMq + a * params.actionScale;
    const d = Math.abs(next - params.priorMean);
    if (d < bestDist) { bestDist = d; best = a; }
  }
  const action = best;

  // Generative process: update true η
  const nextTrue = trueEta + action * params.actionScale;

  const newState: GaussianState = {
    step: state.step + 1,
    mq: newMq,
    vq: newVq,
    history: [...state.history, { step: state.step + 1, obs, action, mq: newMq, vq: newVq, F, surprisal }],
  };
  return { state: newState, trueEta: nextTrue };
}

// Mulberry32 deterministic PRNG (32-bit, fast, used for replay).
export function mulberry32(seed: number): () => number {
  let t = seed >>> 0;
  return function () {
    t |= 0;
    t = (t + 0x6D2B79F5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
