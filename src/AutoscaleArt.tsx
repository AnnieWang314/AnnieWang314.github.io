/**
 * Containers spinning up to meet demand and draining away again — the thing the
 * Modal work was actually about. Pure CSS so it costs nothing to run.
 */
const COUNT = 18;

const AutoscaleArt: React.FC = () => (
  <div className="autoscale" aria-hidden="true">
    <div className="autoscale-grid">
      {Array.from({ length: COUNT }, (_, i) => (
        <span
          key={i}
          className="autoscale-cell"
          style={{ animationDelay: `${(i % 6) * 0.16 + Math.floor(i / 6) * 0.42}s` }}
        />
      ))}
    </div>
    <div className="autoscale-load" />
  </div>
);

export default AutoscaleArt;
