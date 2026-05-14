import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { formatPrice } from "../lib/constants";
import { toast } from "sonner";

export const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wished = isWishlisted(product.id);

  const onAdd = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const onWish = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <Link
      to={`/product/${product.id}`}
      data-testid={`product-card-${product.id}`}
      className="group relative rounded-2xl overflow-hidden bg-ink-900/40 border border-white/5 lift-card flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-800">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start gap-2">
          {product.badge ? (
            <span className="px-2.5 py-1 rounded-full bg-white text-ink-950 text-[10px] uppercase tracking-[0.18em] font-medium">
              {product.badge}
            </span>
          ) : <span />}
          <button
            onClick={onWish}
            data-testid={`product-wishlist-${product.id}`}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition ${
              wished ? "bg-white text-ink-950" : "bg-ink-950/60 text-white hover:bg-ink-950"
            }`}
            aria-label="wishlist"
          >
            <Heart className={`w-4 h-4 ${wished ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Hover quick-add */}
        <div className="absolute bottom-3 left-3 right-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300">
          <button
            onClick={onAdd}
            data-testid={`product-add-${product.id}`}
            className="w-full bg-white text-ink-950 text-sm py-3 rounded-full font-medium hover:bg-slate-100 inline-flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" /> Add to cart
          </button>
        </div>

        {discount > 0 && (
          <span className="absolute bottom-3 left-3 group-hover:opacity-0 transition px-2 py-1 rounded-full bg-sea-500/90 text-white text-[10px] font-semibold">
            -{discount}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-5 flex-1">
        <div className="text-[10px] tracking-[0.2em] uppercase text-slate-500">{product.category}</div>
        <h3 className="font-display text-white text-base lg:text-lg leading-tight line-clamp-2 min-h-[2.6rem]">{product.name}</h3>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          {product.rating?.toFixed(1)}
          <span className="text-slate-600">·</span>
          <span>{product.reviews_count} reviews</span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-white font-display text-xl">{formatPrice(product.price)}</span>
          {product.original_price && (
            <span className="text-slate-500 line-through text-sm">{formatPrice(product.original_price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};
