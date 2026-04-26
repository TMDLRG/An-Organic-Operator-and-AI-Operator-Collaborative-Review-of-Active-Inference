defmodule AoaiopAgents.MixProject do
  @moduledoc """
  Active inference agents implemented under the Jido contract.

  See ../../AGENTS.md for the binding rules:
    * pure cmd/2 (no I/O)
    * directives describe effects
    * Zoi-first schemas
    * Jido.Signal for inter-agent communication
    * AgentServer wraps the cmd loop
  """
  use Mix.Project

  def project do
    [
      app: :aoaiop_agents,
      version: "0.1.0",
      elixir: "~> 1.18",
      deps: deps(),
      elixirc_paths: ["lib"],
      aliases: [q: ["format --check-formatted", "compile --warnings-as-errors", "credo --strict", "test"]]
    ]
  end

  def application do
    [extra_applications: [:logger], mod: {AoaiopAgents.Application, []}]
  end

  defp deps do
    [
      # Pin to the operator-supplied Jido submodule.  Once the submodule
      # at /jido is initialised, switch the path: dependency to a git
      # ref pinned to v2.2.0.
      {:jido, "~> 2.2", optional: true},
      {:zoi, "~> 0.4"},
      {:credo, "~> 1.7", only: [:dev, :test], runtime: false}
    ]
  end
end
