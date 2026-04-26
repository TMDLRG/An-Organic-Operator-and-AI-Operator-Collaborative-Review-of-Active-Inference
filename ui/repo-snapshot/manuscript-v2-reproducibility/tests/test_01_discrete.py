"""Test 1: discrete two-state model -- master identity and bound.

Setup:
    eta in {0, 1}; p(eta=0) = 0.3, p(eta=1) = 0.7.
    p(y=1 | eta=0) = 0.2, p(y=1 | eta=1) = 0.9.
    Observe y = 1.

Acceptance:
    1. Both forms of F[q] (energy-minus-entropy and KL-plus-surprisal) agree
       to floating-point precision for several q values.
    2. F[q] >= surprisal at every q.
    3. Equality F[q] = surprisal iff q = exact posterior.
    4. F[q] = -ELBO[q] exactly.

This test is fully deterministic; no RNG.
"""

import math
import pytest

# Setup -----------------------------------------------------------------------
P_ETA = (0.3, 0.7)
P_Y1_GIVEN_ETA = (0.2, 0.9)
P_Y1 = sum(pe * py for pe, py in zip(P_ETA, P_Y1_GIVEN_ETA))
SURPRISAL = -math.log(P_Y1)
EXACT_POST = tuple(
    P_Y1_GIVEN_ETA[i] * P_ETA[i] / P_Y1 for i in range(2)
)


def kl_discrete(q, p):
    return sum(qi * math.log(qi / pi) for qi, pi in zip(q, p) if qi > 0)


def entropy_discrete(q):
    return -sum(qi * math.log(qi) for qi in q if qi > 0)


def F_form1(q):
    """F = E_q[-ln p(y, eta)] - H[q]."""
    energy = sum(
        q[i] * (-math.log(P_Y1_GIVEN_ETA[i] * P_ETA[i])) for i in range(2)
    )
    return energy - entropy_discrete(q)


def F_form2(q):
    """F = D_KL(q || posterior) + surprisal."""
    return kl_discrete(q, EXACT_POST) + SURPRISAL


def ELBO(q):
    """ELBO = E_q[ln p(y, eta)] + H[q]."""
    accuracy = sum(
        q[i] * math.log(P_Y1_GIVEN_ETA[i] * P_ETA[i]) for i in range(2)
    )
    return accuracy + entropy_discrete(q)


# Tests -----------------------------------------------------------------------

def test_marginal_evidence():
    assert P_Y1 == pytest.approx(0.69, abs=1e-12)


def test_surprisal_value():
    assert SURPRISAL == pytest.approx(0.37106368139083207, abs=1e-12)


def test_exact_posterior():
    assert EXACT_POST[1] == pytest.approx(0.9 * 0.7 / 0.69, abs=1e-12)
    assert EXACT_POST[0] + EXACT_POST[1] == pytest.approx(1.0, abs=1e-12)


@pytest.mark.parametrize("q1", [0.5, 0.913043, 0.95, 0.05, 0.99])
def test_two_forms_agree(q1):
    """Form 1 and Form 2 of F[q] must give identical values."""
    q = (1 - q1, q1)
    assert F_form1(q) == pytest.approx(F_form2(q), abs=1e-12)


@pytest.mark.parametrize("q1", [0.05, 0.20, 0.5, 0.7, 0.913043, 0.95, 0.99])
def test_bound_holds(q1):
    """F[q] >= surprisal at every q."""
    q = (1 - q1, q1)
    assert F_form1(q) >= SURPRISAL - 1e-12


def test_bound_tight_at_exact_posterior():
    """F[q] = surprisal exactly when q = exact posterior."""
    q = EXACT_POST
    assert F_form1(q) == pytest.approx(SURPRISAL, abs=1e-12)


@pytest.mark.parametrize("q1", [0.5, 0.913043, 0.95, 0.05, 0.99])
def test_F_equals_minus_ELBO(q1):
    """F[q] + ELBO[q] = 0 exactly."""
    q = (1 - q1, q1)
    assert F_form1(q) + ELBO(q) == pytest.approx(0.0, abs=1e-12)
