import { Link, Navigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { entries, label, sublabel } from "./entries";
import { details, pageIsLive } from "./details";
import { projectImage } from "./projectImages";


/**
 * Body text is plain, except for markdown-style [label](url) links. Parsed into
 * real elements rather than injected as HTML, so a stray angle bracket in the
 * writing can never become markup.
 */
function withLinks(text: string) {
  const parts: React.ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <a key={m.index} href={m[2]} target="_blank" rel="noopener noreferrer">
        {m[1]}
      </a>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Pages that were folded into another one; keep their URLs working.
  const merged: Record<string, string> = {
    plume: "hackmit",
    pigeon: "hackmit",
    splash: "hackmit",
  };
  if (slug && merged[slug]) return <Navigate to={`/work/${merged[slug]}`} replace />;

  const index = entries.findIndex((e) => e.slug === slug);
  const entry = index === -1 ? undefined : entries[index];
  const detail = slug ? details[slug] : undefined;

  if (!entry || !detail || !pageIsLive(slug)) return <Navigate to="/work" replace />;

  // Neighbouring pages, skipping entries that don't have one.
  // Only walk between pages that are actually live, or the arrows point at
  // slugs that just redirect back to the index.
  const withPages = entries.filter((e) => pageIsLive(e.slug));
  const pos = withPages.findIndex((e) => e.slug === slug);
  const prev = withPages[pos - 1];
  const next = withPages[pos + 1];

  const claimed = new Set(
    detail.sections.map((sec) => sec.image).filter(Boolean) as string[]
  );

  const images = (detail.images ?? [])
    .map((img) => ({ ...img, src: projectImage(img.file) }))
    .filter((img): img is typeof img & { src: string } => Boolean(img.src));

  return (
    <article className="project">
      <Link to="/work" className="back-link">
        <FaArrowLeft aria-hidden="true" /> work
      </Link>

      <header className="project-header">
        <p className="eyebrow">
          {entry.dates}
          {sublabel(entry) && ` · ${sublabel(entry)}`}
        </p>
        {/* Heading matches the gallery tile, so clicking through feels continuous. */}
        <h1 className="lede">{label(entry)}</h1>
        <p className="project-blurb">{detail.blurb}</p>

        {entry.links && (
          <div className="project-actions">
            {entry.links.demo && (
              <a href={entry.links.demo} target="_blank" rel="noopener noreferrer">
                <FaExternalLinkAlt aria-hidden="true" />
                {entry.links.demoLabel ?? "Visit"}
              </a>
            )}
            {entry.links.github && (
              <a href={entry.links.github} target="_blank" rel="noopener noreferrer">
                <FaGithub aria-hidden="true" />
                Source
              </a>
            )}
          </div>
        )}
      </header>

      {images[0] && (
        <figure
          className={[
            "project-figure",
            images[0].mark ? "project-figure--mark" : "project-figure--lead",
            images[0].small ? "project-figure--small" : "",
            images[0].transparent || images[0].mark ? "project-figure--plain" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <img src={images[0].src} alt={images[0].alt} loading="eager" />
          {images[0].caption && <figcaption>{images[0].caption}</figcaption>}
        </figure>
      )}

      <div className="project-body">
        {detail.sections.map((section, i) => (
          <section key={section.heading ?? i}>
            {section.heading && <h2>{section.heading}</h2>}
            {section.body.map((para) => (
              <p key={para}>{withLinks(para)}</p>
            ))}

            {(() => {
              const fig = images.find((img) => img.file === section.image);
              if (!fig) return null;
              return (
                <figure className="project-figure project-figure--inline">
                  <img src={fig.src} alt={fig.alt} loading="lazy" />
                  {fig.caption && <figcaption>{fig.caption}</figcaption>}
                </figure>
              );
            })()}
          </section>
        ))}
      </div>

      {images.slice(1).some((img) => !claimed.has(img.file)) && (
        <div className="project-gallery">
          {images.slice(1).filter((img) => !claimed.has(img.file)).map((img) => (
            <figure
              key={img.file}
              className={`project-figure${
                img.transparent || img.mark ? " project-figure--plain" : ""
              }${img.mark ? " project-figure--mark" : ""}`}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              {img.caption && <figcaption>{img.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}

      <nav className="project-nav">
        {prev ? (
          <Link to={`/work/${prev.slug}`}>
            <span className="eyebrow">Previous</span>
            {label(prev)}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={`/work/${next.slug}`} className="project-nav-next">
            <span className="eyebrow">Next</span>
            {label(next)}
          </Link>
        )}
      </nav>
    </article>
  );
};

export default ProjectPage;
