"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  ChevronRight, 
  ArrowLeft,
  Truck,
  CookingPot,
  PackageCheck,
  ShoppingBag,
  Store
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import Image from "next/image";

const statuses = [
  { key: "PENDING", label: "Order Placed", icon: ShoppingBag, desc: "We've received your order" },
  { key: "ACCEPTED", label: "Confirmed", icon: CheckCircle2, desc: "Restaurant has accepted your order" },
  { key: "PREPARING", label: "Preparing", icon: CookingPot, desc: "Chef is preparing your delicious meal" },
  { key: "READY", label: "Ready for Pickup", icon: PackageCheck, desc: "Your order is ready to be picked up" },
  { key: "PICKED_UP", label: "Out for Delivery", icon: Truck, desc: "Driver is on the way to your door" },
  { key: "DELIVERED", label: "Delivered", icon: CheckCircle2, desc: "Enjoy your meal!" },
];

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = params.id;
  const [currentStatusIndex, setCurrentStatusIndex] = useState(2); // Mock: currently PREPARING

  return (
    <div className="min-h-screen pt-24 pb-20 bg-muted/20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/orders">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-black">Track Order</h1>
              <p className="text-muted-foreground text-sm">Order ID: {orderId}</p>
            </div>
          </div>
          <Badge variant="brand" className="px-4 py-1.5 rounded-full text-sm font-bold">
            ETA: 12 MINS
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tracking Timeline */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden border-none shadow-premium">
              <div className="h-2 w-full bg-muted overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-1000 ease-in-out" 
                  style={{ width: `${((currentStatusIndex + 1) / statuses.length) * 100}%` }}
                />
              </div>
              <CardContent className="p-8">
                <div className="space-y-10">
                  {statuses.map((status, index) => {
                    const isActive = index <= currentStatusIndex;
                    const isCurrent = index === currentStatusIndex;
                    const Icon = status.icon;

                    return (
                      <div key={status.key} className="flex gap-6 relative">
                        {/* Line connector */}
                        {index < statuses.length - 1 && (
                          <div className={cn(
                            "absolute left-6 top-10 w-[2px] h-10 -ml-[1px] transition-colors",
                            index < currentStatusIndex ? "bg-primary" : "bg-muted"
                          )} />
                        )}

                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all shrink-0 z-10",
                          isCurrent ? "bg-primary text-white shadow-premium scale-110" :
                          isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                        )}>
                          <Icon size={24} />
                        </div>

                        <div className="flex-1 pt-1">
                          <h4 className={cn(
                            "font-bold transition-colors",
                            isActive ? "text-foreground" : "text-muted-foreground"
                          )}>
                            {status.label}
                          </h4>
                          <p className="text-sm text-muted-foreground">{status.desc}</p>
                        </div>

                        {isActive && !isCurrent && (
                          <div className="pt-2">
                            <CheckCircle2 size={18} className="text-emerald-500" />
                          </div>
                        )}
                        
                        {isCurrent && (
                          <div className="pt-2 animate-pulse">
                            <Badge variant="brand" className="text-[10px]">IN PROGRESS</Badge>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Info & Support */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-black">Restaurant</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 relative rounded-2xl overflow-hidden border">
                    <Image 
                      src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=100" 
                      alt="Restaurant" 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">Burger King Premium</h4>
                    <p className="text-xs text-muted-foreground">123 Food Street, City</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 rounded-xl h-10 text-xs font-bold">
                    <Phone size={14} className="mr-2" /> Call Store
                  </Button>
                  <Button variant="outline" className="rounded-xl h-10 w-10 p-0">
                    <Store size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-black">Delivery Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <MapPin className="text-primary shrink-0" size={18} />
                  <div>
                    <p className="text-sm font-bold">Home</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      123 Delicious Lane, Food City, 12345. Ring the bell twice.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 text-white border-none p-1">
              <div className="bg-primary/20 p-6 rounded-[23px] space-y-4">
                <h4 className="font-black">Need Help?</h4>
                <p className="text-sm opacity-80 leading-relaxed">
                  If you have any issues with your order, our support team is available 24/7.
                </p>
                <Button className="w-full bg-white text-slate-900 font-bold hover:bg-slate-100 rounded-xl">
                  Chat with Support
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
