import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Timer } from "lucide-react";

export const SpecialOffers = () => {
  const img =
    "https://images.unsplash.com/photo-1778058505814-6d247ccb600c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBnaWZ0JTIwYm94JTIwZGFyayUyMGJhY2tncm91bmR8ZW58MHx8fHwxNzc4NjU5MzkzfDA&ixlib=rb-4.1.0&q=85";

  return (
    <section className="relative py-20 lg:py-28 px-5 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-white/5">
          <img src={img} alt="special offer" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-ink-950/30" />
          <div className="relative grid lg:grid-cols-2 gap-10 p-10 lg:p-16">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs uppercase tracking-[0.2em] text-slate-300">
                <Timer className="w-3.5 h-3.5 text-sea-400" />
                Limited · 72 hours only
              </div>
              <h2 className="font-display text-4xl lg:text-6xl font-light text-white leading-[1.05] tracking-tight">
                The Winter
                <br />
                <span className="italic text-slate-300">Flagship</span> Edit.
              </h2>
              <p className="text-slate-300/90 max-w-md text-base lg:text-lg leading-relaxed">
                Up to <span className="text-white font-semibold">35% off</span> on hand-picked premium gear.
                Bundles include free worldwide express shipping.
              </p>
              <Link
                to="/shop"
                data-testid="offers-cta"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-ink-950 font-medium hover:bg-slate-200 transition group"
              >
                Shop the edit
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 self-end">
              {[
                { v: "35%", l: "Maximum off" },
                { v: "72h", l: "Ends soon" },
                { v: "Free", l: "Worldwide ship" },
                { v: "200+", l: "Bundle deals" },
              ].map((s, i) => (
                <div key={i} className="glass rounded-2xl p-6">
                  <div className="font-display text-3xl lg:text-4xl text-white font-light">{s.v}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400 mt-2">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
