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
      buildDirectory: "build-pg3UKx",
      input: [
        "resources/js/event-guest/akad/music/app.js",
        "resources/css/event-guest/akad/music/app.scss",
      ],
    }),
  ],
});
