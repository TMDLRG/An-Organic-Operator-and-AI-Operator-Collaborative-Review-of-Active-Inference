"""Test 6: L(s, a, r) expansion -- iid surprisal vs. literal repeated form.

This test deliberately uses an EXPLICIT data vector (not RNG-derived) to
eliminate the RNG-version dependency that caused the audit to surface a
discrepancy in v1.

The data vector (0, 1, 1, 1, 0) has 3 ones and 2 zeros.
With p(y=1) = 0.7, the iid surprisal is:

    -sum_i ln p(y_i) = 2 * (-ln 0.7) + 3 * (-ln 0.7)... no, recompute:
                     = 2 * (-ln 0.3) + 3 * (-ln 0.7)     (zeros use p(y=0)=0.3)
                     = 2 * 1.20397 + 3 * 0.35667
                     = 2.40795 + 1.07002
                     = 3.47797

Critical reproducibility note:
    v1 manuscript and prior audit Test Notes both reported 3.456 for this
    sample. That number is arithmetically incorrect. The correct value is
    3.4780. The error was not caught in either prior session.
"""

import math
import pytest

# Explicit data vector -- no RNG, no seed dependency.
Y_DATA = (0, 1, 1, 1, 0)
P_ONE = 0.7
P_PER_OBS = tuple(P_ONE if v == 1 else (1 - P_ONE) for v in Y_DATA)


def test_data_vector_composition():
    """Sanity: 3 ones, 2 zeros."""
    assert sum(Y_DATA) == 3
    assert len(Y_DATA) - sum(Y_DATA) == 2


def test_iid_surprisal_correct_value():
    """The iid surprisal is 3.4780 nats, not 3.456 (v1's number)."""
    iid_surprisal = -sum(math.log(p) for p in P_PER_OBS)
    assert iid_surprisal == pytest.approx(3.4779704404680696, abs=1e-12)
    # Sanity: not the v1 number
    assert abs(iid_surprisal - 3.456) > 0.02


def test_literal_expansion_value():
    """Literal '-I * ln p(y=1)' assumes all I obs are y=1."""
    # Using the marginal p(y=1) = 0.69 from Maren's running discrete model
    literal = -5 * math.log(0.69)
    assert literal == pytest.approx(1.8553184069541604, abs=1e-12)


def test_iid_surprisal_differs_from_literal():
    """iid surprisal != literal repeated-term form unless all y_i are equal."""
    iid = -sum(math.log(p) for p in P_PER_OBS)
    literal = -5 * math.log(0.69)
    assert abs(iid - literal) > 1.0  # they differ by ~1.6 nats


def test_decomposition_components():
    """The iid surprisal equals 2*(-ln 0.3) + 3*(-ln 0.7) by direct decomposition."""
    iid = -sum(math.log(p) for p in P_PER_OBS)
    by_decomp = 2 * (-math.log(0.3)) + 3 * (-math.log(0.7))
    assert iid == pytest.approx(by_decomp, abs=1e-12)


def test_homogeneous_data_makes_them_coincide():
    """If all y_i = 1, iid surprisal == literal -I * ln p(y=1)."""
    homo_data = (1, 1, 1, 1, 1)
    homo_per_obs = [0.7] * 5
    iid_homo = -sum(math.log(p) for p in homo_per_obs)
    literal_homo = -5 * math.log(0.7)
    assert iid_homo == pytest.approx(literal_homo, abs=1e-12)
