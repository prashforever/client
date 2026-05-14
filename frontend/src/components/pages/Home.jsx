import React from "react";
import { Hero } from "../components/Hero";
import { FeaturedCategories } from "../components/FeaturedCategories";
import { TrendingProducts } from "../components/TrendingProducts";
import { SpecialOffers } from "../components/SpecialOffers";
import { CustomerReviews } from "../components/CustomerReviews";
import { AboutBrand } from "../components/AboutBrand";

export default function Home() {
  return (
    <main data-testid="home-page">
      <Hero />
      <FeaturedCategories />
      <TrendingProducts />
      <SpecialOffers />
      <CustomerReviews />
      <AboutBrand />
    </main>
  );
}
