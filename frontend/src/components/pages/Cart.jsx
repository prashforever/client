import React from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, X, MessageCircle, ShoppingBag } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { formatPrice, buildWhatsAppLink } from "../lib/constants";

export default function Cart() {
  const { cart, cartTotal, removeFromCart, updateQty, clearCart } = useStore();

  const waMsg = `Hi Manghani! I'd like to order:\n\n${cart
    .map((i) => `• ${i.name} × ${i.qty} — ${formatPrice(i.price * i.qty)}`)
    .join("\n")}\n\nTotal: ${formatPrice(cartTotal)}\n\nPlease confirm availability and shipping.`;

  if (cart.length === 0) {
    return (
      <main className="pt-32 pb-24 px-5 lg:px-10 min-h-screen flex items-center justify-center" data-testid="cart-page">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-7 rounded-full glass flex items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-slate-400" />
          </div>
          <h1 className="font-display text-4xl text-white font-light mb-3">Your cart is quiet.</h1>
          <p className="text-slate-400 mb-7">Let's fill it with something extraordinary.</p>
          <Link to="/shop" data-testid="cart-empty-shop" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-ink-950 font-medium hover:bg-slate-200 transition">
            Start shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-24 px-5 lg:px-10 min-h-screen" data-testid="cart-page">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="text-xs tracking-[0.3em] text-sea-400 uppercase mb-2">Your bag</div>
            <h1 className="font-display text-4xl lg:text-5xl text-white font-light tracking-tight">Shopping cart</h1>
          </div>
          <button onClick={clearCart} data-testid="cart-clear" className="text-slate-500 hover:text-white text-sm">Clear cart</button>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                data-testid={`cart-item-${item.id}`}
                className="flex gap-5 p-4 rounded-2xl border border-white/5 bg-ink-900/30"
              >
                <Link to={`/product/${item.id}`} className="w-24 h-24 lg:w-28 lg:h-28 rounded-xl overflow-hidden bg-ink-800 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-slate-500 mb-1">{item.category}</div>
                    <Link to={`/product/${item.id}`} className="font-display text-white text-lg leading-tight hover:underline truncate block">
                      {item.name}
                    </Link>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-white/10 rounded-full">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-9 h-9 flex items-center justify-center text-slate-300 hover:text-white">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-white text-sm">{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-9 h-9 flex items-center justify-center text-slate-300 hover:text-white">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="font-display text-white text-lg">{formatPrice(item.price * item.qty)}</div>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} data-testid={`cart-remove-${item.id}`} className="text-slate-500 hover:text-white self-start p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <aside className="lg:col-span-4">
            <div className="rounded-2xl border border-white/5 bg-ink-900/30 p-7 sticky top-28 space-y-5">
              <h2 className="font-display text-2xl text-white font-light">Order summary</h2>
              <div className="space-y-3 text-sm border-y border-white/5 py-4">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-white">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Worldwide shipping</span>
                  <span className="text-emerald-400">Free</span>
                </div>
              </div>
              <div className="flex justify-between items-baseline pt-1">
                <span className="text-slate-300">Total</span>
                <span className="font-display text-3xl text-white">{formatPrice(cartTotal)}</span>
              </div>
              <a
                href={buildWhatsAppLink(waMsg)}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="cart-whatsapp-checkout"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-medium hover:brightness-110 transition"
              >
                <MessageCircle className="w-4 h-4" /> Checkout via WhatsApp
              </a>
              <p className="text-xs text-slate-500 text-center">Our team confirms availability & payment options on chat — usually within 5 minutes.</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
