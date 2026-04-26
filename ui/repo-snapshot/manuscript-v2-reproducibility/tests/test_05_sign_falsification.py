"""Test 5: sign convention -- F + ELBO = 0; wrong-direction wording falsified.

Numerically falsifies the wording in Maren TR-2019-01v6 line 319:
   "the free energy for the model is a lower bound for the free energy of
    the external system"

Under the standard convention (F = -ELBO; F upper-bounds surprisal),
F is a lower bound on -ln p(y) iff F <= -ln p(y). For uniform q in the
toy model, F = 0.945 and -ln p(y) = 0.371, so F <= -ln p(y) is FALSE.
"""

import math

P_ETA = (0.3, 0.7)
P_Y1_GIVEN_ETA = (0.2, 0.9)
P_Y1 = sum(pe * py for pe, py in zip(P_ETA, P_Y1_GIVEN_ETA))
SURPRISAL = -math.log(P_Y1)


def F_form1(q):
    energy = sum(q[i] * (-math.log(P_Y1_GIVEN_ETA[i] * P_ETA[i])) for i in range(2))
    H = -sum(qi * math.log(qi) for qi in q if qi > 0)
    return energy - H


def ELBO(q):
    accuracy = sum(q[i] * math.log(P_Y1_GIVEN_ETA[i] * P_ETA[i]) for i in range(2))
    H = -sum(qi * math.log(qi) for qi in q if qi > 0)
    return accuracy + H


def test_F_plus_ELBO_is_zero():
    """The fundamental sign relationship: F = -ELBO."""
    q = (0.5, 0.5)
    assert F_form1(q) + ELBO(q) == 0.0  # exact, not just close


def test_wrong_direction_wording_is_false():
    """'F is a lower bound on surprisal' would require F <= surprisal."""
    q = (0.5, 0.5)
    f = F_form1(q)
    assert not (f <= SURPRISAL), (
        f"Wrong-direction wording predicts F <= surprisal: {f} <= {SURPRISAL} -- "
        "must be FALSE for the standard convention to hold."
    )


def test_correct_direction_wording_is_true():
    """'F is an upper bound on surprisal' requires F >= surprisal."""
    q = (0.5, 0.5)
    f = F_form1(q)
    assert f >= SURPRISAL, (
        f"Standard wording predicts F >= surprisal: {f} >= {SURPRISAL}"
    )
