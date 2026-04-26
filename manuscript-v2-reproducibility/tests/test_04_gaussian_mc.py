"""Test 4: Gaussian conjugate model -- continuous bound via closed-form KL.

Setup:
    Prior:      eta ~ N(0, 4)  (variance 4)
    Likelihood: y | eta ~ N(eta, 1)
    Marginal:   y ~ N(0, 5)
    Observed:   y = 1.5

Posterior derivation:
    Precision tau_post = 1/4 + 1 = 1.25
    Variance v_post    = 1 / 1.25 = 0.8
    Mean m_post        = (y / 1) / 1.25 = 1.2

Surprisal:
    -ln p(y=1.5) = 0.5 * ln(2 * pi * 5) + 1.5^2 / (2 * 5)
                 = 0.5 * 2.838... + 0.225
                 = 1.948...

KL between two Gaussians (closed form):
    KL(N(m_q, v_q) || N(m_p, v_p)) = 0.5 * (ln(v_p/v_q) + v_q/v_p
                                            + (m_q-m_p)^2/v_p - 1)

Acceptance:
    F[q] = surprisal + KL(q || posterior) for various Gaussian q.
    Bound F[q] >= surprisal holds; tight at q = exact posterior.

This is fully deterministic; no Monte Carlo. v1 used MC sampling, which
introduced RNG-dependence and ~1e-3 noise. v2 uses the closed-form KL.
"""

import math
import pytest

# Posterior parameters (analytic)
PRIOR_VAR = 4.0
LIKELIHOOD_VAR = 1.0
Y_OBS = 1.5
POST_PREC = 1.0 / PRIOR_VAR + 1.0 / LIKELIHOOD_VAR
POST_VAR = 1.0 / POST_PREC
POST_MEAN = (Y_OBS / LIKELIHOOD_VAR) / POST_PREC

# Surprisal of y = 1.5 under marginal y ~ N(0, prior_var + likelihood_var)
MARGINAL_VAR = PRIOR_VAR + LIKELIHOOD_VAR
SURPRISAL = (
    0.5 * math.log(2 * math.pi * MARGINAL_VAR)
    + Y_OBS ** 2 / (2 * MARGINAL_VAR)
)


def kl_two_gaussians(m_q, v_q, m_p, v_p):
    return 0.5 * (
        math.log(v_p / v_q)
        + v_q / v_p
        + (m_q - m_p) ** 2 / v_p
        - 1.0
    )


def F_gaussian(m_q, v_q):
    """F[q] for Gaussian q against the Gaussian model with y observed."""
    return SURPRISAL + kl_two_gaussians(m_q, v_q, POST_MEAN, POST_VAR)


def test_posterior_parameters():
    assert POST_PREC == 1.25
    assert POST_VAR == pytest.approx(0.8, abs=1e-12)
    assert POST_MEAN == pytest.approx(1.2, abs=1e-12)


def test_surprisal_value():
    # Computed from the marginal Gaussian formula.
    expected = 0.5 * math.log(2 * math.pi * 5) + 0.225
    assert SURPRISAL == pytest.approx(expected, abs=1e-12)
    assert SURPRISAL == pytest.approx(1.948657489421723, abs=1e-12)


def test_exact_posterior_zero_KL():
    """KL = 0, F = surprisal when q is the exact posterior."""
    f = F_gaussian(POST_MEAN, POST_VAR)
    assert f == pytest.approx(SURPRISAL, abs=1e-12)


def test_biased_q_KL_positive():
    """q = N(0, 1) is biased; KL > 0; F > surprisal."""
    f = F_gaussian(0.0, 1.0)
    assert f > SURPRISAL
    # Specific value: KL = 0.5 * (ln(0.8) + 1/0.8 + (0-1.2)^2/0.8 - 1)
    expected_kl = 0.5 * (math.log(0.8) + 1.25 + 1.8 - 1.0)
    assert f - SURPRISAL == pytest.approx(expected_kl, abs=1e-12)


def test_overconfident_q_KL_positive():
    """q = N(1.5, 0.09) is over-precise; KL > 0; F > surprisal."""
    f = F_gaussian(1.5, 0.09)
    assert f > SURPRISAL


def test_kl_symmetric_setup():
    """KL(N(1.2, 0.8) || N(1.2, 0.8)) = 0."""
    assert kl_two_gaussians(1.2, 0.8, 1.2, 0.8) == pytest.approx(0.0, abs=1e-12)
