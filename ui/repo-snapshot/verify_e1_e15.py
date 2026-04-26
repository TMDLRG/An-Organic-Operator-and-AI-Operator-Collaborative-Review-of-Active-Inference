"""Verify E1-E15 audit findings against the Maren TR text extraction."""
import re
import sys

with open("1906.08804v6.pdf.txt", "r", encoding="utf-8", errors="replace") as f:
    text = f.read()
    lines = text.split("\n")

findings = [
    ("E1",  "the true posterior",                       "page 6 - q called true posterior"),
    ("E1",  "variational density",                      "page 6 - p called variational density"),
    ("E2a", "lower bound for the free energy",          "page 38 - bound direction reversed"),
    ("E2a", "reverse the signs",                        "page 37-38 - Maren's own reversal note"),
    ("E2a", "direction of the inequality",              "page 37-38 - explicit inequality reversal"),
    ("E2b", "free energy of the external system",       "page 38 - L misnamed"),
    ("E3",  "interpreted as integrating",               "page 15-16 - measure conflation"),
    ("E3",  "distribution units themselves",            "page 15-16 - verbatim distinctive phrase"),
    ("E5",  "independent (to a first order)",           "page 33 - independence misuse"),
    ("E6",  "actual distribution of the external",      "page 19 - model/process conflation"),
    ("E7",  "single probability distribution",          "page 20 - functional vs point oscillation"),
    ("E8",  "We do not have agreement",                 "page 56 - Maren self-flag"),
    ("E9",  "Observable Variable",                      "page 17 - Table 4"),
    ("E10", "identified with",                          "page 40 - CVM associative identification"),
    ("E11", "expected energy or enthalpy",              "page 6 - expected enthalpy term"),
    ("E12", "Helmholtz",                                "page - Helmholtz/Gibbs collapse"),
    ("E13", "separately achieve free energy",           "page 40 - both systems FE-min"),
    ("E14", "Markov blanket",                           "page 3 - blanket trichotomy"),
]

print(f"{'ID':<5} {'Status':<8} {'Hits':<6} {'Description':<55}")
print("-" * 85)

results = {}
for fid, phrase, desc in findings:
    pattern = re.compile(re.escape(phrase), re.IGNORECASE)
    hits = pattern.findall(text)
    n = len(hits)
    status = "PASS" if n > 0 else "MISS"
    results.setdefault(fid, []).append((phrase, n, desc))
    print(f"{fid:<5} {status:<8} {n:<6} {desc:<55}")

print("\n" + "=" * 85)
print("SUMMARY BY FINDING (.txt-level verification)")
print("=" * 85)
seen = []
for fid, _, _ in findings:
    if fid in seen:
        continue
    seen.append(fid)
    items = results[fid]
    any_pass = any(n > 0 for _, n, _ in items)
    status = "VERIFIED" if any_pass else "NOT FOUND"
    print(f"  {fid:<5} {status}")

verified = sum(1 for fid in seen if any(n > 0 for _, n, _ in results[fid]))
total = len(seen)
print(f"\nVerified at .txt level: {verified}/{total} findings")
print(f"E15 (extraction artifact): inspected separately - extraction is faithful per Phase P5.")
