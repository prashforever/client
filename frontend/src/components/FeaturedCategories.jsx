import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { fetchCategories } from "../lib/api";

export const FeaturedCategories = () => {
  const [cats, setCats] = useState([]);
  useEffect(() => { fetchCategories().then(setCats).catch(() => {}); }, []);

  return (
    <section className="relative py-24 lg:py-32 px-5 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <div className="max-w-xl">
            <div className="text-xs tracking-[0.3em] text-sea-400 uppercase mb-3">Featured Categories</div>
            <h2 className="font-display text-4xl lg:text-5xl text-white font-light tracking-tight">
              Crafted for every passion.
            </h2>
          </div>
          <Link
            to="/shop"
            data-testid="categories-viewall"
            className="text-slate-300 hover:text-white text-sm tracking-wide inline-flex items-center gap-2 group"
          >
            View all categories
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-1 md:grid-rows-2 gap-4 lg:gap-5 md:h-[640px]">
          {cats.map((c, i) => {
            // bento positions
            const positions = [
              "md:col-span-4 md:row-span-1",
              "md:col-span-2 md:row-span-1",
              "md:col-span-2 md:row-span-1",
              "md:col-span-4 md:row-span-1",
            ];
            return (
              <Link
                key={c.slug}
                to={`/shop?category=${c.slug}`}
                data-testid={`category-card-${c.slug}`}
                className={`relative overflow-hidden rounded-2xl lift-card group border border-white/5 min-h-[280px] md:min-h-0 ${positions[i] || ""}`}
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-7">
                  <div className="text-[11px] tracking-[0.3em] uppercase text-slate-300 mb-2">
                    0{i + 1} · Collection
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl text-white font-light mb-1.5">{c.name}</h3>
                  <p className="text-slate-400 text-sm max-w-md">{c.description}</p>
                  <div className="mt-5 inline-flex items-center gap-2 text-white text-sm w-fit pb-1 border-b border-white/30 group-hover:border-white transition-colors">
                    Explore
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
