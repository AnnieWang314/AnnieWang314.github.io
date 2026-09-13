import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  type ReactNode,
} from "react";

/** True only in the banannie.wang build (`vite --mode banana`). */
export const BANANA = import.meta.env.VITE_BANANA === "1";

const EMOJI = "🍌";

/** Share of words that get a banana after them. */
const WORD_RATE = 0.2;
/** Share of short labels ("Somniac", "HackMIT") that get one on the end. */
const LABEL_RATE = 0.55;

/** FNV-1a. Turns a seed plus a string into a stable number. */
export function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Final avalanche step (murmur3's fmix32). FNV-1a alone barely changes between
 * inputs that differ in one trailing digit, so neighbouring bananas landed in
 * straight diagonal lines; this spreads every bit of the input across the output.
 */
function mix(h: number): number {
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

/** A repeatable 0..1 number for a seed and an index. */
export function chance(seed: number, i: number): number {
  return (mix(hash(`${seed}:${i}`)) % 10000) / 10000;
}

/**
 * The random seed for this page load. It's `null` on the server and during
 * hydration, so the pre-built HTML and the first browser render match exactly;
 * App then sets a fresh random number, which is what moves the bananas on every
 * reload. Everything is derived from it, so re-renders don't reshuffle them.
 */
export const BananaSeed = createContext<number | null>(null);

function bananifyText(text: string, seed: number): string {
  if (!text.trim()) return text;
  const words = text.split(" ");
  const s = (hash(text) ^ seed) >>> 0;

  if (words.filter(Boolean).length < 4) {
    return chance(s, 0) < LABEL_RATE ? `${text} ${EMOJI}` : text;
  }

  return words
    .map((word, i) =>
      word &&
      i < words.length - 1 &&
      !/https?:|@|\//.test(word) &&
      chance(s, i) < WORD_RATE
        ? `${word} ${EMOJI}`
        : word
    )
    .join(" ");
}

function transform(node: ReactNode, seed: number): ReactNode {
  if (typeof node === "string") return bananifyText(node, seed);
  if (Array.isArray(node)) return Children.map(node, (child) => transform(child, seed));
  if (
    isValidElement<{ children?: ReactNode }>(node) &&
    node.props.children !== undefined
  ) {
    // Only visible text is touched — alt text, links and labels stay intact.
    return cloneElement(node, undefined, transform(node.props.children, seed));
  }
  return node;
}

/**
 * Returns a function that sprinkles bananas through every piece of text in a
 * tree. It passes text through untouched on wannie.wang, and on banannie.wang
 * until this load's seed exists.
 */
export function useBanana() {
  const seed = useContext(BananaSeed);
  return useCallback(
    (node: ReactNode): ReactNode =>
      BANANA && seed !== null ? transform(node, seed) : node,
    [seed]
  );
}
