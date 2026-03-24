export interface ProductImage {
  src: string;
  alt: string;
  position: number;
}

export interface ProductVariant {
  id: string | null;
  title: string;
  price: string;
  compare_at_price: string | null;
  sku: string;
  inventory_quantity: string;
  option1_value: string;
  option2_value: string | null;
}

export interface Product {
  id: string | null;
  title: string;
  handle: string;
  body_html: string;
  vendor: string;
  product_type: string;
  tags: string;
  full_url: string;
  images: ProductImage[];
  variants: ProductVariant[];
}

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  date: string;
  readTime: number;
  category: string;
  tags: string[];
  body: string;
  coverImage?: string;
  metaTitle: string;
  metaDescription: string;
}

export type ProductCategory = 'rings' | 'earrings' | 'pendants' | 'cufflinks' | 'tie-clips' | 'ring-sets' | 'unique' | 'all';

export interface FilterState {
  priceMin?: number;
  priceMax?: number;
  metal?: string;
  style?: string;
}