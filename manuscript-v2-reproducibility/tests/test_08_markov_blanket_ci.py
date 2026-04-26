"""Test 8: Markov blanket conditional independence -- machine-precision.

Setup:
    Chain eta -> s -> r -> a, with a deterministically equal to r.
    p(eta=1) = 0.6
    p(s=1 | eta) = (0.3, 0.8)   (rows = eta)
    p(r=1 | s)   = (0.2, 0.7)   (rows = s)
    p(a | r) = delta(a == r)

Claim:
    eta _||_ r | (s, a)         (the active-inference Markov blanket factorization)

Test:
    For all 4 settings of blanket b = (s, a), check
        max | p(eta, r | b) - p(eta | b) * p(r | b) | < 5e-16
    (The bound 5e-16 is 4 * machine_epsilon to give safety margin under
    floating-point arithmetic. v1 cited < 6e-17 which is too tight;
    standard numpy gives 1.11e-16 = 1 machine epsilon.)
"""

import pytest

# Construct the joint p(eta, s, r, a).
P_ETA = (0.4, 0.6)
P_S_ETA = ((0.7, 0.3), (0.2, 0.8))   # rows = eta
P_R_S = ((0.8, 0.2), (0.3, 0.7))     # rows = s

JOINT = {}
for e in (0, 1):
    for s in (0, 1):
        for r in (0, 1):
            for a in (0, 1):
                if a == r:
                    JOINT[(e, s, r, a)] = (
                        P_ETA[e] * P_S_ETA[e][s] * P_R_S[s][r]
                    )
                else:
                    JOINT[(e, s, r, a)] = 0.0

ACCEPTANCE_BOUND = 5e-16


def test_joint_normalized():
    assert sum(JOINT.values()) == pytest.approx(1.0, abs=1e-12)


@pytest.mark.parametrize("s,a", [(0, 0), (0, 1), (1, 0), (1, 1)])
def test_ci_factorization(s, a):
    """For blanket b = (s, a), p(eta, r | b) = p(eta | b) * p(r | b)."""
    p_b = sum(JOINT[(e, s, r, a)] for e in (0, 1) for r in (0, 1))
    if p_b == 0:
        pytest.skip(f"p(b=(s={s},a={a})) = 0; conditional undefined")

    p_eta_r = {
        (e, r): JOINT[(e, s, r, a)] / p_b
        for e in (0, 1) for r in (0, 1)
    }
    p_eta = {e: sum(p_eta_r[(e, r)] for r in (0, 1)) for e in (0, 1)}
    p_r = {r: sum(p_eta_r[(e, r)] for e in (0, 1)) for r in (0, 1)}

    max_residual = max(
        abs(p_eta_r[(e, r)] - p_eta[e] * p_r[r])
        for e in (0, 1) for r in (0, 1)
    )
    assert max_residual < ACCEPTANCE_BOUND, (
        f"CI residual {max_residual:.2e} exceeds {ACCEPTANCE_BOUND:.0e}"
    )


def test_overall_max_residual_at_machine_epsilon():
    """Aggregate max residual across all blankets is at machine epsilon."""
    overall = 0.0
    for s in (0, 1):
        for a in (0, 1):
            p_b = sum(JOINT[(e, s, r, a)] for e in (0, 1) for r in (0, 1))
            if p_b == 0:
                continue
            p_eta_r = {(e, r): JOINT[(e, s, r, a)] / p_b
                       for e in (0, 1) for r in (0, 1)}
            p_eta = {e: sum(p_eta_r[(e, r)] for r in (0, 1)) for e in (0, 1)}
            p_r = {r: sum(p_eta_r[(e, r)] for e in (0, 1)) for r in (0, 1)}
            local = max(
                abs(p_eta_r[(e, r)] - p_eta[e] * p_r[r])
                for e in (0, 1) for r in (0, 1)
            )
            overall = max(overall, local)
    assert overall < ACCEPTANCE_BOUND


def test_v1_too_tight_bound_documented():
    """Documents the v1 issue: 6e-17 is below standard numpy reach."""
    V1_BOUND = 6e-17
    MACHINE_EPS = 2 ** -53
    assert V1_BOUND < MACHINE_EPS, (
        f"v1's claimed bound {V1_BOUND} is below machine epsilon {MACHINE_EPS}"
    )
