r"""Test 11: Complexity-Accuracy form (third form of Eqn 2.5).

This test verifies the Complexity-Accuracy decomposition of variational free
energy:

    F[q] = D_KL(q(eta|r) || p(eta|m)) - E_q[ln p(y|eta, m)]
           \________________________/   \________________________/
                Complexity                       Accuracy

Derivation (in Phase_P2_OODA.md Sec P2-OODA-3):
    Apply ln p(y, eta) = ln p(y|eta) + ln p(eta) (prior-likelihood factorization)
    to the integrand of F[q]; split the log into KL(q || prior) and the
    expected log-likelihood.

Numerical verification: on the discrete (Test 1) and Gaussian conjugate
(Test 4) setups, Form 3 must agree with Form 1 (energy-minus-entropy)
and Form 2 (KL+surprisal) to floating-point precision.

This is one of the three forms of SOURCE B Eqn 2.5; the others are
covered by Test 1 (Form 1, Form 2). v2 manuscript Chapter 2 patch P-12
boxes Form 3 alongside Forms 1 and 2.
"""

import math
import pytest


# -- Discrete model setup (matches Test 1) -----------------------------------
P_ETA = (0.3, 0.7)
P_Y1_GIVEN_ETA = (0.2, 0.9)
P_Y1 = sum(pe * py for pe, py in zip(P_ETA, P_Y1_GIVEN_ETA))
EXACT_POST = tuple(P_Y1_GIVEN_ETA[i] * P_ETA[i] / P_Y1 for i in range(2))
SURPRISAL = -math.log(P_Y1)


def kl_discrete(q, p):
    return sum(qi * math.log(qi / pi) for qi, pi in zip(q, p) if qi > 0)


def F_form1_discrete(q):
    """F = E_q[-ln p(y, eta)] - H[q]."""
    energy = sum(q[i] * (-math.log(P_Y1_GIVEN_ETA[i] * P_ETA[i])) for i in range(2))
    H = -sum(qi * math.log(qi) for qi in q if qi > 0)
    return energy - H


def F_form2_discrete(q):
    """F = D_KL(q || posterior) + surprisal."""
    return kl_discrete(q, EXACT_POST) + SURPRISAL


def F_form3_discrete(q):
    """F = D_KL(q || prior) - E_q[ln p(y=1 | eta)]."""
    complexity = kl_discrete(q, P_ETA)
    accuracy = sum(q[i] * math.log(P_Y1_GIVEN_ETA[i]) for i in range(2))
    return complexity - accuracy


# -- Gaussian model setup (matches Test 4) -----------------------------------
PRIOR_MEAN = 0.0
PRIOR_VAR = 4.0
LIK_VAR = 1.0
Y_OBS = 1.5
POST_PREC = 1.0 / PRIOR_VAR + 1.0 / LIK_VAR
POST_VAR = 1.0 / POST_PREC
POST_MEAN = (Y_OBS / LIK_VAR) / POST_PREC
SURPRISAL_G = (
    0.5 * math.log(2 * math.pi * (PRIOR_VAR + LIK_VAR))
    + Y_OBS ** 2 / (2 * (PRIOR_VAR + LIK_VAR))
)


def kl_two_gaussians(m_q, v_q, m_p, v_p):
    return 0.5 * (
        math.log(v_p / v_q) + v_q / v_p + (m_q - m_p) ** 2 / v_p - 1.0
    )


def F_form2_gauss(m_q, v_q):
    """F = surprisal + KL(q || posterior)."""
    return SURPRISAL_G + kl_two_gaussians(m_q, v_q, POST_MEAN, POST_VAR)


def F_form3_gauss(m_q, v_q):
    """F = D_KL(q || prior) - E_q[ln p(y_obs | eta)]."""
    complexity = kl_two_gaussians(m_q, v_q, PRIOR_MEAN, PRIOR_VAR)
    expected_log_lik = (
        -0.5 * math.log(2 * math.pi * LIK_VAR)
        - 0.5 * ((Y_OBS - m_q) ** 2 + v_q) / LIK_VAR
    )
    return complexity - expected_log_lik


# -- Tests --------------------------------------------------------------------

@pytest.mark.parametrize("q1", [0.5, 0.913043, 0.95, 0.05, 0.99])
def test_three_forms_agree_discrete(q1):
    """All three forms of F[q] must agree to floating-point precision (discrete)."""
    q = (1 - q1, q1)
    f1 = F_form1_discrete(q)
    f2 = F_form2_discrete(q)
    f3 = F_form3_discrete(q)
    assert f1 == pytest.approx(f2, abs=1e-12), f"Form 1 != Form 2: {f1} vs {f2}"
    assert f1 == pytest.approx(f3, abs=1e-12), f"Form 1 != Form 3: {f1} vs {f3}"
    assert f2 == pytest.approx(f3, abs=1e-12), f"Form 2 != Form 3: {f2} vs {f3}"


def test_form3_value_uniform_q_discrete():
    """Form 3 at uniform q on the toy model is 0.9445759076... (matches Test 1)."""
    q = (0.5, 0.5)
    assert F_form3_discrete(q) == pytest.approx(0.9445759076183523, abs=1e-12)


def test_form3_value_exact_posterior_discrete():
    """Form 3 at exact posterior reduces to surprisal."""
    q = EXACT_POST
    assert F_form3_discrete(q) == pytest.approx(SURPRISAL, abs=1e-12)


def test_complexity_zero_when_q_equals_prior():
    """If q = prior, complexity term D_KL(q || prior) = 0."""
    q = P_ETA  # q = prior
    complexity = kl_discrete(q, P_ETA)
    assert complexity == pytest.approx(0.0, abs=1e-12)


@pytest.mark.parametrize("m_q,v_q,label", [
    (1.2, 0.8, "exact"),
    (0.0, 1.0, "biased"),
    (1.5, 0.09, "overconfident"),
])
def test_form3_matches_form2_gaussian(m_q, v_q, label):
    """Form 3 must agree with Form 2 on the Gaussian conjugate model."""
    f2 = F_form2_gauss(m_q, v_q)
    f3 = F_form3_gauss(m_q, v_q)
    assert f2 == pytest.approx(f3, abs=1e-12), (
        f"Gaussian {label}: Form 2 = {f2}, Form 3 = {f3}"
    )


def test_form3_at_exact_posterior_gaussian_equals_surprisal():
    """Form 3 at q = exact posterior reduces to surprisal (Gaussian)."""
    f3 = F_form3_gauss(POST_MEAN, POST_VAR)
    assert f3 == pytest.approx(SURPRISAL_G, abs=1e-12)


def test_form3_components_decompose():
    """For uniform q on toy model, complexity + (-accuracy) = F[q]."""
    q = (0.5, 0.5)
    complexity = kl_discrete(q, P_ETA)
    accuracy = sum(q[i] * math.log(P_Y1_GIVEN_ETA[i]) for i in range(2))
    f_decomposed = complexity - accuracy
    assert f_decomposed == pytest.approx(F_form1_discrete(q), abs=1e-12)
    # Verify both components are individually meaningful
    assert complexity > 0  # KL divergence between non-identical distributions
    assert accuracy < 0  # log of probabilities < 1 is negative


def test_form3_derivation_via_logarithm_split():
    """Verify the algebraic step: -E_q[ln p(y, eta)] = -E_q[ln p(y|eta)] - E_q[ln p(eta)]."""
    q = (0.5, 0.5)
    # Joint: p(y, eta) = p(y|eta) * p(eta)
    e_log_joint = sum(
        q[i] * math.log(P_Y1_GIVEN_ETA[i] * P_ETA[i]) for i in range(2)
    )
    e_log_lik = sum(q[i] * math.log(P_Y1_GIVEN_ETA[i]) for i in range(2))
    e_log_prior = sum(q[i] * math.log(P_ETA[i]) for i in range(2))
    assert e_log_joint == pytest.approx(e_log_lik + e_log_prior, abs=1e-12)
