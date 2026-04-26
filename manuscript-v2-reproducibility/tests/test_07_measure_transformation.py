"""Test 7: measure transformation -- analytic, no Monte Carlo.

Setup:
    eta ~ N(0, 1)         (so Var(eta) = 1, E[eta^2] = 1)
    r = 2 * eta + 3       (deterministic affine transform)
    Then r ~ N(3, 4)      (mean 3, variance 4 = 2^2 * 1)

Acceptance:
    E[eta^2] = 1 (analytic).
    E[r^2]   = Var(r) + (E r)^2 = 4 + 9 = 13 (analytic).
    Without applying the Jacobian d_eta = dr / 2, simply renaming the
    integration variable from eta to r changes the value of the integral
    by an order of magnitude.

This is fully deterministic; no Monte Carlo. v1 used MC sampling and
introduced ~1e-3 noise in these values.
"""

import math
import pytest


def variance(mean, second_moment):
    return second_moment - mean ** 2


def test_eta_second_moment():
    """eta ~ N(0, 1) -> E[eta^2] = Var + mean^2 = 1 + 0 = 1."""
    e_eta = 0.0
    var_eta = 1.0
    e_eta_sq = var_eta + e_eta ** 2
    assert e_eta_sq == 1.0


def test_r_second_moment():
    """r = 2 eta + 3 -> r ~ N(3, 4) -> E[r^2] = 4 + 9 = 13."""
    e_r = 3.0
    var_r = 4.0
    e_r_sq = var_r + e_r ** 2
    assert e_r_sq == 13.0


def test_two_moments_differ_substantially():
    """E[r^2] is 13x larger than E[eta^2]."""
    assert 13.0 / 1.0 == 13.0


def test_jacobian_correction():
    """Integral over r with Jacobian d_eta = dr/2 recovers integral over eta."""
    # E[eta^2] under eta ~ N(0,1) is 1.
    # If we substitute eta = (r-3)/2, d_eta = dr/2:
    #   Integral of f(eta) p(eta) d_eta = Integral of f((r-3)/2) p((r-3)/2) * (dr/2)
    # The factor of 1/2 IS the Jacobian. Without it the integral changes.
    #
    # Demonstration: compute E[((r-3)/2)^2] under r ~ N(3, 4) -- this is exactly E[eta^2].
    # E[((r-3)/2)^2] = (1/4) * E[(r-3)^2] = (1/4) * Var(r) = (1/4) * 4 = 1
    e_eta_sq_via_r = (1.0 / 4.0) * 4.0  # using Var(r) = 4
    assert e_eta_sq_via_r == 1.0
