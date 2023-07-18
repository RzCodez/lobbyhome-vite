import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },

  build: {
    outDir: "dist",
    minify: true,
    rollupOptions: {
      output: {
        entryFileNames: "[name]-[hash].js",
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: '[name]-[hash][extname]?v=[hash]',
      },
    },
  },
});