import type { APIRoute } from 'astro';
import { fetchProducts } from '../data/products';
import { blogPosts } from '../data/blog';

// Required for static output — tells Astro to generate sitemap.xml at build time
export const prerender = true;

export const GET: APIRoute = async () => {
  const products = await fetchProducts();
  const baseUrl = 'https://meteorite.jewelry';
  const date = new Date().toISOString().split('T')[0];

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/rings', priority: '0.9', changefreq: 'weekly' },
    { url: '/ring-sets', priority: '0.85', changefreq: 'weekly' },
    { url: '/earrings', priority: '0.8', changefreq: 'weekly' },
    { url: '/pendants', priority: '0.8', changefreq: 'weekly' },
    { url: '/cufflinks', priority: '0.8', changefreq: 'weekly' },
    { url: '/tie-clips', priority: '0.8', changefreq: 'weekly' },
    { url: '/unique', priority: '0.7', changefreq: 'weekly' },
    { url: '/about', priority: '0.7', changefreq: 'monthly' },
    { url: '/blog', priority: '0.8', changefreq: 'weekly' },
    { url: '/sizing-guide', priority: '0.7', changefreq: 'monthly' },
    { url: '/contact', priority: '0.6', changefreq: 'monthly' },
    { url: '/return-policy', priority: '0.6', changefreq: 'yearly' },
  ];

  const productPages = products.map((p) => ({
    url: `/products/${p.handle}`,
    priority: '0.8',
    changefreq: 'monthly',
  }));

  const blogPages = blogPosts.map((p) => ({
    url: `/blog/${p.slug}`,
    priority: '0.7',
    changefreq: 'yearly',
  }));

  const allPages = [...staticPages, ...productPages, ...blogPages];

  const urls = allPages
    .map(
      (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};