import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingBag, Menu, X, Globe } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { BRAND } from "../lib/constants";

export const Navbar = () => {
  const { cartCount, wishlist } = useStore();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    nav(`/shop?search=${encodeURIComponent(q.trim())}`);
    setOpen(false);
  };

  const navLinks = [
    { to: "/shop", label: "Shop All" },
    { to: "/shop?category=remote-control-cars", label: "RC Cars" },
    { to: "/shop?category=kids-toys", label: "Kids Toys" },
    { to: "/shop?category=gaming-accessories", label: "Gaming" },
    { to: "/shop?category=speakers-electronics", label: "Electronics" },
  ];

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-white/5" : "bg-transparent"
      }`}
    >
      {/* Announcement bar */}
      <div className="hidden md:flex items-center justify-center gap-2 text-[11px] tracking-[0.18em] uppercase text-slate-400 py-2 border-b border-white/5 bg-ink-950/60">
        <Globe className="w-3 h-3" />
        Worldwide express shipping · 30-day returns · Trusted by 200,000+ families
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-10 h-16 lg:h-20 flex items-center gap-6">
        {/* Logo */}
        <Link to="/" data-testid="navbar-logo" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-lg ring-grad p-[1px]">
            <div className="w-full h-full rounded-[7px] bg-ink-950 flex items-center justify-center">
              <span className="font-display text-white text-lg font-light">M</span>
            </div>
          </div>
          <div className="leading-tight">
            <div className="font-display text-white text-sm lg:text-base tracking-wide">MANGHANI</div>
            <div className="text-[10px] text-slate-400 tracking-[0.2em]">TOY WORLDWIDE</div>
          </div>
        </Link>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm text-slate-300 ml-4">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="hover:text-white transition-colors duration-200 relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Search */}
        <form onSubmit={submitSearch} className="hidden md:flex flex-1 max-w-md ml-auto">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              data-testid="navbar-search-input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search toys, speakers, controllers…"
              className="w-full bg-ink-800/60 border border-white/5 text-sm pl-9 pr-4 py-2.5 rounded-full text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-sea-500/60 focus:bg-ink-800 transition"
            />
          </div>
        </form>

        {/* Icons */}
        <div className="flex items-center gap-1 lg:gap-2 ml-auto md:ml-2">
          <Link to="/wishlist" data-testid="navbar-wishlist-btn" className="relative p-2.5 rounded-full hover:bg-white/5 transition">
            <Heart className="w-5 h-5 text-slate-200" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-white text-ink-950 text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" data-testid="navbar-cart-btn" className="relative p-2.5 rounded-full hover:bg-white/5 transition">
            <ShoppingBag className="w-5 h-5 text-slate-200" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-sea-500 text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2.5 rounded-full hover:bg-white/5"
            aria-label="menu"
          >
            {open ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden glass border-t border-white/5 px-5 py-5 space-y-4">
          <form onSubmit={submitSearch} className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              data-testid="mobile-search-input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search…"
              className="w-full bg-ink-800/60 border border-white/5 text-sm pl-9 pr-4 py-2.5 rounded-full text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-sea-500/60"
            />
          </form>
          <nav className="flex flex-col gap-3 pt-2">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-slate-200 text-sm py-1.5"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
