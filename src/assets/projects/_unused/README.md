Images kept but not on the site.

`import.meta.glob` in src/projectImages.ts matches `assets/projects/*` only —
not subfolders — so anything in here is excluded from the bundle. To use one,
move it up a level and add an entry in src/details.ts.
