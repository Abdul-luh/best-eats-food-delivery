"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { 
  Star, 
  Clock, 
  Bike, 
  Info, 
  Search, 
  ChevronRight,
  Plus,
  ArrowLeft,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/lib/store/useCartStore";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

const restaurantData = {
  id: "1",
  name: "Burger King Premium",
  description: "Delicious burgers, crispy fries, and refreshing drinks. The Home of the Whopper!",
  image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=600",
  banner: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200",
  rating: 4.8,
  reviews: 1250,
  deliveryTime: "20-30 min",
  deliveryFee: 1.99,
  categories: ["Burgers", "Fast Food", "American"],
  menu: [
    {
      id: "cat-1",
      name: "Popular Items",
      items: [
        { id: "m1", name: "Classic Whopper", description: "Flame-grilled beef patty, lettuce, tomato, onions...", price: 8.99, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200" },
        { id: "m2", name: "Bacon King", description: "Two flame-grilled beef patties, thick-cut smoked bacon...", price: 10.50, image: "https://images.unsplash.com/photo-1553979459-d2229ba7143b?q=80&w=200" },
      ]
    },
    {
      id: "cat-2",
      name: "Burgers",
      items: [
        { id: "m3", name: "Double Cheeseburger", description: "Two flame-grilled beef patties, cheese, pickles...", price: 7.50, image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=200" },
        { id: "m4", name: "Steakhouse King", description: "Flame-grilled beef, steakhouse sauce, crispy onions...", price: 11.25, image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=200" },
      ]
    }
  ]
};

export default function RestaurantDetailPage() {
  const params = useParams();
  const { addItem } = useCartStore();
  const [activeCategory, setActiveCategory] = useState("cat-1");
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = (item: any) => {
    addItem({
      ...item,
      restaurantId: restaurantData.id,
      categoryId: activeCategory,
      isAvailable: true,
      inventory: 100
    });
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      {/* Banner */}
      <div className="relative h-[300px] sm:h-[400px]">
        <Image 
          src={restaurantData.banner} 
          alt={restaurantData.name} 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <Link href="/" className="absolute top-8 left-8">
          <Button variant="ghost" className="bg-white/20 backdrop-blur-md text-white border-white/20 hover:bg-white/30 rounded-xl">
            <ArrowLeft size={20} className="mr-2" /> Back
          </Button>
        </Link>
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-8 right-8 w-12 h-12 bg-white/20 backdrop-blur-md text-white border border-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all"
        >
          <Heart size={24} className={cn(isFavorite && "fill-red-500 text-red-500")} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-10">
        <Card className="border-none shadow-2xl rounded-[32px] overflow-hidden">
          <CardContent className="p-8 sm:p-12">
            <div className="flex flex-col md:flex-row justify-between gap-8">
              <div className="space-y-4">
                <div className="flex gap-2">
                  {restaurantData.categories.map(cat => (
                    <Badge key={cat} variant="secondary" className="bg-muted/50 border-none font-bold text-[10px] uppercase tracking-widest">{cat}</Badge>
                  ))}
                </div>
                <h1 className="text-4xl sm:text-5xl font-black">{restaurantData.name}</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">{restaurantData.description}</p>
                
                <div className="flex flex-wrap gap-6 pt-2 text-sm font-bold">
                  <div className="flex items-center gap-2">
                    <div className="text-amber-500 flex items-center">
                      <Star size={18} fill="currentColor" className="mr-1" />
                      {restaurantData.rating}
                    </div>
                    <span className="text-muted-foreground font-medium">({restaurantData.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-primary" />
                    <span>{restaurantData.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bike size={18} className="text-primary" />
                    <span>${restaurantData.deliveryFee.toFixed(2)} delivery</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <Button size="xl" className="rounded-2xl h-16 px-10 shadow-premium" variant="brand">
                  Group Order
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Navigation */}
        <div className="mt-12 flex flex-col md:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="w-full md:w-64 shrink-0 space-y-2 sticky top-24 h-fit">
            <h3 className="font-black text-xl mb-6 px-4">Menu</h3>
            {restaurantData.menu.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-xl font-bold transition-all",
                  activeCategory === cat.id 
                    ? "bg-primary text-white shadow-premium" 
                    : "hover:bg-muted text-muted-foreground"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="flex-1 space-y-12">
            {restaurantData.menu.map((cat) => (
              <div key={cat.id} className={cn(
                "space-y-6 scroll-mt-24",
                activeCategory !== cat.id && "hidden md:block opacity-40 grayscale-[0.5]"
              )}>
                <h3 className="text-2xl font-black">{cat.name}</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {cat.items.map((item) => (
                    <Card key={item.id} className="group overflow-hidden border-none shadow-sm hover:shadow-premium transition-all">
                      <CardContent className="p-0 flex flex-col sm:flex-row h-full">
                        <div className="relative w-full sm:w-40 h-40 shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-5 flex flex-col justify-between flex-1">
                          <div>
                            <h4 className="font-bold text-lg mb-1">{item.name}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{item.description}</p>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-xl font-black">${item.price.toFixed(2)}</span>
                            <Button 
                              size="icon" 
                              variant="brand" 
                              className="rounded-xl"
                              onClick={() => handleAddToCart(item)}
                            >
                              <Plus size={20} />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
