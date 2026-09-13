import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { BANANA, BananaSeed, hash } from "./banana";
import { crowdFor, sizeOf, spawn, step, type Body } from "./bananaPhysics";

/**
 * Bananas drifting across the whole page, bumping gently into each other and
 * the edges. banannie.wang only.
 */
export default function Bananas() {
  const seed = useContext(BananaSeed);
  const { pathname } = useLocation();
  const active = BANANA && seed !== null;
  const pageSeed = (hash(pathname.replace(/\/+$/, "") || "/") ^ (seed ?? 0)) >>> 0;

  const layerRef = useRef<HTMLDivElement>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const bodies = useRef<Body[]>([]);
  const bounds = useRef({ w: 0, h: 0 });
  const [count, setCount] = useState(0);

  // Measure the page and size the crowd from its area; follow it as it resizes.
  useEffect(() => {
    const layer = layerRef.current;
    if (!active || !layer) return;
    bodies.current = []; // a new page or a new load starts a fresh layout

    const measure = () => {
      const { width, height } = layer.getBoundingClientRect();
      bounds.current = { w: width, h: height };
      setCount(crowdFor(width, height));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(layer);
    return () => observer.disconnect();
  }, [active, pageSeed]);

  // Grow or shrink the crowd to match, keeping the bananas already out there.
  useEffect(() => {
    if (!active) return;
    const list = bodies.current;
    const { w, h } = bounds.current;
    while (list.length < count) list.push(spawn(pageSeed, list.length, w, h, list));
    list.length = count;
  }, [active, count, pageSeed]);

  // Once a frame: move and bounce, then draw.
  useEffect(() => {
    const layer = layerRef.current;
    if (!active || !layer || count === 0) return;
    // Still placed, just not moving, for people who've asked for less motion.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      // Capped so coming back to a background tab doesn't teleport everything.
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const { w, h } = bounds.current;
      if (!reduced) step(bodies.current, dt, w, h);

      bodies.current.forEach((b, i) => {
        const el = spanRefs.current[i];
        if (!el) return;
        el.style.transform = `translate3d(${(b.x - b.size / 2).toFixed(1)}px, ${(
          b.y -
          b.size / 2
        ).toFixed(1)}px, 0) rotate(${b.angle.toFixed(1)}deg)`;
      });
      layer.dataset.ready = "";
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, count]);

  if (!active) return null;

  return (
    <div className="banana-layer" ref={layerRef} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          ref={(el) => {
            spanRefs.current[i] = el;
          }}
          style={{ fontSize: `${sizeOf(pageSeed, i)}px` }}
        >
          🍌
        </span>
      ))}
    </div>
  );
}
