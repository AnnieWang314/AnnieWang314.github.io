# Project photos

Drop images in here, then reference them by filename in `src/details.ts`:

```ts
images: [
  { file: "somniac-pcb.jpg", alt: "Custom PCB", caption: "Optional caption." },
]
```

Filenames already referenced in `details.ts` (add any of these and they appear
automatically — the ones you haven't added yet are skipped, not broken):

- hackmit-logo.png  (HackMIT — the blue HACK mark; set `mark: true`)

Gallery tiles with no page of their own (filenames set in `src/entries.ts`
under each entry's `tile.image`) — until the file exists the tile shows its
sentence instead, which is fine:

- sonic-body.jpg  (math-paper.jpg is already in)

- modal-simulator.png
- somniac-hardware.jpg, somniac-pcb.jpg, somniac-emg.png
- thermominator-device.png (done), thermominator-team.jpg
- fpgacetime-setup.jpg (done)
- splash-blueprint-2025.jpg (done)
- plume-dashboard.png, plume-judging.png
- wodou-game.png (done)

Resize before committing — anything wider than ~1600px is wasted bytes:

    sips -Z 1600 photo.jpg --out src/assets/projects/photo.jpg
