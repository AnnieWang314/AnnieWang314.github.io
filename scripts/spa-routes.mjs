/**
 * GitHub Pages serves static files, so a request for /work finds nothing and
 * falls back to 404.html — the page renders, but the status really is 404,
 * which is what crawlers see. Writing a copy of index.html at each route makes
 * Pages serve the same shell with a 200 instead.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";
const shell = readFileSync(join(dist, "index.html"), "utf8");

// Still needed for anything not listed below (a typo'd URL, say).
writeFileSync(join(dist, "404.html"), shell);

// Project slugs come straight from the entry list, so re-enabling the project
// pages doesn't need this file touched.
const entries = readFileSync(join("src", "entries.ts"), "utf8");
const slugs = [...entries.matchAll(/^\s*slug:\s*"([^"]+)"/gm)].map((m) => m[1]);

const routes = ["work", ...slugs.map((s) => `work/${s}`)];

for (const route of routes) {
  const dir = join(dist, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), shell);
}

console.log(`spa-routes: wrote ${routes.length} route shells -> ${routes.join(", ")}`);
console.log("dist root:", readdirSync(dist).join(" "));
