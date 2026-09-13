import { useContext, useEffect, useState, type CSSProperties } from "react";
import { useLocation } from "react-router-dom";
import { BANANA, BananaSeed, chance, hash } from "./banana";

/** Roughly one banana per this many pixels of page height, within limits. */
const PX_PER_BANANA = 18;
const MIN_BANANAS = 80;
const MAX_BANANAS = 220;

/** Where one banana sits, and how it floats — every value repeatable for a seed. */
function drift(seed: number, i: number): CSSProperties {
  const r = (k: number) => chance(seed, i * 10 + k);
  const sign = (k: number) => (r(k) < 0.5 ? -1 : 1);
  const duration = 16 + r(4) * 24; // 16–40s per swing: slow, like clouds

  return {
    top: `${(r(0) * 100).toFixed(2)}%`,
    left: `${(r(1) * 100).toFixed(2)}%`,
    fontSize: `${Math.round(14 + r(2) * 34)}px`,
    "--rot": `${Math.round(r(3) * 360)}deg`,
    "--dx": `${Math.round(sign(5) * (30 + r(6) * 90))}px`,
    "--dy": `${Math.round(sign(7) * (8 + r(8) * 30))}px`,
    "--spin": `${Math.round(sign(9) * (8 + r(9) * 30))}deg`,
    animationDuration: `${duration.toFixed(1)}s`,
    // Negative delay starts each one partway through, so they don't all set off together.
    animationDelay: `-${(r(4) * duration).toFixed(1)}s`,
  } as CSSProperties;
}

/** Bananas strewn across the whole page, behind the content. banannie.wang only. */
export default function Bananas() {
  const seed = useContext(BananaSeed);
  const { pathname } = useLocation();
  const [count, setCount] = useState(0);

  // Sized from the page itself, so a long project page is as crowded as home.
  useEffect(() => {
    if (!BANANA || seed === null) return;
    const height = document.documentElement.scrollHeight;
    setCount(
      Math.min(MAX_BANANAS, Math.max(MIN_BANANAS, Math.round(height / PX_PER_BANANA)))
    );
  }, [seed, pathname]);

  if (!BANANA || seed === null || count === 0) return null;

  // New layout per page and per load, but steady while you're on the page.
  const pageSeed = (hash(pathname.replace(/\/+$/, "") || "/") ^ seed) >>> 0;

  return (
    <div className="banana-layer" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} style={drift(pageSeed, i)}>
          🍌
        </span>
      ))}
    </div>
  );
}
