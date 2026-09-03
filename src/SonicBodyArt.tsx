/**
 * Several webs, overlapping. Each is spun around its own off-frame anchor with
 * irregular spokes and sagging strands, so the result reads as filament rather
 * than as one tidy cartoon web. Generated and static.
 */

/** Deterministic wobble, so it renders identically on every load. */
function noise(n: number) {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1; // -1..1
}

const W = 400;
const H = 300;

type Web = { cx: number; cy: number; r: number; spokes: number; rings: number; rot: number };

const webs: Web[] = [
  { cx: 74, cy: 96, r: 132, spokes: 13, rings: 6, rot: 0.4 },
  { cx: 322, cy: 62, r: 118, spokes: 11, rings: 5, rot: 1.9 },
  { cx: 214, cy: 214, r: 146, spokes: 14, rings: 6, rot: 2.7 },
  { cx: 386, cy: 236, r: 108, spokes: 10, rings: 5, rot: 0.9 },
  { cx: 30, cy: 268, r: 96, spokes: 9, rings: 4, rot: 3.4 },
];

type Line = { d: string; w: number; o: number };
const spokeLines: Line[] = [];
const ringLines: Line[] = [];

webs.forEach((web, wi) => {
  const base = wi * 97;

  // Spoke angles, unevenly spaced.
  const angles = Array.from({ length: web.spokes }, (_, i) => {
    const even = web.rot + (i / web.spokes) * Math.PI * 2;
    return even + noise(base + i) * ((Math.PI * 2) / web.spokes) * 0.3;
  }).sort((a, b) => a - b);

  // Each spoke reaches a slightly different distance.
  const reach = angles.map((_, i) => web.r * (0.82 + Math.abs(noise(base + i * 3)) * 0.32));
  const at = (i: number, t: number): [number, number] => [
    web.cx + Math.cos(angles[i]) * reach[i] * t,
    web.cy + Math.sin(angles[i]) * reach[i] * t,
  ];

  angles.forEach((_, i) => {
    const [x, y] = at(i, 1);
    spokeLines.push({
      d: `M ${web.cx.toFixed(1)} ${web.cy.toFixed(1)} L ${x.toFixed(1)} ${y.toFixed(1)}`,
      w: 0.4,
      o: 0.3,
    });
  });

  // Strands between neighbouring spokes, sagging toward the hub.
  for (let r = 0; r < web.rings; r++) {
    const t = 0.18 + 0.82 * Math.pow((r + 1) / web.rings, 1.3);
    let d = "";
    angles.forEach((_, i) => {
      const j = (i + 1) % web.spokes;
      const [x1, y1] = at(i, t * (1 + noise(base + r * 13 + i) * 0.06));
      const [x2, y2] = at(j, t * (1 + noise(base + r * 13 + j) * 0.06));
      const delta =
        angles[j] > angles[i]
          ? angles[j] - angles[i]
          : angles[j] + Math.PI * 2 - angles[i];
      const midAngle = angles[i] + delta / 2;
      const sag = t * ((reach[i] + reach[j]) / 2) * (0.8 + noise(base + r * 7 + i) * 0.07);
      const mx = web.cx + Math.cos(midAngle) * sag;
      const my = web.cy + Math.sin(midAngle) * sag;
      if (i === 0) d += `M ${x1.toFixed(1)} ${y1.toFixed(1)} `;
      d += `Q ${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)} `;
    });
    ringLines.push({
      d,
      w: 0.45 + Math.abs(noise(base + r * 19)) * 0.35,
      o: 0.24 + Math.abs(noise(base + r * 23)) * 0.34,
    });
  }
});

const SonicBodyArt: React.FC = () => (
  <svg className="bodyart" viewBox={`0 0 ${W} ${H}`} role="img" aria-hidden="true">
    <g className="bodyart-strands">
      {spokeLines.map((l, i) => (
        <path key={`s${i}`} d={l.d} strokeWidth={l.w} opacity={l.o} />
      ))}
      {ringLines.map((l, i) => (
        <path key={`r${i}`} d={l.d} strokeWidth={l.w} opacity={l.o} />
      ))}
    </g>
  </svg>
);

export default SonicBodyArt;
