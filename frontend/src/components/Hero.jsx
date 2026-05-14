import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Globe2, ShieldCheck } from "lucide-react";

export const Hero = () => {
  const bg =
    "https://images.unsplash.com/photo-1760224254117-7a40f7f03fe2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYmx1ZSUyMGFic3RyYWN0JTIwbHV4dXJ5JTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3Nzg2NTkzOTN8MA&ixlib=rb-4.1.0&q=85";

  return (
    <section className="relative min-h-[100svh] pt-28 lg:pt-36 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/70 to-ink-950" />
      <div className="absolute inset-0 grain" />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10 pb-24 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          {/* Left: copy */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs tracking-[0.2em] uppercase text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-sea-400" />
              New Arrivals · Q1 Catalogue
            </div>

            <h1 className="font-display font-extralight text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight">
              Premium Toys
              <br />
              <span className="italic font-light text-slate-300">&</span>{" "}
              <span className="text-white">Electronics</span>
              <br />
              <span className="text-slate-400 font-light">Worldwide.</span>
            </h1>

            <p className="text-slate-300/90 max-w-xl text-base lg:text-lg leading-relaxed">
              From precision RC racers to flagship audio gear — Manghani curates only the finest
              for collectors, gamers, and families across 60+ countries.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/shop"
                data-testid="hero-shop-cta"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-ink-950 font-medium hover:bg-slate-200 transition-colors"
              >
                Shop Collection
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/shop?category=remote-control-cars"
                data-testid="hero-rc-cta"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors"
              >
                Explore RC Range
              </Link>
            </div>

            {/* Trust strip */}
            <div className="grid grid-cols-3 gap-6 pt-8 max-w-lg">
              {[
                { icon: Globe2, label: "60+ countries" },
                { icon: ShieldCheck, label: "Authenticity guarantee" },
                { icon: Sparkles, label: "Curated daily" },
              ].map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-400 text-xs">
                  <Icon className="w-4 h-4 text-sea-400" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Right: floating stat card */}
          <div className="lg:col-span-5 hidden lg:flex justify-end">
            <div className="glass rounded-2xl p-7 max-w-sm w-full space-y-5 animate-float-slow">
              <div className="flex items-baseline justify-between">
                <span className="text-slate-400 text-xs tracking-[0.2em] uppercase">Loved by</span>
                <span className="font-display text-3xl text-white">200K+</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-slate-400 text-sm">Trending</span>
                  <span className="text-white text-sm">Sentinel Pro</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-slate-400 text-sm">Top Category</span>
                  <span className="text-white text-sm">RC Cars</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-slate-400 text-sm">Ships in</span>
                  <span className="text-white text-sm">24 hours</span>
                </div>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1762522926157-bcc04bf0b10a?w=80&q=85",
                    "https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=80&q=85",
                    "https://images.unsplash.com/photo-1576558656222-ba66febe3dec?w=80&q=85",
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="w-8 h-8 rounded-full border-2 border-ink-900 object-cover"
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-400">4.9 ★ from 12,400+ verified reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand marquee */}
      <div className="relative border-y border-white/5 bg-ink-950/60 py-5 overflow-hidden">
        <div className="flex marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-14 px-7 text-slate-500 text-sm tracking-[0.3em] uppercase">
              <span>Lego</span><span>·</span>
              <span>Hot Wheels</span><span>·</span>
              <span>Sony</span><span>·</span>
              <span>JBL</span><span>·</span>
              <span>Razer</span><span>·</span>
              <span>Bose</span><span>·</span>
              <span>Fisher-Price</span><span>·</span>
              <span>Bandai</span><span>·</span>
              <span>Mattel</span><span>·</span>
              <span>Logitech G</span><span>·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
