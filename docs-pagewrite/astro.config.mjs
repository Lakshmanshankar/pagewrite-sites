// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';
import pagewriteAstro from '@lakshmanshankar/pagwrite-astro';
import AutoImport from 'astro-auto-import';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');
// const token = env.PAGEWRITE_BUILD_TOKEN || '';
const docsBuildToken = env.PAGEWRITE_DOCS_BUILD_TOKEN || '';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    pagewriteAstro({
      siteId: "501e6574-3d05-4481-b19f-41ff09b0ec55",
      token: docsBuildToken,
      clean: true,
    }),
    AutoImport({
      imports: [
        "./src/components/Image.astro",
        "./src/components/Code.astro",
        "./src/components/Spacer.astro",
        "./src/components/Callout.astro",
      ],
    }),
    mdx()
  ]
});
