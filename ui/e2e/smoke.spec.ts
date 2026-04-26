import { test, expect } from "@playwright/test";

test.describe("Surface A — Document viewer", () => {
  test("home loads with the three surface cards", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Active Inference/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Documents/ }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Math Runner/ }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Agents/ }).first()).toBeVisible();
  });

  test("docs index lists files grouped by purpose", async ({ page }) => {
    await page.goto("/docs");
    await expect(page.getByRole("heading", { name: "Documents" })).toBeVisible();
    await expect(page.getByText("Manuscript", { exact: false }).first()).toBeVisible();
  });

  test("manuscript v2 renders with markdown + math", async ({ page }) => {
    await page.goto("/docs/Manuscript_Draft_v2.md");
    await expect(page.getByRole("heading", { name: /Active Inference Free Energy/i }).first()).toBeVisible({ timeout: 15_000 });
  });

  test("provenance map renders as a sortable table", async ({ page }) => {
    await page.goto("/docs/Provenance_Map.csv");
    await expect(page.getByRole("table")).toBeVisible();
    await expect(page.getByText("P-001")).toBeVisible();
  });
});

test.describe("Audit register", () => {
  test("audit page lists all severity pills and finding cards", async ({ page }) => {
    await page.goto("/audit");
    await expect(page.getByRole("heading", { name: /Error Register/i })).toBeVisible();
    await expect(page.getByText(/Serious\s+\d+/).first()).toBeVisible();
    await expect(page.getByText("E1", { exact: false }).first()).toBeVisible();
  });
});

test.describe("Surface B — Math runner", () => {
  test("test selector lists 11 tests and Test 1 renders setup", async ({ page }) => {
    await page.goto("/math");
    await expect(page.getByRole("button", { name: /T01/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /T11/ })).toBeVisible();
    await expect(page.getByText("Discrete two-state model").first()).toBeVisible();
  });

  test("changing q(η=1) on Test 1 updates F[q]", async ({ page }) => {
    await page.goto("/math");
    const slider = page.locator('input[type="range"]').first();
    await expect(slider).toBeVisible();
    // Read initial F[q] cell
    const initial = await page.getByText(/F\[q\] \(Form 1\)/).locator("xpath=..").locator(".font-mono").textContent();
    await slider.focus();
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    const after = await page.getByText(/F\[q\] \(Form 1\)/).locator("xpath=..").locator(".font-mono").textContent();
    expect(after).not.toEqual(initial);
  });
});

test.describe("Surface C — Agents", () => {
  test("agents page renders with discrete agent active by default", async ({ page }) => {
    await page.goto("/agents");
    await expect(page.getByRole("heading", { name: /Agent A — Discrete two-state/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Run/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Step/ })).toBeVisible();
  });

  test("stepping the discrete agent advances the step counter", async ({ page }) => {
    await page.goto("/agents");
    await page.getByRole("button", { name: /^Step$/ }).click();
    await page.getByRole("button", { name: /^Step$/ }).click();
    await expect(page.locator("text=/step\\s+2/").first()).toBeVisible();
  });

  test("switching to Agent B shows Gaussian controls", async ({ page }) => {
    await page.goto("/agents");
    await page.getByRole("button", { name: /B · Continuous Gaussian/ }).click();
    await expect(page.getByRole("heading", { name: /Agent B — Continuous Gaussian/ })).toBeVisible();
  });
});

test.describe("Search", () => {
  test("search returns results for 'Markov blanket'", async ({ page }) => {
    await page.goto("/search");
    await page.locator('input[placeholder*="free energy"]').fill("Markov blanket");
    await expect(page.getByText(/Manuscript_Draft_v2\.md|Manuscript_Draft_v1\.md/).first()).toBeVisible({ timeout: 10_000 });
    await expect(page.locator("mark").first()).toBeVisible();
  });
});
