const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3000";
const OUT = path.join(process.cwd(), ".qa-screenshots");
fs.mkdirSync(OUT, { recursive: true });

const routes = [
  "/",
  "/about",
  "/services",
  "/services/civil-infrastructure",
  "/services/foundation-engineering",
  "/services/energy-infrastructure",
  "/services/equipment-rental",
  "/projects/ongoing",
  "/projects/completed",
  "/clients",
  "/contact",
  "/portfolio",
];

const legacyShouldRedirect = [
  "/services/scaffolding",
  "/services/manpower",
  "/services/civil",
  "/services/equipment",
];

(async () => {
  const browser = await chromium.launch({
    headless: true,
    channel: "chrome",
  });
  const results = [];

  async function audit(label, width, height) {
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    const consoleErrors = [];
    page.on("pageerror", (err) => consoleErrors.push(String(err)));
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    for (const route of routes) {
      const url = BASE + route;
      const res = await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
      await page.waitForTimeout(800);

      const bodyText = await page.locator("body").innerText();
      const hasPending =
        /pending|placeholder|Content pending|Logo pending|Specs pending|Photo pending|Image pending|Media pending|Stats pending|Testimonials pending|provisional/i.test(
          bodyText,
        );

      // Homepage four divisions
      let homeDivisions = null;
      if (route === "/") {
        homeDivisions = {
          civil: bodyText.includes("Civil Infrastructure"),
          foundation: bodyText.includes("Foundation Engineering"),
          energy: bodyText.includes("Energy Infrastructure"),
          equipment: bodyText.includes("Equipment Rental"),
          timcBrand: bodyText.includes("TIMC"),
          noAwesome: !bodyText.includes("Our Awesome Services"),
        };
      }

      // Services page structure
      let servicesChecks = null;
      if (route === "/services") {
        servicesChecks = {
          civil: bodyText.includes("Civil Infrastructure"),
          foundation: bodyText.includes("Foundation Engineering"),
          energy: bodyText.includes("Energy Infrastructure"),
          equipment: bodyText.includes("Equipment Rental"),
          fleet: bodyText.includes("Fleet Categories"),
          integrated: bodyText.includes("Integrated Division"),
        };
      }

      // About shells
      let aboutChecks = null;
      if (route === "/about") {
        aboutChecks = {
          mission: /Mission/i.test(bodyText),
          vision: /Vision/i.test(bodyText),
          values: /Values|Core Values/i.test(bodyText),
          history: /History|Our Journey/i.test(bodyText),
          certs: /Certifications/i.test(bodyText),
        };
      }

      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return {
          scrollWidth: doc.scrollWidth,
          clientWidth: doc.clientWidth,
          overflowX: doc.scrollWidth > doc.clientWidth + 2,
        };
      });

      const safeName = `${label}${route.replace(/\//g, "_") || "_home"}`.replace(
        /_+/g,
        "_",
      );
      await page.screenshot({
        path: path.join(OUT, `${safeName}.png`),
        fullPage: true,
      });

      results.push({
        viewport: label,
        route,
        status: res?.status() ?? null,
        hasPending,
        overflowX: overflow.overflowX,
        consoleErrors: [...consoleErrors],
        homeDivisions,
        servicesChecks,
        aboutChecks,
      });
      consoleErrors.length = 0;
    }

    for (const route of legacyShouldRedirect) {
      const res = await page.goto(BASE + route, {
        waitUntil: "networkidle",
        timeout: 60000,
      });
      results.push({
        viewport: label,
        route,
        status: res?.status() ?? null,
        finalUrl: page.url(),
        redirectedAwayFromLegacy: !page.url().includes(route.split("/").pop() === "civil" ? "/services/civil" : route) || page.url().includes("civil-infrastructure") || page.url().endsWith("/services") || page.url().includes("equipment-rental"),
      });
    }

    await context.close();
  }

  await audit("desktop", 1440, 900);
  await audit("mobile", 390, 844);

  const reportPath = path.join(OUT, "qa-report.json");
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log("QA report written to", reportPath);

  // Summary
  const fails = [];
  for (const r of results) {
    if (r.status && r.status >= 400) fails.push(`${r.viewport} ${r.route} status ${r.status}`);
    if (r.homeDivisions) {
      for (const [k, v] of Object.entries(r.homeDivisions)) {
        if (!v) fails.push(`home missing ${k}`);
      }
    }
    if (r.servicesChecks) {
      for (const [k, v] of Object.entries(r.servicesChecks)) {
        if (!v) fails.push(`services missing ${k}`);
      }
    }
    if (r.aboutChecks) {
      for (const [k, v] of Object.entries(r.aboutChecks)) {
        if (!v) fails.push(`about missing ${k}`);
      }
    }
    if (r.overflowX) fails.push(`overflow-x ${r.viewport} ${r.route}`);
    if (r.consoleErrors?.length)
      fails.push(`console ${r.viewport} ${r.route}: ${r.consoleErrors.join("; ")}`);
  }

  if (fails.length) {
    console.log("FAILURES:");
    fails.forEach((f) => console.log(" -", f));
    process.exitCode = 1;
  } else {
    console.log("All QA checks passed.");
  }

  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
