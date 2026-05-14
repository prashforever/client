# Manghani Toy Worldwide — PRD

## Original Problem Statement
Premium modern e-commerce site for "Manghani Toy Worldwide" selling toys & electronics globally. Dark-blue + white luxury theme, Amazon × Hamleys feel. Homepage: hero ("Premium Toys & Electronics Worldwide"), featured categories (RC Cars, Kids Toys, Gaming Accessories, Speakers & Electronics), trending products, special offers banner, customer reviews, about brand, footer. Features: add to cart, search, wishlist, category filter, product detail, WhatsApp order button, mobile responsive.

## User Choices (defaults)
- No login (guest checkout via WhatsApp)
- WhatsApp orders only (wa.me link, no payment API)
- Seeded curated catalogue (16 products, 4 categories, 3 reviews)
- Unsplash stock imagery
- Configurable WhatsApp number in `/app/frontend/src/lib/constants.js`

## Architecture
- **Backend** FastAPI + MongoDB (Motor). Auto-seeds on startup if collections empty.
  - `GET /api/categories`, `GET /api/products` (filters: `category`, `search`, `trending`, `limit`), `GET /api/products/{id}`, `GET/POST /api/reviews`
- **Frontend** React 19 + React Router + Tailwind. Cart & wishlist in Context + localStorage.
- **Design** Outfit + Manrope fonts, dark blue palette (#020617), glassmorphism navbar, bento category grid, lift-on-hover cards, marquee brand strip.

## Implemented (2026-02-13)
- Home: Hero with stats card + brand marquee, bento category grid, trending products (8 cards), special offers banner, reviews grid, about brand, footer
- Shop page: category sidebar filter, search, sort
- Product detail: image, badge, rating, price/discount, features list, qty selector, Add to Cart, WhatsApp order with pre-filled message
- Cart page: qty controls, remove, WhatsApp checkout
- Wishlist page with persistence
- Floating WhatsApp CTA on all pages
- All interactive elements have `data-testid`
- Backend & frontend tested: 100% pass

## Backlog (P1/P2)
- **P1** Replace placeholder WhatsApp number with real one (currently `+919876543210`)
- **P1** Image onError fallback (transient Unsplash 404s)
- **P2** Admin panel to add/edit products via UI
- **P2** Newsletter signup → Resend/SendGrid integration
- **P2** Multi-currency (auto-detect by region)
- **P2** Multi-image gallery on product detail
- **P2** Order history (would require auth)
- **P2** Migrate FastAPI startup → lifespan handler; escape regex in search
