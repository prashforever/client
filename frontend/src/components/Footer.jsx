import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { BRAND } from "../lib/constants";

export const Footer = () => {
  return (
    <footer className="relative border-t border-white/5 bg-ink-950 pt-20 pb-10 px-5 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg ring-grad p-[1px]">
                <div className="w-full h-full rounded-[7px] bg-ink-950 flex items-center justify-center">
                  <span className="font-display text-white text-xl font-light">M</span>
                </div>
              </div>
              <div className="leading-tight">
                <div className="font-display text-white text-lg tracking-wide">MANGHANI</div>
                <div className="text-[10px] text-slate-400 tracking-[0.2em]">TOY WORLDWIDE</div>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              {BRAND.tagline}. Curated since 2014, shipped to 60+ countries.
            </p>
            <div className="flex items-center gap-3 pt-1">
              {[
                { Icon: Instagram, href: BRAND.socials.instagram, label: "instagram" },
                { Icon: Facebook, href: BRAND.socials.facebook, label: "facebook" },
                { Icon: Youtube, href: BRAND.socials.youtube, label: "youtube" },
                { Icon: Twitter, href: BRAND.socials.x, label: "x" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`social-${label}`}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-slate-300 hover:border-white hover:text-white transition"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <div className="text-white text-sm font-medium tracking-[0.15em] uppercase mb-5">Shop</div>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link to="/shop?category=remote-control-cars" className="hover:text-white transition">RC Cars</Link></li>
              <li><Link to="/shop?category=kids-toys" className="hover:text-white transition">Kids Toys</Link></li>
              <li><Link to="/shop?category=gaming-accessories" className="hover:text-white transition">Gaming</Link></li>
              <li><Link to="/shop?category=speakers-electronics" className="hover:text-white transition">Electronics</Link></li>
              <li><Link to="/shop" className="hover:text-white transition">All Products</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <div className="text-white text-sm font-medium tracking-[0.15em] uppercase mb-5">Help</div>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition">Shipping</a></li>
              <li><a href="#" className="hover:text-white transition">Returns</a></li>
              <li><a href="#" className="hover:text-white transition">Warranty</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2">
            <div className="text-white text-sm font-medium tracking-[0.15em] uppercase mb-5">Contact</div>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-sea-400" />
                <a href={`mailto:${BRAND.email}`} className="hover:text-white transition">{BRAND.email}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-sea-400" />
                <a href={`tel:${BRAND.phone}`} className="hover:text-white transition">{BRAND.phone}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-sea-400" />
                <span>{BRAND.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-14 pt-7 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <div className="flex items-center gap-6 text-slate-500 text-xs">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
