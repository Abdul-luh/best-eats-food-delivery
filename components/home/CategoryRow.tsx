"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const categories = [
  { id: "1", name: "Burgers", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=200", count: 120 },
  { id: "2", name: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200", count: 85 },
  { id: "3", name: "Sushi", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=200", count: 42 },
  { id: "4", name: "Salads", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=200", count: 64 },
  { id: "5", name: "Desserts", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=200", count: 53 },
  { id: "6", name: "Drinks", image: "https://images.unsplash.com/photo-1544145945-f904253d0c7b?q=80&w=200", count: 91 },
  { id: "7", name: "Mexican", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=200", count: 38 },
];

export function CategoryRow() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Explore Categories</h2>
            <p className="text-muted-foreground mt-1">What are you in the mood for today?</p>
          </div>
          <Link href="/categories" className="text-primary font-semibold flex items-center hover:underline">
            View All <ChevronRight size={18} />
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/restaurants?category=${category.name.toLowerCase()}`}
              className="flex-shrink-0 group"
            >
              <div className="w-32 h-32 rounded-3xl overflow-hidden relative mb-3 shadow-premium group-hover:scale-105 transition-transform duration-300">
                <Image 
                  src={category.image} 
                  alt={category.name} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="text-center">
                <div className="font-bold text-sm">{category.name}</div>
                <div className="text-xs text-muted-foreground">{category.count}+ items</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
