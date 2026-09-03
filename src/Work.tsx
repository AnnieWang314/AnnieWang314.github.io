import { Link } from "react-router-dom";
import { entries, label, type Entry } from "./entries";
import { details, PROJECT_PAGES_ENABLED } from "./details";
import { projectImage } from "./projectImages";
import AutoscaleArt from "./AutoscaleArt";
import SonicBodyArt from "./SonicBodyArt";

/** Whatever picture this entry has: its page's lead image, or its own. */
function tileImage(entry: Entry) {
  // An explicit tile image wins over the page's lead image.
  if (entry.tile?.image) {
    const src = projectImage(entry.tile.image);
    if (src) return { src, alt: entry.title, transparent: false };
  }
  if (entry.slug) {
    for (const img of details[entry.slug]?.images ?? []) {
      const src = projectImage(img.file);
      if (src) return { src, alt: img.alt, transparent: Boolean(img.transparent) };
    }
  }
  return undefined;
}

function tagline(entry: Entry) {
  return entry.slug ? details[entry.slug].tagline : (entry.tile?.tagline ?? "");
}

const Tile: React.FC<{ entry: Entry }> = ({ entry }) => {
  const image = tileImage(entry);

  // A photo always wins; artwork fills in until there is one.
  const art = image
    ? undefined
    : entry.slug
      ? details[entry.slug]?.art
      : entry.tile?.art;

  const inner = (
    <>
      {art ? (
        <div className="tile-media tile-media--art">
          {art === "web" ? <SonicBodyArt /> : <AutoscaleArt />}
        </div>
      ) : image ? (
        <div
          className={`tile-media${image.transparent ? " tile-media--contain" : ""}`}
        >
          <img src={image.src} alt={image.alt} loading="lazy" />
        </div>
      ) : (
        // No photo yet — let the sentence be the picture.
        <div className="tile-media tile-media--words">
          <span>{tagline(entry)}</span>
        </div>
      )}

      <div className="tile-caption">
        <span className="tile-name">{label(entry)}</span>
        {(image || art) && <span className="tile-line">{tagline(entry)}</span>}
      </div>
    </>
  );

  // Its own page if it has one and pages are on.
  if (entry.slug && PROJECT_PAGES_ENABLED) {
    return (
      <Link to={`/work/${entry.slug}`} className="tile">
        {inner}
      </Link>
    );
  }

  // Entries with no page of their own still link out to the real thing.
  const href = entry.slug ? undefined : (entry.links?.demo ?? entry.links?.github);
  if (href) {
    return (
      <a className="tile" href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return <div className="tile tile--flat">{inner}</div>;
};

const Work: React.FC = () => (
  <div>
    <div className="page-header">
      <h1 className="lede">i like building.</h1>
    </div>

    <div className="gallery">
      {entries
        .filter((e) => (e.slug && details[e.slug]) || e.tile)
        .map((entry) => (
          <Tile key={`${entry.title}-${entry.dates}`} entry={entry} />
        ))}
    </div>
  </div>
);

export default Work;
