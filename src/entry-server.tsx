/* eslint-disable react-refresh/only-export-components -- build-time server entry; never hot-reloaded */
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";

export { liveRoutes, pageMeta, SITE } from "./seo";
export { BANANA } from "./banana";

/** Renders one page to HTML at build time. Only scripts/prerender.mjs calls this. */
export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
}
