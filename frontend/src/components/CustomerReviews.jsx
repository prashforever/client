import React, { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { fetchReviews } from "../lib/api";

export const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => { fetchReviews().then(setReviews).catch(() => {}); }, []);

  return (
    <section className="relative py-24 lg:py-32 px-5 lg:px-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs tracking-[0.3em] text-sea-400 uppercase mb-3">Customer Stories</div>
          <h2 className="font-display text-4xl lg:text-5xl text-white font-light tracking-tight">
            Trusted across <span className="italic text-slate-300">60+ countries</span>.
          </h2>
          <div className="flex items-center justify-center gap-1.5 mt-5 text-slate-300 text-sm">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span>4.9 average · 12,400+ verified reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {reviews.map((r, i) => (
            <article
              key={r.id || i}
              data-testid={`review-card-${i}`}
              className="relative rounded-2xl bg-ink-900/50 border border-white/5 p-7 lg:p-8 lift-card"
            >
              <Quote className="absolute top-7 right-7 w-7 h-7 text-sea-500/30" />
              <div className="flex gap-1 mb-5">
                {[...Array(r.rating || 5)].map((_, k) => (
                  <Star key={k} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-200 leading-relaxed text-[15px] mb-7">"{r.comment}"</p>
              <div className="flex items-center gap-3 pt-5 border-t border-white/5">
                {r.avatar && (
                  <img src={r.avatar} alt={r.name} className="w-10 h-10 rounded-full object-cover" />
                )}
                <div>
                  <div className="text-white text-sm">{r.name}</div>
                  <div className="text-slate-500 text-xs">{r.location}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
