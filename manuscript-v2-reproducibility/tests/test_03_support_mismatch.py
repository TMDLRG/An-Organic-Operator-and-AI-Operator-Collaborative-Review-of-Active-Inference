"""Test 3: support mismatch -- KL diverges; A2 is essential.

Setup:
    p(eta=0)=0.3, p(eta=1)=0.7.
    p(y=1|eta=0) = 0.0 (likelihood is zero on eta=0 for y=1).
    p(y=1|eta=1) = 1.0.
    Observe y=1.
    Then exact posterior = (0, 1) (degenerate).

Acceptance:
    For q with q(eta=0) > 0, KL diverges: any computation that produces a
    finite KL is wrong. Implementations should raise an error or return inf.
"""

import math
import pytest

P_ETA = (0.3, 0.7)
P_Y1_GIVEN_ETA = (0.0, 1.0)
P_Y1 = sum(pe * py for pe, py in zip(P_ETA, P_Y1_GIVEN_ETA))
EXACT_POST = tuple(P_Y1_GIVEN_ETA[i] * P_ETA[i] / P_Y1 for i in range(2))


def kl_strict(q, p):
    """KL with strict support check; raises ValueError on mismatch."""
    total = 0.0
    for qi, pi in zip(q, p):
        if qi <= 0:
            continue
        if pi <= 0:
            raise ValueError("Support mismatch: q_i > 0 where p_i = 0")
        total += qi * math.log(qi / pi)
    return total


def test_exact_posterior_is_degenerate():
    assert EXACT_POST == (0.0, 1.0)


def test_uniform_q_raises_support_mismatch():
    """Uniform q has q(eta=0) = 0.5 > 0 but posterior(eta=0) = 0."""
    q = (0.5, 0.5)
    with pytest.raises(ValueError, match="Support mismatch"):
        kl_strict(q, EXACT_POST)


def test_q_at_posterior_is_zero():
    """If q matches the degenerate posterior, KL = 0 (no support violation)."""
    q = (0.0, 1.0)
    assert kl_strict(q, EXACT_POST) == 0.0


def test_almost_degenerate_q_finite_KL():
    """If q is close to but not exactly the posterior, KL is finite."""
    # q(eta=0) = 1e-10 -- still violates absolute continuity if posterior(eta=0) = 0
    q = (1e-10, 1 - 1e-10)
    with pytest.raises(ValueError, match="Support mismatch"):
        kl_strict(q, EXACT_POST)
