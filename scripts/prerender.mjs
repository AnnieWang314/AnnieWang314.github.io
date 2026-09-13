/**
 * Turns the client build into a real HTML file for every live page.
 *
 * The app draws itself in the browser, so a bare build ships an empty
 * <div id="root"> — which is all a crawler sees before JavaScript runs. This
 * renders each page ahead of time, writes the markup plus that page's own
 * title, description, canonical URL and preview image into its HTML, then adds
 * robots.txt and sitemap.xml. A real file at each path also means GitHub Pages
 * answers 200 for every live URL instead of falling through to 404.html.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

// `node scripts/prerender.mjs [dist] [ssrDir]` — defaults are the wannie.wang build.
const dist = process.argv[2] ?? "dist";
const ssrDir = process.argv[3] ?? "dist-ssr";
const ssrEntry = pathToFileURL(join(ssrDir, "entry-server.js")).href;
const { render, liveRoutes, pageMeta, SITE, BANANA } = await import(ssrEntry);

const template = readFileSync(join(dist, "index.html"), "utf8");

// Unknown URLs still get the plain app, which redirects in the browser.
writeFileSync(join(dist, "404.html"), template);

const attr = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const text = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

/** Replace exactly one match, and fail loudly if index.html has drifted. */
function swap(html, pattern, replacement, what) {
  if (!pattern.test(html)) throw new Error(`prerender: couldn't find ${what} in index.html`);
  return html.replace(pattern, replacement);
}

const routes = liveRoutes();

for (const route of routes) {
  const meta = pageMeta(route);
  let html = template;

  html = swap(html, /<title>[\s\S]*?<\/title>/, `<title>${text(meta.title)}</title>`, "<title>");
  html = swap(html, /<meta\s+name="description"[\s\S]*?\/>/,
    `<meta name="description" content="${attr(meta.description)}" />`, "meta description");
  html = swap(html, /<meta\s+property="og:title"[\s\S]*?\/>/,
    `<meta property="og:title" content="${attr(meta.title)}" />`, "og:title");
  html = swap(html, /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${attr(meta.description)}" />`, "og:description");
  html = swap(html, /<meta\s+property="og:url"[\s\S]*?\/>/,
    `<meta property="og:url" content="${attr(meta.url)}" />`, "og:url");

  const extra = meta.noindex
    ? [`<meta name="robots" content="noindex" />`]
    : [`<link rel="canonical" href="${attr(meta.url)}" />`];
  if (meta.image) {
    extra.push(`<meta property="og:image" content="${attr(meta.image)}" />`);
    extra.push(`<meta name="twitter:image" content="${attr(meta.image)}" />`);
  }
  if (meta.jsonLd) {
    // "<" escaped so text inside the JSON can never close the script tag.
    const json = JSON.stringify(meta.jsonLd).replace(/</g, "\\u003c");
    extra.push(`<script type="application/ld+json">${json}</script>`);
  }
  html = swap(html, /<\/head>/, `    ${extra.join("\n    ")}\n  </head>`, "</head>");

  html = swap(html, /<div id="root"><\/div>/, `<div id="root">${render(route)}</div>`, "#root");

  const dir = route === "/" ? dist : join(dist, route);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
}

if (BANANA) {
  // banannie.wang: its own domain, no sitemap, and crawlable only so Google can
  // see the noindex on every page.
  writeFileSync(join(dist, "CNAME"), "banannie.wang\n");
  writeFileSync(join(dist, "robots.txt"), "User-agent: *\nAllow: /\n");
  rmSync(ssrDir, { recursive: true, force: true });
  console.log(`prerender (banana): ${routes.length} pages, noindex, CNAME banannie.wang`);
  process.exit(0);
}

const today = new Date().toISOString().slice(0, 10);
const urls = routes
  .map((r) => `  <url>\n    <loc>${pageMeta(r).url}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join("\n");
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);
writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

// The server bundle only exists to produce the files above.
rmSync(ssrDir, { recursive: true, force: true });

console.log(`prerender: ${routes.length} pages -> ${routes.join(", ")}`);
console.log("prerender: wrote 404.html, sitemap.xml, robots.txt");
