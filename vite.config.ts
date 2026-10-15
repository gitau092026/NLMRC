import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteCompression from "vite-plugin-compression";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  assetsInclude: ["**/*.JPG", "**/*.JPEG"],
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Gzip for broad browser support
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 1024,
    }),
    // Brotli for modern browsers (smaller than gzip)
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 1024,
    }),
  ],
  build: {
    // Inline assets smaller than 4 KB to eliminate extra requests
    assetsInlineLimit: 4096,
    // Enable CSS code splitting per chunk
    cssCodeSplit: true,
    // Use esbuild minifier (faster + smaller output)
    minify: "esbuild",
    // Target broad browser support (ES2015 = IE-free modern baseline)
    target: "es2015",
    rollupOptions: {
      output: {
        // Split large third-party libraries into separate cacheable chunks
        manualChunks(id) {
          // Core React runtime — always cached
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) {
            return "react-core";
          }
          // Router
          if (id.includes("node_modules/react-router-dom") || id.includes("node_modules/react-router/")) {
            return "router";
          }
          // Animation library (still used in some pages)
          if (id.includes("node_modules/framer-motion")) {
            return "framer-motion";
          }
          // Radix UI components (many small packages → one chunk)
          if (id.includes("node_modules/@radix-ui/")) {
            return "radix-ui";
          }
          // Charts (recharts + d3 dependencies)
          if (id.includes("node_modules/recharts") || id.includes("node_modules/d3-")) {
            return "charts";
          }
          // Embla carousel
          if (id.includes("node_modules/embla-carousel")) {
            return "embla-carousel";
          }
          // Remaining node_modules → vendor chunk
          if (id.includes("node_modules/")) {
            return "vendor";
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
