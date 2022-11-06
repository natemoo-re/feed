import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: 'https://feed.nmoo.dev',
  vite: {
    ssr: {
      noExternal: ["he", "ultrahtml"],
    },
  },
});
