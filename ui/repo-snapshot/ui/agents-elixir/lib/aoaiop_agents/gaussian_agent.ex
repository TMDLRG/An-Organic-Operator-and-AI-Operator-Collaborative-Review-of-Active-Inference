defmodule AoaiopAgents.GaussianAgent do
  @moduledoc """
  Continuous Gaussian active-inference agent.

  Mirrors `manuscript-v2-reproducibility/audit_tests_v2.py` Test 4:
  prior N(0, 4), likelihood N(y; η, 1). The agent maintains a Gaussian
  variational posterior and selects an action ∈ {-1, 0, +1} that drives
  belief mean toward the homeostatic prior mean.

  cmd/2 is pure: takes the agent and an observation; returns the
  conjugate-updated posterior plus a directive describing the action.
  """

  defstruct step: 0, m_q: 0.0, v_q: 4.0, history: []

  @type t :: %__MODULE__{step: non_neg_integer, m_q: float, v_q: float, history: list}

  @prior_mean 0.0
  @prior_var 4.0
  @lik_var 1.0
  @action_scale 0.5

  @spec init() :: t()
  def init, do: %__MODULE__{m_q: @prior_mean, v_q: @prior_var}

  @spec cmd(t(), %{obs: float, true_eta: float}) ::
          {t(), [{:emit_action, integer}]}
  def cmd(%__MODULE__{} = agent, %{obs: obs, true_eta: true_eta})
      when is_number(obs) and is_number(true_eta) do
    prec = 1.0 / agent.v_q + 1.0 / @lik_var
    new_v_q = 1.0 / prec
    new_m_q = new_v_q * (agent.m_q / agent.v_q + obs / @lik_var)

    marg_var = agent.v_q + @lik_var
    surprisal = 0.5 * :math.log(2 * :math.pi() * marg_var) + 0.5 * :math.pow(obs - agent.m_q, 2) / marg_var
    f = surprisal

    action = select_action(new_m_q)

    history_entry = %{
      step: agent.step + 1,
      obs: obs,
      action: action,
      m_q: new_m_q,
      v_q: new_v_q,
      f: f,
      surprisal: surprisal,
      true_eta: true_eta
    }

    new_agent = %{
      agent
      | step: agent.step + 1,
        m_q: new_m_q,
        v_q: new_v_q,
        history: [history_entry | agent.history]
    }

    {new_agent, [{:emit_action, action}]}
  end

  @spec select_action(float) :: -1 | 0 | 1
  defp select_action(m_q) do
    candidates = [{-1, m_q - @action_scale}, {0, m_q}, {1, m_q + @action_scale}]

    {best, _} =
      Enum.min_by(candidates, fn {_a, next} -> abs(next - @prior_mean) end)

    best
  end
end
