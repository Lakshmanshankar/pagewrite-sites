// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import AutoImport from 'astro-auto-import';
import mdx from '@astrojs/mdx';

import { loadEnv } from 'vite';
import { pagewriteAstro } from 'pagewrite-astro';
//
const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');
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
        "./src/components/CodeBlock.astro",
        "./src/components/mdx/FolderList.astro",
        {
          'pagewrite-ui/mdx': ['Callout', 'Image', 'Spacer', 'Columns', 'ColumnItem', 'ContactForm', 'Expand', 'Tabs', 'TabItem']
        }
      ],
    }),
    mdx(),
  ],

  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark-high-contrast",
      },
      transformers: [
        {
          pre(node) {
            node.properties['data-language'] = this.options.lang;
          },
        },
      ],
    },
  },

});
