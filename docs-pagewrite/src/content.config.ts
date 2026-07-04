import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    id: z.string().optional(),
    pageId: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
    order: z.number().default(99),
    section: z.string().default('Getting Started'),
  }),
});

export const collections = { docs };
