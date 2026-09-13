import { entries, label } from "./entries";
import { details, ENABLED_PAGES, pageIsLive } from "./details";
import { projectImage } from "./projectImages";
import headshot from "./assets/headshot-400.jpg";
import { BANANA } from "./banana";

export const SITE = BANANA ? "https://banannie.wang" : "https://wannie.wang";
const NAME = BANANA ? "Banannie Wang" : "Annie Wang";

const HOME_DESCRIPTION =
  "Annie Wang — MIT CS student working on embedded systems, distributed systems, and the machines people wear.";

export interface PageMeta {
  title: string;
  description: string;
  /** Absolute canonical URL, with the trailing slash GitHub Pages serves. */
  url: string;
  /** Absolute image URL for link previews, when the page has one. */
  image?: string;
  /** Structured data, written into the page as a JSON-LD script tag. */
  jsonLd?: object;
  /**
   * Keep this page out of search results. Set for banannie.wang, so the joke
   * copy never competes with wannie.wang for "Annie Wang".
   */
  noindex?: boolean;
}

const absolute = (path: string) => new URL(path, SITE).toString();
const canonical = (route: string) => absolute(route === "/" ? "/" : `${route}/`);

/** Every page that gets pre-rendered and listed in the sitemap. */
export function liveRoutes(): string[] {
  const projects = ENABLED_PAGES.filter((slug) => details[slug]).map(
    (slug) => `/work/${slug}`
  );
  return ["/", "/work", ...projects];
}

/** Title, description and preview details for a path. Shared by the build and the browser. */
export function pageMeta(pathname: string): PageMeta {
  const route = pathname.replace(/\/+$/, "") || "/";

  if (route === "/work") {
    const names = entries
      .filter((e) => (e.slug && details[e.slug]) || e.tile)
      .map(label);
    return {
      title: `Work — ${NAME}`,
      description: `Projects by ${NAME}: ${names.join(", ")}.`,
      noindex: BANANA,
      url: canonical(route),
    };
  }

  const slug = route.match(/^\/work\/([^/]+)$/)?.[1];
  const entry = slug ? entries.find((e) => e.slug === slug) : undefined;
  if (slug && entry && pageIsLive(slug)) {
    const detail = details[slug];
    const file = detail.images?.find((img) => projectImage(img.file))?.file;
    const src = file ? projectImage(file) : undefined;
    return {
      title: `${label(entry)} — ${NAME}`,
      description: detail.blurb,
      url: canonical(route),
      image: src ? absolute(src) : undefined,
      noindex: BANANA,
    };
  }

  if (BANANA) {
    return {
      title: "Banannie Wang 🍌",
      description: HOME_DESCRIPTION,
      url: canonical("/"),
      image: absolute(headshot),
      noindex: true,
    };
  }

  return {
    title: "Annie Wang",
    description: HOME_DESCRIPTION,
    url: canonical("/"),
    image: absolute(headshot),
    // Tells search engines these profiles all belong to the same person.
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Annie Wang",
      url: `${SITE}/`,
      image: absolute(headshot),
      description: HOME_DESCRIPTION,
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: "Massachusetts Institute of Technology",
      },
      sameAs: [
        "https://github.com/AnnieWang314",
        "https://www.linkedin.com/in/annie-wang-ma",
      ],
    },
  };
}
