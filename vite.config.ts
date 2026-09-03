import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";

const require = createRequire(import.meta.url);

// maplibre-gl loads a web worker at runtime, but resolves its URL dynamically at
// runtime rather than via a static `new URL(..., import.meta.url)`, so Vite/Rolldown
// can't detect it and never emits the worker as a build asset (it 404s in production).
// This copies the worker script and its shared chunk from node_modules to a fixed
// root path, which home.tsx points maplibregl.setWorkerUrl() at.
function maplibreGlWorkerAssets(): Plugin {
  const baseFiles = ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"];
  // Include the .map companions too: wrangler's upload_source_maps rejects any
  // attached module whose `//# sourceMappingURL` comment points at a missing file.
  const files = baseFiles.flatMap((f) => [f, `${f}.map`]);
  const distDir = path.dirname(require.resolve("maplibre-gl/dist/maplibre-gl-worker.mjs"));

  return {
    name: "maplibre-gl-worker-assets",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const file = files.find((f) => req.url === `/${f}`);
        if (!file) return next();
        res.setHeader("Content-Type", "text/javascript");
        res.end(readFileSync(path.join(distDir, file)));
      });
    },
    generateBundle() {
      // Only the client build serves these as static assets; the SSR/Worker build
      // never imports maplibre-gl (it's confined to a *.client.tsx component), so
      // emitting them there too would just bloat the deployed Worker for nothing.
      if (this.environment?.name !== "client") return;
      for (const file of files) {
        this.emitFile({
          type: "asset",
          fileName: file,
          source: readFileSync(path.join(distDir, file)),
        });
      }
    },
  };
}

export default defineConfig({
  plugins: [maplibreGlWorkerAssets(), cloudflare({ viteEnvironment: { name: "ssr" } }), tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  optimizeDeps: {
    exclude: ["maplibre-gl"],
  },
});
