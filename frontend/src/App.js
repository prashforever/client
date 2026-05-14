import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { StoreProvider } from "./context/StoreContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { WhatsAppFloat } from "./components/WhatsAppFloat";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <StoreProvider>
      <div className="App grain">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
          <Footer />
          <WhatsAppFloat />
          <Toaster
            position="bottom-left"
            theme="dark"
            toastOptions={{
              style: {
                background: "#0a0f1f",
                color: "#f8fafc",
                border: "1px solid rgba(255,255,255,0.08)",
              },
            }}
          />
        </BrowserRouter>
      </div>
    </StoreProvider>
  );
}

export default App;
