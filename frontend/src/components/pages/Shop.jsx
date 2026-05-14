import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchCategories, fetchProducts } from "../lib/api";
import { ProductCard } from "../components/ProductCard";
import { Search, SlidersHorizontal, X } from "lucide-react";

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "";
  const search = params.get("search") || "";

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("featured");
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => { fetchCategories().then(setCategories).catch(() => {}); }, []);

  useEffect(() => {
    setLoading(true);
    fetchProducts({
      ...(category ? { category } : {}),
      ...(search ? { search } : {}),
    })
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [category, search]);

  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, sort]);

  const setCategory = (slug) => {
    const next = new URLSearchParams(params);
    if (!slug) next.delete("category");
    else next.set("category", slug);
    setParams(next);
  };

  const submitSearch = (e) => {
    e.preventDefault();
    const next = new URLSearchParams(params);
    if (!localSearch.trim()) next.delete("search");
    else next.set("search", localSearch.trim());
    setParams(next);
  };

  const clearSearch = () => {
    setLocalSearch("");
    const next = new URLSearchParams(params);
    next.delete("search");
    setParams(next);
  };

  const activeCat = categories.find((c) => c.slug === category);

  return (
    <main className="pt-32 pb-24 px-5 lg:px-10 min-h-screen" data-testid="shop-page">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 space-y-5">
          <div className="text-xs tracking-[0.3em] text-sea-400 uppercase">
            {activeCat ? "Collection" : "Shop"}
          </div>
          <h1 className="font-display text-4xl lg:text-6xl font-light text-white tracking-tight">
            {activeCat ? activeCat.name : search ? `Results for "${search}"` : "All Products"}
          </h1>
          {activeCat && <p className="text-slate-400 max-w-xl">{activeCat.description}</p>}
        </div>

        {/* Filters bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10">
          <form onSubmit={submitSearch} className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              data-testid="shop-search-input"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search the collection…"
              className="w-full bg-ink-900/60 border border-white/5 text-sm pl-11 pr-10 py-3 rounded-full text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-sea-500/60"
            />
            {localSearch && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <select
              data-testid="shop-sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-ink-900/60 border border-white/5 text-sm px-4 py-3 rounded-full text-slate-100 focus:outline-none focus:border-sea-500/60"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="text-white text-sm font-medium tracking-[0.15em] uppercase mb-3">Categories</div>
            <div className="space-y-1">
              <button
                onClick={() => setCategory("")}
                data-testid="filter-cat-all"
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition ${
                  !category ? "bg-white/5 text-white border border-white/10" : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                All Products
              </button>
              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setCategory(c.slug)}
                  data-testid={`filter-cat-${c.slug}`}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition ${
                    category === c.slug ? "bg-white/5 text-white border border-white/10" : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </aside>

          {/* Products */}
          <div className="lg:col-span-9">
            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[4/5] rounded-2xl bg-ink-900/50 animate-pulse" />
                ))}
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="rounded-2xl border border-white/5 bg-ink-900/30 p-16 text-center">
                <p className="text-slate-300 text-lg mb-2">No products found.</p>
                <p className="text-slate-500 text-sm">Try a different search or category.</p>
              </div>
            ) : (
              <>
                <div className="text-slate-500 text-sm mb-5">{sortedProducts.length} products</div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {sortedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
