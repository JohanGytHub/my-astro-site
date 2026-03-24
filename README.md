# Meteorite Jewelry by Johan — meteorite.jewelry

A high-converting luxury micro-site for authentic Gibeon meteorite jewelry, built with Astro 4, TypeScript, and Tailwind CSS. Deployed on Cloudflare Pages.

---

## Stack

| Technology | Version | Purpose |
|---|---|---|
| Astro | ^4.15 | Static site generation |
| TypeScript | ^5.5 | Type safety |
| Tailwind CSS | ^3.4 | Utility styling |
| Cloudflare Pages | — | Hosting + CDN |

---

## Project Structure

```
meteorite-jewelry/
├── public/
│   ├── favicon.svg           # Site icon
│   ├── manifest.json         # PWA manifest
│   ├── robots.txt            # SEO crawl rules
│   ├── _headers              # Cloudflare security headers
│   ├── _redirects            # URL redirects
│   └── og-default.svg        # Default OG image
│
├── src/
│   ├── data/
│   │   ├── products.ts       # Product fetching + utilities
│   │   └── blog.ts           # Blog post data + utilities
│   │
│   ├── types/
│   │   └── product.ts        # TypeScript interfaces
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro  # Global HTML shell, SEO, fonts
│   │   └── CollectionLayout.astro  # Shared category page layout
│   │
│   ├── components/
│   │   ├── Nav.astro         # Fixed navigation with mobile menu
│   │   ├── Footer.astro      # Footer with trust signals
│   │   ├── ProductCard.astro # Product grid card
│   │   └── TrustBar.astro    # Conversion trust signals bar
│   │
│   └── pages/
│       ├── index.astro           # Homepage (hero, categories, bestsellers)
│       ├── about.astro           # Brand story + artisan process
│       ├── contact.astro         # Contact page
│       ├── sizing-guide.astro    # Ring sizing guide + size chart
│       ├── 404.astro             # Not found page
│       ├── sitemap.xml.astro     # Dynamic XML sitemap
│       ├── rings/index.astro     # Rings collection
│       ├── earrings/index.astro  # Earrings collection
│       ├── pendants/index.astro  # Pendants collection
│       ├── earplugs/index.astro  # Earplugs collection
│       ├── unique/index.astro    # Unique pieces collection
│       ├── products/[handle].astro  # Product detail pages
│       ├── blog/index.astro         # Blog listing
│       └── blog/[slug].astro        # Blog post detail
│
├── package.json
├── astro.config.mjs
├── tailwind.config.js
└── tsconfig.json
```

---

## Local Development

### Prerequisites
- Node.js 18+ (Node 20 LTS recommended)
- npm 9+

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
open http://localhost:4321
```

### Build for production

```bash
npm run build
# Output: dist/
```

### Preview production build locally

```bash
npm run preview
```

---

## Cloudflare Pages Deployment

Follow these exact steps to deploy to Cloudflare Pages.

### Step 1: Push to GitHub

```bash
# Initialize git (if not already)
cd meteorite-jewelry
git init
git add .
git commit -m "Initial commit — Meteorite Jewelry site"

# Create a new GitHub repository at https://github.com/new
# Then connect it:
git remote add origin https://github.com/YOUR_USERNAME/meteorite-jewelry.git
git branch -M main
git push -u origin main
```

### Step 2: Create Cloudflare Pages Project

1. Log into [Cloudflare Dashboard](https://dash.cloudflare.com)
2. In the left sidebar, click **Workers & Pages**
3. Click **Create application**
4. Click the **Pages** tab
5. Click **Connect to Git**
6. Authorize Cloudflare to access your GitHub account if prompted
7. Select your `meteorite-jewelry` repository
8. Click **Begin setup**

### Step 3: Configure Build Settings

On the "Set up builds and deployments" screen, enter these **exact** settings:

| Setting | Value |
|---|---|
| **Production branch** | `main` |
| **Framework preset** | `Astro` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | *(leave blank)* |
| **Node.js version** | `20` |

### Step 4: Set Environment Variables (Optional)

Click **Environment variables (advanced)** and add:

| Variable | Value |
|---|---|
| `NODE_VERSION` | `20` |

### Step 5: Deploy

1. Click **Save and Deploy**
2. Cloudflare will clone your repository, install dependencies, and build
3. First deployment takes ~3–5 minutes
4. You'll get a `*.pages.dev` URL when complete (e.g., `meteorite-jewelry.pages.dev`)

### Step 6: Add Custom Domain (meteorite.jewelry)

1. In your Pages project, click **Custom domains**
2. Click **Set up a custom domain**
3. Enter `meteorite.jewelry`
4. Cloudflare will show you DNS records to add:
   - If your domain is **on Cloudflare DNS**: records are added automatically
   - If your domain is **elsewhere**: add the CNAME record shown
5. Click **Activate domain**
6. SSL certificate is provisioned automatically (usually < 5 minutes)

### Step 7: Verify Deployment

After deployment, check these URLs work:

```
https://meteorite.jewelry/
https://meteorite.jewelry/rings
https://meteorite.jewelry/products/[any-handle]
https://meteorite.jewelry/blog
https://meteorite.jewelry/sizing-guide
https://meteorite.jewelry/sitemap.xml
https://meteorite.jewelry/robots.txt
```

---

## Subsequent Deployments

Every push to the `main` branch on GitHub automatically triggers a new Cloudflare Pages build and deployment. No manual steps required.

To manually trigger a deployment:
1. Cloudflare Dashboard → Workers & Pages → meteorite-jewelry
2. Click **Deployments** tab
3. Click **Retry deployment** on any previous deployment

---

## Product Data

All product data is fetched at build time from:
```
https://raw.githubusercontent.com/JohanGytHub/meteorite-jewelry-data/refs/heads/main/meteorite_products_clean.json
```

**To update products:** Update the JSON file in the GitHub repository at `JohanGytHub/meteorite-jewelry-data`, then trigger a new Cloudflare Pages build (or push any change to this repo).

---

## Design System

### Color Palette

| Token | Dark Mode | Light Mode | Usage |
|---|---|---|---|
| `--c-bg` | `#0a0a0f` | `#f7f6f2` | Page background |
| `--c-surface` | `#16161f` | `#faf9f6` | Cards, panels |
| `--c-gold` | `#c9901f` | `#a07030` | Primary accent |
| `--c-text` | `#eeeef2` | `#1a1a28` | Body text |
| `--c-text-muted` | `#8a8d9e` | `#5a5e72` | Secondary text |

### Typography

- **Serif** (Cormorant Garamond): Headings, product titles, poetic copy
- **Sans** (DM Sans): Body text, UI labels, navigation, prices

### Key CSS Classes

```css
.btn-primary   /* Gold CTA button */
.btn-outline   /* Bordered ghost button */
.card          /* Hoverable card with transition */
.shimmer-text  /* Animated gold-silver shimmer text */
.shimmer-overlay /* Image hover shimmer effect */
.reveal        /* Scroll-triggered fade-up animation */
.label         /* Small caps gold label */
.section       /* Standard section padding */
.container     /* Max-width centered wrapper */
.container-sm  /* Narrower max-width wrapper */
.serif         /* Apply serif font */
.prose         /* Blog article styles */
.wid-pattern   /* Widmanstätten background texture */
```

---

## SEO Notes

- Every page has unique `<title>`, `<meta description>`, Open Graph, and Twitter Card tags
- JSON-LD schema markup: `Organization` (all pages), `Product` (product pages), `Article` (blog posts)
- `sitemap.xml` auto-generates at build time including all products and blog posts
- `robots.txt` in public/ — allows all crawlers, references sitemap
- All product page `<h1>` tags use the product title directly
- Image `alt` text pulled from product data

---

## CTAs: All Orders → Main Store

Every "Shop", "Order", "Buy", or "Add to Cart" CTA on this site links to:
```
https://jewelrybyjohan.com/products/[handle]
```

This is by design. This microsite is for discovery and SEO. All transactions happen on the Shopify store at `jewelrybyjohan.com`.

---

## Performance Targets

| Metric | Target |
|---|---|
| LCP | < 1.8s |
| TBT | < 200ms |
| CLS | < 0.05 |
| Full page load | < 2.2s |
| Lighthouse score | 95+ |

All pages are statically generated at build time — zero server rendering, zero JS framework runtime overhead.

---

## Updating Blog Posts

Blog posts are stored in `src/data/blog.ts`. To add a new post:

1. Open `src/data/blog.ts` in VS Code
2. Add a new object to the `blogPosts` array following the existing format
3. Commit and push to GitHub — Cloudflare will auto-deploy

---

## Support

For help with the site code, open an issue on the GitHub repository.
For jewelry orders, customizations, and product questions: [jewelrybyjohan.com/pages/contact](https://jewelrybyjohan.com/pages/contact)
