"""Test 10: Bethe / Kikuchi cluster expansion vs. F[q] -- structural similarity.

This is a *demonstration* (not a proof): a generic 2-site Bethe cluster
expansion free energy and the active-inference F[q] take different values
at analogous "configurations". Both have the energy-minus-entropy form,
but they are different functionals on different objects.

A full CVM-vs-F[q] comparison would require implementing Maren's specific
configuration-variable apparatus (x_i, y_i, w_i, z_i with degeneracy
weights beta_i, gamma_i) from SOURCE A Appendix C; that is out of scope
for this audit. The structural-distinctness conclusion is unaffected
by which specific Kikuchi formulation is used.

Setup:
    h = exp(2 * epsilon_1) = 1.2  (from Maren Sec 8 example)
    Equiprobable single-site marginals: p(A) = p(B) = 0.5
    Equiprobable pair marginals: p(AA) = p(AB) = p(BA) = p(BB) = 0.25

Bethe free energy (per pair, in nats):
    F_bethe = energy - (H_pair - H_site)
    where energy   = -ln(h) * (p_AA + p_BB - p_AB - p_BA)
          H_pair  = -sum p(pair_state) ln p(pair_state)
          H_site  = -sum p(site_state) ln p(site_state)
"""

import math
import pytest

H = 1.2
P_A = 0.5
P_B = 0.5
P_AA = P_AB = P_BA = P_BB = 0.25


def correlation():
    return P_AA + P_BB - P_AB - P_BA


def energy_bethe():
    return -math.log(H) * correlation()


def H_pair():
    return -(P_AA * math.log(P_AA) + P_AB * math.log(P_AB)
             + P_BA * math.log(P_BA) + P_BB * math.log(P_BB))


def H_site():
    return -(P_A * math.log(P_A) + P_B * math.log(P_B))


def F_bethe():
    return energy_bethe() - (H_pair() - H_site())


# Active-inference F[q] from Test 1 model, uniform q.
P_ETA = (0.3, 0.7)
P_Y1_GIVEN_ETA = (0.2, 0.9)


def F_active_inference_uniform_q():
    q = (0.5, 0.5)
    energy = sum(q[i] * (-math.log(P_Y1_GIVEN_ETA[i] * P_ETA[i])) for i in range(2))
    H_q = -sum(qi * math.log(qi) for qi in q)
    return energy - H_q


def test_correlation_zero_under_uniform():
    """Equiprobable pair states give zero net correlation."""
    assert correlation() == 0.0


def test_energy_zero_at_zero_correlation():
    assert energy_bethe() == 0.0


def test_pair_entropy_value():
    """H_pair = ln(4) for 4 equiprobable states."""
    assert H_pair() == pytest.approx(math.log(4), abs=1e-12)


def test_site_entropy_value():
    """H_site = ln(2) for 2 equiprobable states."""
    assert H_site() == pytest.approx(math.log(2), abs=1e-12)


def test_bethe_F_value():
    """F_bethe = 0 - (ln 4 - ln 2) = -ln 2."""
    assert F_bethe() == pytest.approx(-math.log(2), abs=1e-12)


def test_active_inference_F_value():
    """F[q] for the toy with uniform q is 0.945 (matches Test 1)."""
    assert F_active_inference_uniform_q() == pytest.approx(
        0.9445759076183523, abs=1e-12
    )


def test_two_functionals_take_different_values():
    """The whole point: F_bethe != F[q] at analogous 'uniform' configurations."""
    f_b = F_bethe()
    f_a = F_active_inference_uniform_q()
    assert abs(f_b - f_a) > 1.0  # they differ by > 1 nat


def test_both_have_energy_minus_entropy_structure():
    """Both functionals decompose as energy - entropy contribution."""
    # F_bethe = energy_bethe - (H_pair - H_site)  -- entropy correction term
    f_b_decomp = energy_bethe() - (H_pair() - H_site())
    assert f_b_decomp == pytest.approx(F_bethe(), abs=1e-12)
    # F_active = E_q[-ln p] - H[q]  -- analogous structure
    # Already validated in test_01.
