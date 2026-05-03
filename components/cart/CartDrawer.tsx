"use client";

import React from "react";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/useCartStore";
import { useUIStore } from "@/lib/store/useUIStore";
import { formatPrice } from "@/lib/utils/formatters";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { useRouter } from "next/navigation";

export function CartDrawer() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCartStore();
  const { isCartOpen, setCartOpen } = useUIStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" 
        onClick={() => setCartOpen(false)}
      />

      {/* Drawer */}
      <div className={cn(
        "absolute top-0 right-0 h-full w-full max-w-md bg-card shadow-2xl flex flex-col transition-transform duration-500 ease-in-out border-l",
        isCartOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2 className="font-black text-xl tracking-tight">Your Cart</h2>
              <p className="text-xs text-muted-foreground font-bold">{totalItems()} items</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setCartOpen(false)} className="rounded-full">
            <X size={24} />
          </Button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                <ShoppingBag size={40} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground px-8">Looks like you haven&apos;t added anything to your cart yet.</p>
              </div>
              <Button variant="brand" className="rounded-xl" onClick={() => setCartOpen(false)}>Start Shopping</Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-20 h-20 relative rounded-2xl overflow-hidden border shrink-0 bg-muted">
                  <Image src={item.product.image || ""} alt={item.product.name} fill className="object-cover" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm line-clamp-1">{item.product.name}</h4>
                    <button 
                      onClick={() => removeItem(item.productId)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center border rounded-lg bg-muted/50">
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="p-1 hover:bg-muted transition-colors rounded-l-lg"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="p-1 hover:bg-muted transition-colors rounded-r-lg"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-black text-sm">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t bg-muted/20 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold">{formatPrice(subtotal())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="font-bold text-emerald-500">Free</span>
              </div>
              <div className="flex justify-between items-end pt-2">
                <span className="font-black text-lg">Total</span>
                <span className="text-2xl font-black">{formatPrice(subtotal())}</span>
              </div>
            </div>
            
            <Button 
              size="xl" 
              variant="brand" 
              className="w-full rounded-2xl h-14 font-black shadow-premium group"
              onClick={() => {
                setCartOpen(false);
                router.push("/checkout");
              }}
            >
              Checkout Now <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
