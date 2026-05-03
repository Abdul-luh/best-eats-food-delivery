"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Search, MapPin, ArrowRight, Star, Clock, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-primary/5 rounded-l-[100px] hidden lg:block" />
      <div className="absolute top-40 right-40 -z-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 -z-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-slide-up">
            <Badge variant="brand" className="px-4 py-1.5 text-sm rounded-full">
              🚀 Now serving in 50+ cities
            </Badge>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
              The Best <span className="text-primary">Food</span> <br />
              Delivered To <br />
              <span className="relative">
                Your Door
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 0 100 5 L 100 10 L 0 10 Z" fill="currentColor" />
                </svg>
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Experience the premium food delivery service with the fastest ETA and real-time tracking. 
              Thousands of restaurants at your fingertips.
            </p>

            {/* Search Box */}
            <div className="flex flex-col sm:flex-row gap-2 p-2 bg-card border rounded-2xl shadow-premium max-w-xl">
              <div className="flex-1 flex items-center gap-3 px-4 py-3">
                <MapPin className="text-primary" size={20} />
                <input 
                  type="text" 
                  placeholder="Enter delivery address..." 
                  className="bg-transparent border-none focus:ring-0 w-full text-sm font-medium"
                />
              </div>
              <Button size="xl" variant="brand" className="rounded-xl">
                Find Food <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Star size={20} fill="currentColor" />
                </div>
                <div>
                  <div className="text-sm font-bold">4.9/5</div>
                  <div className="text-xs text-muted-foreground">User Rating</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Clock size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold">25 min</div>
                  <div className="text-xs text-muted-foreground">Average ETA</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold">100% Secure</div>
                  <div className="text-xs text-muted-foreground">Safe Payments</div>
                </div>
              </div>
            </div>
          </div>

          {/* Visuals */}
          <div className="relative hidden lg:block animate-fade-in">
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop" 
                alt="Delicious Food" 
                width={600} 
                height={800}
                className="object-cover h-[600px]"
              />
            </div>
            
            {/* Floating Card 1 */}
            <div className="absolute -left-12 top-20 z-20 bg-card/90 backdrop-blur-md p-4 rounded-2xl shadow-premium border animate-bounce-slow">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=100" alt="Pizza" width={50} height={50} />
                </div>
                <div>
                  <div className="text-sm font-bold">Double Cheese Pizza</div>
                  <div className="text-xs text-primary font-bold">$12.99</div>
                </div>
              </div>
            </div>

            {/* Floating Card 2 */}
            <div className="absolute -right-8 bottom-20 z-20 bg-card/90 backdrop-blur-md p-4 rounded-2xl shadow-premium border animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                  <Clock size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold">On the way!</div>
                  <div className="text-xs text-muted-foreground">ETA: 12 mins</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
