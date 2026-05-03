"use client";

import Image from "next/image";
import { ShoppingCart, Star, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/lib/store/useCartStore";
import { toast } from "react-hot-toast";

const popularFoods = [
  {
    id: "p1",
    name: "Classic Cheeseburger",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400",
    rating: 4.5,
    restaurant: "Burger King Premium",
    restaurantId: "1",
  },
  {
    id: "p2",
    name: "Pepperoni Feast",
    price: 14.50,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=400",
    rating: 4.8,
    restaurant: "La Piazza",
    restaurantId: "3",
  },
  {
    id: "p3",
    name: "Salmon Nigiri Set",
    price: 18.00,
    image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?q=80&w=400",
    rating: 4.9,
    restaurant: "Sushi Master",
    restaurantId: "2",
  },
  {
    id: "p4",
    name: "Healthy Greek Salad",
    price: 11.25,
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=400",
    rating: 4.6,
    restaurant: "Garden Fresh",
    restaurantId: "4",
  },
];

export function PopularFoods() {
  const { addItem } = useCartStore();

  const handleAddToCart = (food: any) => {
    // Adapter for product type
    const product = {
      id: food.id,
      name: food.name,
      price: food.price,
      image: food.image,
      restaurantId: food.restaurantId,
      isAvailable: true,
      inventory: 100,
      categoryId: "popular",
    };
    
    addItem(product as any);
    toast.success(`${food.name} added to cart!`);
  };

  return (
    <section className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">Popular Near You</h2>
          <p className="text-muted-foreground text-lg">The most ordered dishes in your neighborhood</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularFoods.map((food) => (
            <Card key={food.id} className="group border-none bg-card/50 backdrop-blur-sm overflow-hidden">
              <div className="relative h-56">
                <Image
                  src={food.image}
                  alt={food.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-bold shadow-sm">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  {food.rating}
                </div>
              </div>
              <CardContent className="p-5">
                <div className="text-xs text-primary font-bold mb-1 uppercase tracking-wider">{food.restaurant}</div>
                <h3 className="font-bold text-lg mb-4 line-clamp-1">{food.name}</h3>
                
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-black">${food.price.toFixed(2)}</div>
                  <Button 
                    size="icon" 
                    variant="brand" 
                    className="rounded-xl shadow-premium"
                    onClick={() => handleAddToCart(food)}
                  >
                    <Plus size={20} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
