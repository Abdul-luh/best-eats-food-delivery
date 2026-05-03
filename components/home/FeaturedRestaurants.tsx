"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { RestaurantCard } from "@/components/restaurant/RestaurantCard";

const featuredRestaurants = [
  {
    id: "1",
    name: "Burger King Premium",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=600",
    rating: 4.8,
    reviews: 1250,
    deliveryTime: "20-30 min",
    deliveryFee: 1.99,
    categories: ["Burgers", "Fast Food", "American"],
    isFeatured: true,
  },
  {
    id: "2",
    name: "Sushi Master",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600",
    rating: 4.9,
    reviews: 840,
    deliveryTime: "30-45 min",
    deliveryFee: 2.50,
    categories: ["Sushi", "Japanese", "Healthy"],
  },
  {
    id: "3",
    name: "La Piazza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600",
    rating: 4.7,
    reviews: 2100,
    deliveryTime: "25-35 min",
    deliveryFee: 0.00,
    categories: ["Pizza", "Italian", "Desserts"],
    isFeatured: true,
  },
];

export function FeaturedRestaurants() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight">Featured Restaurants</h2>
            <p className="text-muted-foreground mt-2 text-lg">Top rated spots near you</p>
          </div>
          <Link href="/restaurants" className="text-primary font-bold flex items-center hover:underline group">
            Explore All <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} {...restaurant} />
          ))}
        </div>
      </div>
    </section>
  );
}
