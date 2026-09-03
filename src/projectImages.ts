/**
 * Images live in src/assets/projects/ and are referenced by filename from
 * details.ts. Globbing rather than importing means a filename listed before the
 * photo exists is simply skipped instead of breaking the build.
 */
const modules = import.meta.glob(
  "./assets/projects/*.{jpg,jpeg,png,webp,avif,gif}",
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

export function projectImage(file: string): string | undefined {
  return modules[`./assets/projects/${file}`];
}
