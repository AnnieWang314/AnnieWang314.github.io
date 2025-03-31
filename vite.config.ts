import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        fallback: "404.html", // we'll copy index.html to 404.html after build
      },
    },
  },
});
