import React from "react";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "../lib/constants";

export const WhatsAppFloat = () => {
  return (
    <a
      href={buildWhatsAppLink("Hi Manghani! I'd like to place an order.")}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-float-btn"
      className="fixed bottom-6 right-6 z-40 group inline-flex items-center gap-3 pl-4 pr-5 py-3.5 rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_-12px_rgba(37,211,102,0.6)] hover:shadow-[0_24px_50px_-12px_rgba(37,211,102,0.85)] transition-all"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline text-sm font-medium">Order on WhatsApp</span>
    </a>
  );
};
