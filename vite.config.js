import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: `[name].[ext]`,
        chunkFileNames: `[name].js`,
        entryFileNames: `[name].js`,
      },
    },
  },
  plugins: [
    laravel({
      input: ["resources/js/app.js", "resources/css/app.scss"],
    }),
  ],
});
