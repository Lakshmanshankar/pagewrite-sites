import { getCollection } from 'astro:content';

export async function GET() {
  const docs = await getCollection('docs');
  const index = docs.map((doc) => ({
    title: doc.data.title,
    description: doc.data.description || '',
    slug: doc.id === 'index' ? '' : (doc.id.endsWith('/index') ? doc.id.slice(0, -6) : doc.id),
    section: doc.data.section,
    content: doc.body,
  }));
  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
