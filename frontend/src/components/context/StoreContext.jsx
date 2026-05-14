import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const StoreContext = createContext(null);

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
};

export const StoreProvider = ({ children }) => {
  const [cart, setCart] = useState(() => load("mtw_cart", []));
  const [wishlist, setWishlist] = useState(() => load("mtw_wishlist", []));

  useEffect(() => { localStorage.setItem("mtw_cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("mtw_wishlist", JSON.stringify(wishlist)); }, [wishlist]);

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) return prev.map((p) => p.id === product.id ? { ...p, qty: p.qty + qty } : p);
      return [...prev, { ...product, qty }];
    });
  };

  const removeFromCart = (id) => setCart((p) => p.filter((x) => x.id !== id));
  const updateQty = (id, qty) =>
    setCart((p) => p.map((x) => x.id === id ? { ...x, qty: Math.max(1, qty) } : x));
  const clearCart = () => setCart([]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) return prev.filter((p) => p.id !== product.id);
      return [...prev, product];
    });
  };
  const isWishlisted = (id) => wishlist.some((p) => p.id === id);

  const cartTotal = useMemo(
    () => cart.reduce((s, p) => s + p.price * p.qty, 0),
    [cart]
  );
  const cartCount = useMemo(() => cart.reduce((s, p) => s + p.qty, 0), [cart]);

  const value = {
    cart, wishlist, cartTotal, cartCount,
    addToCart, removeFromCart, updateQty, clearCart,
    toggleWishlist, isWishlisted,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be inside StoreProvider");
  return ctx;
};
