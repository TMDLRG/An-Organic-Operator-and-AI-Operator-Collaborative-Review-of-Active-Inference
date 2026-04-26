"""Test 9: Appendix B Eqn B-1 sign -- one missing minus inverts F.

Setup:
    Same toy model as Test 1.
    Maren's Eqn B-1 (as written in the SOURCE A text extraction) is:
        H = sum_i integral q(x_i) ln p(x_i, y_i | theta)    -- NO minus sign
    Standard expected energy: U[q] = -E_q[ln p].

Acceptance:
    F = U - H[q] (with the minus sign) gives the correct +0.945 (matches Test 1).
    F = (Maren-as-written) - H[q] (without minus) gives -2.331 (wrong sign).
    Difference is exactly 2 * |E_q[ln p]|.

Layer-2 caveat:
    The PDF text extraction may have lost a minus sign present in the
    original PDF/LaTeX. Settling this requires direct inspection of the
    original Maren PDF or LaTeX source.
"""

import math
import pytest

P_ETA = (0.3, 0.7)
P_Y1_GIVEN_ETA = (0.2, 0.9)
JOINT_Y1 = tuple(P_Y1_GIVEN_ETA[i] * P_ETA[i] for i in range(2))


def H_maren_as_written(q):
    """Maren Eqn B-1 as extracted: sum q(x) ln p(x, y) -- no minus sign."""
    return sum(q[i] * math.log(JOINT_Y1[i]) for i in range(2))


def U_standard(q):
    """Standard expected energy: -E_q[ln p]."""
    return -H_maren_as_written(q)


def H_q_entropy(q):
    """Shannon entropy of q."""
    return -sum(qi * math.log(qi) for qi in q if qi > 0)


def F_with_correct_sign(q):
    return U_standard(q) - H_q_entropy(q)


def F_with_b1_unrepaired(q):
    return H_maren_as_written(q) - H_q_entropy(q)


def test_maren_as_written_negative():
    q = (0.5, 0.5)
    h = H_maren_as_written(q)
    assert h < 0  # log of probabilities < 1 is negative
    assert h == pytest.approx(-1.6377230881782976, abs=1e-12)


def test_standard_form_positive():
    q = (0.5, 0.5)
    u = U_standard(q)
    assert u > 0
    assert u == pytest.approx(1.6377230881782976, abs=1e-12)


def test_F_with_minus_matches_test1():
    """F with the minus sign gives the same answer as Test 1's F[q] for uniform q."""
    q = (0.5, 0.5)
    f_correct = F_with_correct_sign(q)
    assert f_correct == pytest.approx(0.9445759076183523, abs=1e-12)


def test_F_without_minus_is_wrong():
    """F using Maren-as-written gives wrong sign and wrong magnitude."""
    q = (0.5, 0.5)
    f_wrong = F_with_b1_unrepaired(q)
    assert f_wrong < 0
    assert f_wrong == pytest.approx(-2.3308702687382428, abs=1e-12)


def test_difference_is_2x_expected_energy():
    """The two F values differ by exactly 2 * |E_q[ln p]|."""
    q = (0.5, 0.5)
    f_correct = F_with_correct_sign(q)
    f_wrong = F_with_b1_unrepaired(q)
    diff = f_correct - f_wrong
    assert diff == pytest.approx(2 * U_standard(q), abs=1e-12)


def test_one_minus_sign_repairs():
    """Inserting one minus sign in B-1 converts wrong F to correct F."""
    q = (0.5, 0.5)
    repaired = -H_maren_as_written(q) - H_q_entropy(q)
    correct = F_with_correct_sign(q)
    assert repaired == pytest.approx(correct, abs=1e-12)
