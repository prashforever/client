import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { ProductCard } from "../components/ProductCard";

export default function Wishlist() {
  const { wishlist } = useStore();

  if (wishlist.length === 0) {
    return (
      <main className="pt-32 pb-24 px-5 lg:px-10 min-h-screen flex items-center justify-center" data-testid="wishlist-page">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-7 rounded-full glass flex items-center justify-center">
            <Heart className="w-8 h-8 text-slate-400" />
          </div>
          <h1 className="font-display text-4xl text-white font-light mb-3">No favourites yet.</h1>
          <p className="text-slate-400 mb-7">Tap the heart on any product you love.</p>
          <Link to="/shop" data-testid="wishlist-empty-shop" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-ink-950 font-medium hover:bg-slate-200 transition">
            Discover products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-24 px-5 lg:px-10 min-h-screen" data-testid="wishlist-page">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="text-xs tracking-[0.3em] text-sea-400 uppercase mb-2">Saved for later</div>
          <h1 className="font-display text-4xl lg:text-5xl text-white font-light tracking-tight">Wishlist</h1>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {wishlist.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </main>
  );
}
