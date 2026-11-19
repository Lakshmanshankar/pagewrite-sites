import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";
import {
  collections as pagewriteCollections,
  resolveDataPath,
} from "pagewrite-astro/collections";

const docs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/docs" }),
  schema: z.object({
    id: z.string().optional(),
    pageId: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
    order: z.number().default(99),
    section: z.string().default("Getting Started"),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    metaKeywords: z.array(z.string()).optional(),
    noindex: z.boolean().optional(),
    datePublished: z.union([z.string(), z.date()]).optional(),
    publishedDate: z.union([z.string(), z.date()]).optional(),
    pageStatus: z.string().optional(),
    slug: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export interface PageTreeNode {
  id: string;
  title: string;
  slug?: string;
  order?: number;
  children?: PageTreeNode[];
}

export const pageTreeSchema: z.ZodType<PageTreeNode> = z.lazy(() =>
  z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string().optional(),
    order: z.number().optional(),
    children: z.array(pageTreeSchema).optional(),
  })
);

function addOrderToTree(nodes: any[]): any[] {
  return nodes.map((node, index) => ({
    ...node,
    order: typeof node.order === "number" ? node.order : index,
    ...(node.children && Array.isArray(node.children)
      ? { children: addOrderToTree(node.children) }
      : {}),
  }));
}

export function parsePageTree(text: string): Array<Record<string, unknown>> {
  const data = JSON.parse(text);
  if (Array.isArray(data)) {
    return addOrderToTree(data);
  }
  if (typeof data === "object" && data !== null) {
    if (!("id" in data)) {
      return Object.entries(data).map(([id, val], index) => {
        if (typeof val === "object" && val !== null && !Array.isArray(val)) {
          return { id, order: index, ...val };
        }
        return { id, order: index, data: val };
      });
    }
    return [{ order: 0, ...data }];
  }
  return [];
}

const pageTreeFile = resolveDataPath("pageTree.json", "pageMap.json");

const pageTree = defineCollection({
  loader: file(pageTreeFile, { parser: parsePageTree }),
  schema: pageTreeSchema,
});

export const collections = {
  docs,
  ...pagewriteCollections,
  pageTree,
  pageMap: pageTree,
};
