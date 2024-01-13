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
        "resources/js/event/akad/music/app.js",
        "resources/css/event/akad/music/app.scss",
      ],
    }),
  ],
});
