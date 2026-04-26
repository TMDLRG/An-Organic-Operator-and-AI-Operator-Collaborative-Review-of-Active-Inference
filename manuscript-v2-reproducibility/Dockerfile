# Fully reproducible execution environment for the v2 audit test suite.
#
# Build:
#     docker build -t v2-audit-tests .
#
# Run all tests with reference-output diff:
#     docker run --rm v2-audit-tests
#
# Run pytest harness:
#     docker run --rm v2-audit-tests pytest tests/ -v
#
# This image is pinned to a specific Python and numpy version. Bit-identical
# output is guaranteed across host architectures (x86-64, arm64) because all
# tests use IEEE 754 double-precision math.scalar operations (no BLAS).

FROM python:3.12.10-slim

WORKDIR /repo

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY audit_tests_v2.py .
COPY reference_output.txt .
COPY tests/ ./tests/

# Default: run the test script and diff against reference_output.txt.
# Exits 0 on bit-identical output; non-zero on any deviation.
CMD python audit_tests_v2.py > /tmp/out.txt && diff /tmp/out.txt reference_output.txt && echo "ALL TESTS PASS BIT-IDENTICALLY"
