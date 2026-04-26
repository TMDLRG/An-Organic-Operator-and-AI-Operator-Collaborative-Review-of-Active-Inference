defmodule AoaiopAgents.DiscreteAgentTest do
  use ExUnit.Case, async: true
  alias AoaiopAgents.DiscreteAgent

  test "init/0 starts at uniform belief" do
    a = DiscreteAgent.init()
    assert a.q_eta1 == 0.5
    assert a.step == 0
    assert a.history == []
  end

  test "cmd/2 with obs=1 increases belief in eta=1" do
    a = DiscreteAgent.init()
    {a1, [{:emit_action, _}]} = DiscreteAgent.cmd(a, %{obs: 1, true_eta: 1})
    assert a1.q_eta1 > 0.5
    assert a1.step == 1
  end

  test "cmd/2 is pure: same input -> same output" do
    a = DiscreteAgent.init()
    r1 = DiscreteAgent.cmd(a, %{obs: 1, true_eta: 1})
    r2 = DiscreteAgent.cmd(a, %{obs: 1, true_eta: 1})
    assert r1 == r2
  end

  test "cmd/2 produces F[q] >= surprisal (variational bound)" do
    a = DiscreteAgent.init()
    {a1, _} = DiscreteAgent.cmd(a, %{obs: 1, true_eta: 1})
    [%{f: f, surprisal: s}] = a1.history
    # After exact Bayesian update, q = posterior, so F == surprisal (tight).
    assert f >= s - 1.0e-9
  end
end
