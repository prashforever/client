// Configurable contact info — change here to update everywhere
export const BRAND = {
  name: "Manghani Toy Worldwide",
  short: "Manghani",
  tagline: "Premium Toys & Electronics Worldwide",
  whatsapp: "+919876543210", // Update with real number
  email: "care@manghanitoy.com",
  phone: "+91 98765 43210",
  address: "Worldwide shipping  •  Headquartered in Mumbai, India",
  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "https://youtube.com/",
    x: "https://x.com/",
  },
};

export const buildWhatsAppLink = (message) => {
  const num = BRAND.whatsapp.replace(/[^0-9]/g, "");
  const text = encodeURIComponent(message || "Hi! I'm interested in your products.");
  return `https://wa.me/${num}?text=${text}`;
};

export const formatPrice = (v) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);
