import React from "react";
import { Award, Truck, Headphones, ShieldCheck } from "lucide-react";

export const AboutBrand = () => {
  const img =
    "https://images.unsplash.com/photo-1772160801956-e471dbee631b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwdG95cyUyMHN0b3JlJTIwc2hvd2Nhc2V8ZW58MHx8fHwxNzc4NjU5MzkzfDA&ixlib=rb-4.1.0&q=85";

  return (
    <section className="relative py-24 lg:py-32 px-5 lg:px-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-6 relative">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/5">
            <img src={img} alt="About Manghani" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden lg:block glass rounded-2xl p-6 max-w-[220px]">
            <div className="font-display text-4xl text-white font-light">2014</div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-400 mt-2">Est. since</div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-7">
          <div className="text-xs tracking-[0.3em] text-sea-400 uppercase">About the brand</div>
          <h2 className="font-display text-4xl lg:text-5xl text-white font-light tracking-tight">
            A decade of <span className="italic text-slate-300">play, perfected.</span>
          </h2>
          <p className="text-slate-300/90 leading-relaxed text-base lg:text-lg">
            Manghani Toy Worldwide is built on a simple promise — only ship products we'd give our own
            families. Our buyers travel the globe scouting flagship-grade toys, electronics and gaming
            gear. Every item is inspected, photographed and packaged in-house at our Mumbai HQ before
            sailing out to 60+ countries.
          </p>
          <p className="text-slate-400 leading-relaxed">
            From the first RC car we shipped in 2014 to the 200,000+ orders today — our standard has
            never moved. Premium. Authentic. International.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            {[
              { icon: ShieldCheck, t: "100% Authentic", s: "Brand-direct sourcing" },
              { icon: Truck, t: "Worldwide Express", s: "Ships in 24h, 60+ countries" },
              { icon: Headphones, t: "Always On Support", s: "WhatsApp & email, 7 days" },
              { icon: Award, t: "30-day Returns", s: "Hassle-free guarantee" },
            ].map(({ icon: Icon, t, s }, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-ink-900/30">
                <div className="w-10 h-10 rounded-lg bg-sea-500/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-sea-400" />
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{t}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
