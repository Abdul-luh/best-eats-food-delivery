"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Star, Bike, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface RestaurantCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  deliveryFee: number;
  categories: string[];
  isFeatured?: boolean;
}

export function RestaurantCard({
  id,
  name,
  image,
  rating,
  reviews,
  deliveryTime,
  deliveryFee,
  categories,
  isFeatured
}: RestaurantCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="overflow-hidden group">
      <Link href={`/restaurants/${id}`} className="block relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {isFeatured && (
          <Badge className="absolute top-3 left-3 bg-primary text-white border-none shadow-premium">
            Featured
          </Badge>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm hover:bg-white dark:hover:bg-black"
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
        >
          <Heart 
            className={cn("w-5 h-5 transition-colors", isFavorite ? "fill-red-500 text-red-500" : "text-slate-600")} 
          />
        </Button>

        <div className="absolute bottom-3 left-3 text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
          <div className="text-xs font-medium bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
            Quick Delivery
          </div>
        </div>
      </Link>

      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg line-clamp-1">{name}</h3>
        </div>

        <div className="flex items-center gap-4 mb-3">
          <Rating value={rating} size={14} />
          <span className="text-xs text-muted-foreground">({reviews} reviews)</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Clock size={14} className="text-primary" /> {deliveryTime}
          </span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
          <span className="flex items-center gap-1">
            <Bike size={14} className="text-primary" /> ${deliveryFee.toFixed(2)} delivery
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Badge key={cat} variant="secondary" className="text-[10px] font-medium bg-muted/50 border-none">
              {cat}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
