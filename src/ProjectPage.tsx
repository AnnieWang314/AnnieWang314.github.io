import { Link, Navigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { entries, label, sublabel } from "./entries";
import { details, PROJECT_PAGES_ENABLED } from "./details";
import { projectImage } from "./projectImages";

const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!PROJECT_PAGES_ENABLED) return <Navigate to="/work" replace />;

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

  if (!entry || !detail) return <Navigate to="/work" replace />;

  // Neighbouring pages, skipping entries that don't have one.
  const withPages = entries.filter((e) => e.slug && details[e.slug]);
  const pos = withPages.findIndex((e) => e.slug === slug);
  const prev = withPages[pos - 1];
  const next = withPages[pos + 1];

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

      {detail.facts && (
        <dl className="facts">
          {detail.facts.map(({ label, value }) => (
            <div key={label} className="fact">
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      )}

      {images[0] && (
        <figure
          className={[
            "project-figure",
            images[0].mark ? "project-figure--mark" : "project-figure--lead",
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
              <p key={para}>{para}</p>
            ))}
          </section>
        ))}
      </div>

      {images.length > 1 && (
        <div className="project-gallery">
          {images.slice(1).map((img) => (
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
