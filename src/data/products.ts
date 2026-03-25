import type { Product, ProductCategory } from '../types/product';

const PRODUCTS_URL =
  'https://raw.githubusercontent.com/JohanGytHub/meteorite-jewelry-data/refs/heads/main/meteorite_products_clean.json';

let _cache: Product[] | null = null;

export async function fetchProducts(): Promise<Product[]> {
  if (_cache) return _cache;

  let res: Response;
  try {
    res = await fetch(PRODUCTS_URL);
  } catch (err) {
    throw new Error(
      `[meteorite-jewelry] Failed to fetch product data from GitHub.\n` +
      `URL: ${PRODUCTS_URL}\n` +
      `Make sure the repository is public and the URL is reachable during build.\n` +
      `Original error: ${err}`
    );
  }

  if (!res.ok) {
    throw new Error(
      `[meteorite-jewelry] Product data fetch returned HTTP ${res.status}.\n` +
      `URL: ${PRODUCTS_URL}`
    );
  }

  const text = await res.text();
  // The JSON contains NaN values (not valid JSON) — sanitize before parsing
  const sanitized = text.replace(/:\s*NaN\b/g, ': null');
  _cache = JSON.parse(sanitized) as Product[];
  return _cache;
}

export function getMinPrice(product: Product): number {
  const prices = product.variants
    .map((v) => parseFloat(v.price))
    .filter((p) => !isNaN(p));
  return prices.length > 0 ? Math.min(...prices) : 0;
}

export function getMaxPrice(product: Product): number {
  const prices = product.variants
    .map((v) => parseFloat(v.price))
    .filter((p) => !isNaN(p));
  return prices.length > 0 ? Math.max(...prices) : 0;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function getPrimaryImage(product: Product): string {
  const img = product.images.find((i) => i.position === 1) || product.images[0];
  return img ? img.src : '';
}

export function getProductAlt(product: Product): string {
  const img = product.images.find((i) => i.position === 1) || product.images[0];
  return (img?.alt?.trim()) || product.title;
}

export function getCategoryProducts(products: Product[], category: ProductCategory): Product[] {
  if (category === 'all') return products;

  switch (category) {
    case 'rings':
      return products.filter(
        (p) =>
          p.product_type === 'Rings' &&
          !p.tags.includes('earrings') &&
          !p.tags.includes('pendant')
      );
    case 'earrings':
      return products.filter(
        (p) =>
          p.product_type === 'Earrings' ||
          p.tags.toLowerCase().includes('earring')
      );
    case 'pendants':
      return products.filter(
        (p) =>
          p.product_type === 'Pendants' ||
          p.product_type === 'Necklaces' ||
          p.tags.toLowerCase().includes('pendant') ||
          p.tags.toLowerCase().includes('necklace')
      );
    case 'cufflinks':
      return products.filter(
        (p) =>
          p.product_type === 'Cufflinks' ||
          p.product_type === 'Cuff Links' ||
          p.tags.toLowerCase().includes('cufflink') ||
          p.tags.toLowerCase().includes('cuff link')
      );
    case 'tie-clips':
      return products.filter(
        (p) =>
          p.product_type === 'Tie Clips' ||
          p.product_type === 'Tie Clip' ||
          p.tags.toLowerCase().includes('tie clip') ||
          p.tags.toLowerCase().includes('tie tack') ||
          p.tags.toLowerCase().includes('tie bar') ||
          p.tags.toLowerCase().includes('tie-clip') ||
          p.tags.toLowerCase().includes('tie-tack') ||
          p.tags.toLowerCase().includes('tie-bar')
      );
    case 'ring-sets':
      return products.filter(
        (p) => p.product_type === 'Ring Sets'
      );
    case 'unique':
      return products.filter(
        (p) =>
          p.product_type !== 'Rings' &&
          p.product_type !== 'Ring Sets' &&
          p.product_type !== 'Earrings' &&
          p.product_type !== 'Pendants' &&
          p.product_type !== 'Necklaces' &&
          p.product_type !== 'Cufflinks' &&
          p.product_type !== 'Cuff Links' &&
          p.product_type !== 'Tie Clips' &&
          p.product_type !== 'Tie Clip'
      );
    default:
      return products;
  }
}

export function getFeaturedProducts(products: Product[], count = 8): Product[] {
  // Prioritize products with most images and higher prices (implies premium)
  return [...products]
    .sort((a, b) => {
      const aScore = a.images.length * 10 + getMinPrice(a) / 100;
      const bScore = b.images.length * 10 + getMinPrice(b) / 100;
      return bScore - aScore;
    })
    .slice(0, count);
}

export function getBestsellers(products: Product[], count = 6): Product[] {
  // Engagement rings + top-priced items tend to be bestsellers
  const engagement = products.filter((p) =>
    p.tags.toLowerCase().includes('engagement')
  );
  const rest = products.filter(
    (p) => !p.tags.toLowerCase().includes('engagement')
  );
  return [...engagement, ...rest].slice(0, count);
}

export function getRelatedProducts(
  products: Product[],
  current: Product,
  count = 4
): Product[] {
  const currentTags = current.tags.toLowerCase().split(',').map((t) => t.trim());
  return products
    .filter((p) => p.handle !== current.handle)
    .map((p) => {
      const pTags = p.tags.toLowerCase().split(',').map((t) => t.trim());
      const shared = currentTags.filter((t) => pTags.includes(t)).length;
      return { product: p, score: shared };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((x) => x.product);
}

export function getMaterials(product: Product): string[] {
  const tags = product.tags.toLowerCase();
  const body = product.body_html.toLowerCase();
  const mats: string[] = [];
  if (tags.includes('meteorite') || tags.includes('stardust') || body.includes('stardust')) mats.push('Gibeon Meteorite');
  if (tags.includes('titanium')) mats.push('Titanium');
  if (tags.includes('yellow-gold') || tags.includes('yellow gold')) mats.push('14k Yellow Gold');
  if (tags.includes('white-gold') || tags.includes('white gold')) mats.push('14k White Gold');
  if (tags.includes('rose-gold') || tags.includes('rose gold')) mats.push('14k Rose Gold');
  if (tags.includes('dinosaur-bone') || tags.includes('dinosaur bone')) mats.push('Dinosaur Bone');
  if (tags.includes('whiskey barrel') || tags.includes('oak')) mats.push('Whiskey Barrel Oak');
  if (tags.includes('diamond')) mats.push('Diamond');
  if (tags.includes('moissanite')) mats.push('Moissanite');
  if (tags.includes('sapphire')) mats.push('Sapphire');
  return mats;
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
}

export const MAIN_STORE = 'https://jewelrybyjohan.com';

export function productUrl(handle: string): string {
  return `${MAIN_STORE}/products/${handle}`;
}