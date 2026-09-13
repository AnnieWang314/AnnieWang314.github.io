import { chance } from "./banana";

/** One banana per this many square pixels of page, within limits. */
export const AREA_PER_BANANA = 24_000;
export const MIN_BANANAS = 30;
export const MAX_BANANAS = 150;

/** Pixels per second. Kept slow so they drift and bump like clouds, not pinballs. */
export const MIN_SPEED = 8;
export const MAX_SPEED = 24;

export interface Body {
  /** Centre, in page pixels. */
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Degrees, and degrees per second. */
  angle: number;
  spin: number;
  /** Font size, and the radius used for bumping. */
  size: number;
  r: number;
}

/** How many bananas a page of this size gets. */
export function crowdFor(width: number, height: number): number {
  return Math.min(
    MAX_BANANAS,
    Math.max(MIN_BANANAS, Math.round((width * height) / AREA_PER_BANANA))
  );
}

/** Font size for a banana. Needed while rendering, so it's derived rather than simulated. */
export function sizeOf(seed: number, i: number): number {
  return Math.round(16 + chance(seed, i * 10 + 2) * 30);
}

/** A new banana somewhere on the page, heading off in a random direction. */
export function spawn(seed: number, i: number, w: number, h: number, placed: Body[]): Body {
  const rand = (k: number) => chance(seed, i * 10 + k);
  const size = sizeOf(seed, i);
  const r = size * 0.42;
  const spanX = Math.max(1, w - 2 * r);
  const spanY = Math.max(1, h - 2 * r);

  // Try a handful of spots so they don't start stacked on each other.
  let x = r + rand(0) * spanX;
  let y = r + rand(1) * spanY;
  for (let attempt = 0; attempt < 12; attempt++) {
    if (!placed.some((b) => Math.hypot(b.x - x, b.y - y) < b.r + r)) break;
    x = r + chance(seed, i * 97 + attempt * 7 + 3) * spanX;
    y = r + chance(seed, i * 89 + attempt * 5 + 4) * spanY;
  }

  const heading = rand(5) * Math.PI * 2;
  const speed = MIN_SPEED + rand(6) * (MAX_SPEED - MIN_SPEED);
  return {
    x,
    y,
    vx: Math.cos(heading) * speed,
    vy: Math.sin(heading) * speed,
    angle: rand(7) * 360,
    spin: (rand(8) < 0.5 ? -1 : 1) * (2 + rand(9) * 10),
    size,
    r,
  };
}

/** Keeps a banana moving, but never faster than a slow drift — so bumps stay gentle. */
export function keepSpeed(b: Body): void {
  const speed = Math.hypot(b.vx, b.vy);
  if (speed === 0) {
    b.vx = MIN_SPEED;
    return;
  }
  const target = Math.min(MAX_SPEED, Math.max(MIN_SPEED, speed));
  if (target !== speed) {
    b.vx *= target / speed;
    b.vy *= target / speed;
  }
}

/**
 * Advances the crowd by `dt` seconds: drift, reflect off the page edges, and
 * bounce gently off each other.
 */
export function step(bodies: Body[], dt: number, w: number, h: number): void {
  for (const b of bodies) {
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    b.angle += b.spin * dt;

    if (b.x - b.r < 0) {
      b.x = b.r;
      b.vx = Math.abs(b.vx);
    } else if (b.x + b.r > w) {
      b.x = w - b.r;
      b.vx = -Math.abs(b.vx);
    }
    if (b.y - b.r < 0) {
      b.y = b.r;
      b.vy = Math.abs(b.vy);
    } else if (b.y + b.r > h) {
      b.y = h - b.r;
      b.vy = -Math.abs(b.vy);
    }
  }

  // Elastic bumps between discs of equal density, so bigger bananas push harder.
  for (let i = 0; i < bodies.length; i++) {
    const a = bodies[i];
    for (let j = i + 1; j < bodies.length; j++) {
      const c = bodies[j];
      const dx = c.x - a.x;
      const dy = c.y - a.y;
      const reach = a.r + c.r;
      const distSq = dx * dx + dy * dy;
      if (distSq >= reach * reach || distSq === 0) continue;

      const dist = Math.sqrt(distSq);
      const nx = dx / dist;
      const ny = dy / dist;
      const invA = 1 / (a.r * a.r);
      const invC = 1 / (c.r * c.r);
      const invTotal = invA + invC;

      // Separate them so they don't sink into each other.
      const overlap = reach - dist;
      a.x -= nx * overlap * (invA / invTotal);
      a.y -= ny * overlap * (invA / invTotal);
      c.x += nx * overlap * (invC / invTotal);
      c.y += ny * overlap * (invC / invTotal);

      const approach = (a.vx - c.vx) * nx + (a.vy - c.vy) * ny;
      if (approach <= 0) continue; // already moving apart

      const impulse = (2 * approach) / invTotal;
      a.vx -= impulse * invA * nx;
      a.vy -= impulse * invA * ny;
      c.vx += impulse * invC * nx;
      c.vy += impulse * invC * ny;
    }
  }

  for (const b of bodies) keepSpeed(b);
}
