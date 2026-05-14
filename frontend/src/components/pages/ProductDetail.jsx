import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProduct, fetchProducts } from "../lib/api";
import { useStore } from "../context/StoreContext";
import { formatPrice, buildWhatsAppLink } from "../lib/constants";
import { Star, Heart, ShoppingBag, MessageCircle, Truck, ShieldCheck, RotateCcw, Minus, Plus, Check } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { toast } from "sonner";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  useEffect(() => {
    setProduct(null);
    setQty(1);
    fetchProduct(id).then((p) => {
      setProduct(p);
      fetchProducts({ category: p.category_slug, limit: 8 }).then((list) =>
        setRelated(list.filter((x) => x.id !== p.id).slice(0, 4))
      );
    }).catch(() => {});
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <main className="pt-32 px-5 lg:px-10 min-h-screen">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          <div className="aspect-square rounded-2xl bg-ink-900/40 animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 w-2/3 bg-ink-900/40 rounded animate-pulse" />
            <div className="h-4 w-1/3 bg-ink-900/40 rounded animate-pulse" />
            <div className="h-24 bg-ink-900/40 rounded animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  const wished = isWishlisted(product.id);
  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  const handleAdd = () => {
    addToCart(product, qty);
    toast.success(`${qty} × ${product.name} added to cart`);
  };

  const waMsg = `Hi Manghani! I'd like to order:\n\n• ${product.name}\n• Qty: ${qty}\n• Price: ${formatPrice(product.price * qty)}\n\nPlease confirm availability and shipping.`;

  return (
    <main className="pt-32 pb-24 px-5 lg:px-10 min-h-screen" data-testid="product-detail-page">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs text-slate-500 mb-8 flex gap-2 flex-wrap">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-white">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category_slug}`} className="hover:text-white">{product.category}</Link>
          <span>/</span>
          <span className="text-slate-300 truncate">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden border border-white/5 bg-ink-900/40">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {product.badge && (
              <span className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-white text-ink-950 text-[10px] uppercase tracking-[0.18em] font-medium">
                {product.badge}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="space-y-7">
            <div>
              <div className="text-xs tracking-[0.3em] text-sea-400 uppercase mb-3">{product.category}</div>
              <h1 className="font-display text-4xl lg:text-5xl text-white font-light tracking-tight leading-tight">{product.name}</h1>
              <div className="flex items-center gap-2 mt-4 text-sm text-slate-400">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? "text-amber-400 fill-amber-400" : "text-slate-700"}`} />
                  ))}
                </div>
                {product.rating?.toFixed(1)} · {product.reviews_count} reviews
              </div>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="font-display text-4xl text-white">{formatPrice(product.price)}</span>
              {product.original_price && (
                <>
                  <span className="text-slate-500 line-through text-lg">{formatPrice(product.original_price)}</span>
                  <span className="text-emerald-400 text-sm font-medium">-{discount}%</span>
                </>
              )}
            </div>

            <p className="text-slate-300 leading-relaxed text-base">{product.description}</p>

            {product.features?.length > 0 && (
              <ul className="space-y-2.5">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-slate-300 text-sm">
                    <Check className="w-4 h-4 text-sea-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-5 pt-2">
              <span className="text-slate-400 text-sm">Quantity</span>
              <div className="flex items-center border border-white/10 rounded-full">
                <button
                  data-testid="qty-decrease"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-white text-sm" data-testid="qty-value">{qty}</span>
                <button
                  data-testid="qty-increase"
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAdd}
                data-testid="detail-add-to-cart"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-ink-950 font-medium hover:bg-slate-100 transition"
              >
                <ShoppingBag className="w-4 h-4" /> Add to cart
              </button>
              <a
                href={buildWhatsAppLink(waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="detail-whatsapp-order"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-medium hover:brightness-110 transition"
              >
                <MessageCircle className="w-4 h-4" /> Order on WhatsApp
              </a>
              <button
                onClick={() => { toggleWishlist(product); toast(wished ? "Removed from wishlist" : "Added to wishlist"); }}
                data-testid="detail-wishlist-btn"
                className={`sm:col-span-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border transition ${
                  wished ? "border-white bg-white/10 text-white" : "border-white/15 text-slate-200 hover:bg-white/5"
                }`}
              >
                <Heart className={`w-4 h-4 ${wished ? "fill-current" : ""}`} />
                {wished ? "In Wishlist" : "Add to wishlist"}
              </button>
            </div>

            {/* Perks */}
            <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/5">
              {[
                { Icon: Truck, t: "Free worldwide shipping" },
                { Icon: ShieldCheck, t: "Authenticity guaranteed" },
                { Icon: RotateCcw, t: "30-day returns" },
              ].map(({ Icon, t }, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-1.5 py-3">
                  <Icon className="w-4 h-4 text-sea-400" />
                  <span className="text-[11px] text-slate-400">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-24">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-display text-3xl text-white font-light tracking-tight">You may also like</h2>
              <Link to={`/shop?category=${product.category_slug}`} className="text-slate-400 hover:text-white text-sm">View more</Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
