"""Test 2: bad approximate posterior -- F tracks KL exactly.

Setup: same toy model as Test 1.

Acceptance:
    For every q in a sweep, F[q] - surprisal == KL(q || posterior).
    KL is monotone in distance from the exact posterior on each side.
"""

import math
import pytest

P_ETA = (0.3, 0.7)
P_Y1_GIVEN_ETA = (0.2, 0.9)
P_Y1 = sum(pe * py for pe, py in zip(P_ETA, P_Y1_GIVEN_ETA))
SURPRISAL = -math.log(P_Y1)
EXACT_POST = tuple(P_Y1_GIVEN_ETA[i] * P_ETA[i] / P_Y1 for i in range(2))
EXACT_Q1 = EXACT_POST[1]  # ~0.913043


def F_form1(q):
    energy = sum(q[i] * (-math.log(P_Y1_GIVEN_ETA[i] * P_ETA[i])) for i in range(2))
    H = -sum(qi * math.log(qi) for qi in q if qi > 0)
    return energy - H


def kl(q, p):
    return sum(qi * math.log(qi / pi) for qi, pi in zip(q, p) if qi > 0)


SWEEP = [0.05, 0.20, 0.50, 0.70, 0.913043, 0.99]


@pytest.mark.parametrize("q1", SWEEP)
def test_F_minus_surprisal_equals_KL(q1):
    """F[q] - surprisal == KL(q || posterior) exactly."""
    q = (1 - q1, q1)
    expected_kl = kl(q, EXACT_POST)
    actual_gap = F_form1(q) - SURPRISAL
    assert actual_gap == pytest.approx(expected_kl, abs=1e-12)


def test_KL_monotone_below_exact():
    """KL increases as q1 moves below the exact posterior."""
    q1_values = [v for v in SWEEP if v < EXACT_Q1]
    kl_values = [kl((1 - q1, q1), EXACT_POST) for q1 in q1_values]
    # Closer to exact (larger q1) should have smaller KL.
    for i in range(len(kl_values) - 1):
        assert kl_values[i] > kl_values[i + 1], (
            f"KL not monotone below exact: {kl_values}"
        )


def test_KL_zero_at_exact():
    """KL is zero (to machine precision) at the exact posterior."""
    q = EXACT_POST
    assert abs(kl(q, EXACT_POST)) < 1e-12
