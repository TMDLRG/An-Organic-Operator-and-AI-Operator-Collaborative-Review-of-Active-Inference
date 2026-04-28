defmodule AoaiopAgents.DiscreteAgent do
  @moduledoc """
  Discrete two-state active-inference agent under the Jido contract.

  Mirrors `manuscript-v2-reproducibility/audit_tests_v2.py` Test 1:
  η ∈ {0,1}, observation y ∈ {0,1}, p(η=1) = 0.7, p(y=1|η=1) = 0.9.

  ## cmd/2 contract (pure, see /AGENTS.md)

  Input:  `{agent, %{obs: 0|1, true_eta: 0|1}}`
  Output: `{agent_with_updated_belief, [directive_emit_action]}`

  No I/O, no PRNG, no `Process.sleep/1`. Same input → same output.

  When the upstream Jido submodule is initialised at /jido this module
  becomes a thin shim around `use Jido.Agent`. While the submodule is
  not yet wired, this file defines the pure-functional core so the
  contract is testable without Jido itself.
  """

  defstruct step: 0, q_eta1: 0.5, history: []

  @type t :: %__MODULE__{step: non_neg_integer, q_eta1: float, history: list}

  @p_eta {0.3, 0.7}
  @p_y1_eta {0.2, 0.9}
  @flip_prob_on_action1 0.6

  @spec init() :: t()
  def init, do: %__MODULE__{}

  @doc """
  Pure step. Takes the current agent and an observation; returns
  the updated agent and a directive describing the action to take.
  """
  @spec cmd(t(), %{obs: 0 | 1, true_eta: 0 | 1}) ::
          {t(), [{:emit_action, 0 | 1}]}
  def cmd(%__MODULE__{} = agent, %{obs: obs, true_eta: true_eta})
      when obs in [0, 1] and true_eta in [0, 1] do
    {p_eta0, p_eta1} = @p_eta
    {p_y_eta0, p_y_eta1} = @p_y1_eta

    prior = {1.0 - agent.q_eta1, agent.q_eta1}
    lik =
      if obs == 1 do
        {p_y_eta0, p_y_eta1}
      else
        {1.0 - p_y_eta0, 1.0 - p_y_eta1}
      end

    {prior0, prior1} = prior
    {lik0, lik1} = lik
    u0 = prior0 * lik0
    u1 = prior1 * lik1
    z = u0 + u1

    new_q_eta1 = u1 / z

    joint0 = p_eta0 * lik0
    joint1 = p_eta1 * lik1
    surprisal = -:math.log(joint0 + joint1)

    energy =
      [{1.0 - new_q_eta1, joint0}, {new_q_eta1, joint1}]
      |> Enum.reduce(0.0, fn
        {q, j}, acc when q > 0 and j > 0 -> acc + q * -:math.log(j)
        _, acc -> acc
      end)

    h_q =
      Enum.reduce([1.0 - new_q_eta1, new_q_eta1], 0.0, fn
        q, acc when q > 0 -> acc - q * :math.log(q)
        _, acc -> acc
      end)

    f = energy - h_q

    action = select_action(new_q_eta1)

    history_entry = %{
      step: agent.step + 1,
      obs: obs,
      action: action,
      q_eta1: new_q_eta1,
      f: f,
      surprisal: surprisal,
      true_eta: true_eta
    }

    new_agent = %{
      agent
      | step: agent.step + 1,
        q_eta1: new_q_eta1,
        history: [history_entry | agent.history]
    }

    {new_agent, [{:emit_action, action}]}
  end

  @spec select_action(float) :: 0 | 1
  defp select_action(q_eta1) do
    {_, p_y_eta1} = @p_y1_eta
    {p_y_eta0, _} = @p_y1_eta
    a0 = expected_obs_entropy(q_eta1, 0, p_y_eta0, p_y_eta1)
    a1 = expected_obs_entropy(q_eta1, 1, p_y_eta0, p_y_eta1)
    if a1 < a0, do: 1, else: 0
  end

  defp expected_obs_entropy(q_eta1, action, p_y_eta0, p_y_eta1) do
    next_eta1 =
      case action do
        0 -> q_eta1
        1 -> q_eta1 * (1.0 - @flip_prob_on_action1) + (1.0 - q_eta1) * @flip_prob_on_action1
      end

    p_y = next_eta1 * p_y_eta1 + (1.0 - next_eta1) * p_y_eta0
    h0 = if p_y > 0, do: -p_y * :math.log(p_y), else: 0.0
    h1 = if p_y < 1, do: -(1 - p_y) * :math.log(1 - p_y), else: 0.0
    h0 + h1
  end
end
