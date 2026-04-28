// Pure-TypeScript port of audit_tests_v2.py.
// Numerically identical to the Python via IEEE 754 double-precision
// math.scalar ops (no BLAS, no Monte Carlo). Lets the UI run the tests
// instantly without booting Pyodide.
//
// Keep in sync with manuscript-v2-reproducibility/audit_tests_v2.py.
//
// Note: Math.log in V8 uses the same hardware FMA as Python's math.log,
// so values agree to 1 ulp. For the audit's bit-identical claim,
// reference_output.txt is the Python-generated source of truth.

const ln = Math.log;
const PI = Math.PI;

export function entropyDiscrete(q: number[]): number {
  let s = 0;
  for (const qi of q) if (qi > 0) s -= qi * ln(qi);
  return s;
}

export function klDiscrete(q: number[], p: number[]): number {
  let s = 0;
  for (let i = 0; i < q.length; i++) {
    const qi = q[i], pi = p[i];
    if (qi <= 0) continue;
    if (pi <= 0) return Infinity; // support mismatch
    s += qi * ln(qi / pi);
  }
  return s;
}

export function klTwoGaussians(mq: number, vq: number, mp: number, vp: number): number {
  return 0.5 * (ln(vp / vq) + vq / vp + (mq - mp) ** 2 / vp - 1);
}

// --- TEST 1: Discrete two-state model ---
export function test1(qEta1 = 0.5) {
  const pEta = [0.3, 0.7];
  const pY1Eta = [0.2, 0.9];
  const pY1 = pEta[0] * pY1Eta[0] + pEta[1] * pY1Eta[1];
  const surprisal = -ln(pY1);
  const post = [pY1Eta[0] * pEta[0] / pY1, pY1Eta[1] * pEta[1] / pY1];
  const q = [1 - qEta1, qEta1];
  const joint = [pY1Eta[0] * pEta[0], pY1Eta[1] * pEta[1]];
  let energy = 0;
  for (let i = 0; i < 2; i++) if (q[i] > 0 && joint[i] > 0) energy += q[i] * (-ln(joint[i]));
  const Hq = entropyDiscrete(q);
  const F1 = energy - Hq;
  const F2 = klDiscrete(q, post) + surprisal;
  const elbo = -F1;
  return { pY1, surprisal, post, F1, F2, elbo, kl: klDiscrete(q, post) };
}

// --- TEST 2: KL monotonicity sweep ---
export function test2() {
  const sweepQ = [0.05, 0.20, 0.50, 0.70, 0.913043478, 0.99];
  return sweepQ.map((q1) => {
    const r = test1(q1);
    return { q1, F: r.F1, kl: r.kl, diff: r.F1 - r.surprisal };
  });
}

// --- TEST 3: Support mismatch (degenerate posterior) ---
export function test3() {
  // If p(eta=0|y) = 0 (degenerate posterior), then KL(uniform q || posterior) is +inf.
  // Demonstrate by taking p(y=1|eta=0) = 0.
  const pEta = [0.3, 0.7];
  const pY1Eta = [0.0, 1.0];
  const pY1 = pEta[0] * pY1Eta[0] + pEta[1] * pY1Eta[1];
  const post = [0, 1];
  const q = [0.5, 0.5];
  const kl = klDiscrete(q, post);
  return { pY1, post, kl, status: kl === Infinity ? "+inf (caught)" : "finite" };
}

// --- TEST 4: Gaussian conjugate ---
export function test4(mq = 1.2, vq = 0.8) {
  const priorMean = 0, priorVar = 4;
  const likVar = 1, yObs = 1.5;
  // Posterior of Gaussian-Gaussian conjugate
  const postPrec = 1 / priorVar + 1 / likVar;
  const postVar = 1 / postPrec;
  const postMean = postVar * (priorMean / priorVar + yObs / likVar);
  // Marginal p(y) = N(y; priorMean, priorVar + likVar)
  const margVar = priorVar + likVar;
  const surprisal = 0.5 * ln(2 * PI * margVar) + 0.5 * (yObs - priorMean) ** 2 / margVar;
  const kl = klTwoGaussians(mq, vq, postMean, postVar);
  const F = surprisal + kl;
  return { postMean, postVar, surprisal, kl, F };
}

// --- TEST 5: F + ELBO = 0 sign convention ---
export function test5() {
  const r = test1(0.5);
  return { F: r.F1, elbo: r.elbo, sum: r.F1 + r.elbo, surprisal: r.surprisal };
}

// --- TEST 6: iid surprisal vs literal expansion ---
export function test6() {
  const y = [0, 1, 1, 1, 0];
  const pOne = 0.7;
  const perObs = y.map((v) => (v === 1 ? pOne : 1 - pOne));
  const iidSurprisal = -perObs.reduce((a, p) => a + ln(p), 0);
  const literalMarg = 0.69;
  const I = 5;
  const literal = -I * ln(literalMarg);
  return { y, perObs, iidSurprisal, literal, diff: iidSurprisal - literal };
}

// --- TEST 7: Measure transformation ---
export function test7() {
  const Eeta2 = 1; // E[eta^2] for N(0,1)
  const Er2 = 4 + 9; // E[r^2] for r = 2eta + 3 ~ N(3, 4)
  return { Eeta2, Er2, diff: Er2 - Eeta2 };
}

// --- TEST 8: Markov blanket CI factorization ---
export function test8() {
  const pEta = [0.4, 0.6];
  const pSEta = [[0.7, 0.3], [0.2, 0.8]];
  const pRS = [[0.8, 0.2], [0.3, 0.7]];
  const joint: Record<string, number> = {};
  for (let e = 0; e < 2; e++)
    for (let s = 0; s < 2; s++)
      for (let r = 0; r < 2; r++)
        for (let a = 0; a < 2; a++) {
          const v = a === r ? pEta[e] * pSEta[e][s] * pRS[s][r] : 0;
          joint[`${e},${s},${r},${a}`] = v;
        }
  let total = 0;
  for (const k in joint) total += joint[k];
  const settings: { s: number; a: number; pb: number; max: number }[] = [];
  let overall = 0;
  for (let s = 0; s < 2; s++)
    for (let a = 0; a < 2; a++) {
      let pb = 0;
      for (let e = 0; e < 2; e++) for (let r = 0; r < 2; r++) pb += joint[`${e},${s},${r},${a}`];
      if (pb === 0) { settings.push({ s, a, pb: 0, max: 0 }); continue; }
      const cond: Record<string, number> = {};
      for (let e = 0; e < 2; e++) for (let r = 0; r < 2; r++) cond[`${e},${r}`] = joint[`${e},${s},${r},${a}`] / pb;
      const margE = [0, 0]; const margR = [0, 0];
      for (let e = 0; e < 2; e++) for (let r = 0; r < 2; r++) {
        margE[e] += cond[`${e},${r}`];
        margR[r] += cond[`${e},${r}`];
      }
      let mx = 0;
      for (let e = 0; e < 2; e++) for (let r = 0; r < 2; r++) {
        mx = Math.max(mx, Math.abs(cond[`${e},${r}`] - margE[e] * margR[r]));
      }
      settings.push({ s, a, pb, max: mx });
      overall = Math.max(overall, mx);
    }
  return { total, settings, overall, bound: 5e-16 };
}

// --- TEST 9: Sign error in B-1 ---
export function test9() {
  const q = [0.5, 0.5];
  const pEta = [0.3, 0.7];
  const pY1Eta = [0.2, 0.9];
  const joint = [pY1Eta[0] * pEta[0], pY1Eta[1] * pEta[1]];
  const HmarenAsWritten = q[0] * ln(joint[0]) + q[1] * ln(joint[1]);
  const Ustandard = -HmarenAsWritten;
  const Hq = entropyDiscrete(q);
  return {
    HmarenAsWritten,
    Ustandard,
    Hq,
    Fstandard: Ustandard - Hq,
    FwithBugged: HmarenAsWritten - Hq,
  };
}

// --- TEST 10: Bethe vs F[q] ---
export function test10(h = 1.2) {
  const pAA = 0.25, pAB = 0.25, pBA = 0.25, pBB = 0.25;
  const correlation = pAA + pBB - pAB - pBA;
  const energy = -ln(h) * correlation;
  const Hpair = -(pAA * ln(pAA) + pAB * ln(pAB) + pBA * ln(pBA) + pBB * ln(pBB));
  const Hsite = -(0.5 * ln(0.5) + 0.5 * ln(0.5));
  const Fbethe = energy - (Hpair - Hsite);
  const Fai = test1(0.5).F1;
  return { correlation, energy, Hpair, Hsite, Fbethe, Fai, dist: Math.abs(Fbethe - Fai) };
}

// --- TEST 11: Three forms agree ---
export function test11Discrete(qEta1 = 0.5) {
  const pEta = [0.3, 0.7];
  const pY1Eta = [0.2, 0.9];
  const r = test1(qEta1);
  const q = [1 - qEta1, qEta1];
  const complexity = q.reduce((a, qi, i) => a + (qi > 0 ? qi * ln(qi / pEta[i]) : 0), 0);
  const accuracy = q.reduce((a, qi, i) => a + qi * ln(pY1Eta[i]), 0);
  const F3 = complexity - accuracy;
  return { F1: r.F1, F2: r.F2, F3, agree: Math.abs(r.F1 - F3) < 1e-12 };
}

export const TEST_DEFS = [
  { id: 1,  title: "Discrete two-state model",         desc: "Master identity F[q] = E[-ln p(y,η)] - H[q] holds; bound F[q] ≥ -ln p(y) tight at q=posterior." },
  { id: 2,  title: "KL monotonicity sweep",            desc: "F[q] - surprisal = KL(q || posterior). KL is monotone in distance from exact posterior." },
  { id: 3,  title: "Support mismatch caught",           desc: "If posterior is degenerate and q has mass off-support, KL diverges. A2 (q << p) is essential." },
  { id: 4,  title: "Gaussian conjugate (closed-form)",  desc: "Continuous case via closed-form KL between Gaussians; no Monte Carlo required." },
  { id: 5,  title: "F + ELBO = 0 (sign convention)",    desc: "Friston-style F is the negative of Beal-style ELBO; F is an UPPER bound on surprisal." },
  { id: 6,  title: "iid surprisal vs literal expansion","desc": "iid surprisal of (0,1,1,1,0) = 3.4780 ≠ -I·ln p(y) = 1.8553. Maren Eqn 13 is incoherent without iid factorization with distinct indices." },
  { id: 7,  title: "Measure transformation matters",   desc: "E_η[η²]=1 ≠ E_r[r²]=13 for r=2η+3 — integration variable rename without Jacobian changes the value." },
  { id: 8,  title: "Markov blanket CI factorization",   desc: "η ⊥ r | (s,a) holds to machine precision (~1.1e-16) on the constructed chain." },
  { id: 9,  title: "Appendix B sign repair",            desc: "Adding the missing minus sign to Maren Eqn B-1 recovers the standard form; B-8 already has it." },
  { id: 10, title: "Bethe vs F[q] (illustrative)",      desc: "Bethe cluster F and active-inference F[q] both have energy-minus-entropy form, but take different values." },
  { id: 11, title: "Complexity-Accuracy form (Form 3)", desc: "F = D_KL(q || prior) - E_q[ln p(y|η)] agrees with Forms 1 and 2 to floating-point precision." },
] as const;
