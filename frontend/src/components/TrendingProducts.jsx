import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { fetchProducts } from "../lib/api";
import { ProductCard } from "./ProductCard";

export const TrendingProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts({ trending: true, limit: 8 }).then(setProducts).catch(() => {});
  }, []);

  return (
    <section className="relative py-24 lg:py-32 px-5 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <div className="max-w-xl">
            <div className="text-xs tracking-[0.3em] text-sea-400 uppercase mb-3">Trending Now</div>
            <h2 className="font-display text-4xl lg:text-5xl text-white font-light tracking-tight">
              What everyone's loving this week.
            </h2>
          </div>
          <Link
            to="/shop"
            data-testid="trending-viewall"
            className="text-slate-300 hover:text-white text-sm tracking-wide inline-flex items-center gap-2 group"
          >
            See full collection
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};
