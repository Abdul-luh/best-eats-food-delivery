"use client";

import React, { useState } from "react";
import { useCartStore } from "@/lib/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  CreditCard, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  Truck,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatPrice } from "@/lib/utils/formatters";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryFee = 5.00;
  const tax = subtotal() * 0.1;
  const total = subtotal() + deliveryFee + tax;

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Mock processing delay
    await new Promise(r => setTimeout(r, 2000));
    
    toast.success("Order placed successfully!");
    clearCart();
    router.push("/orders/ORD-123456"); // Mock order tracking page
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <Truck size={40} className="text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Add some delicious food to your cart first!</p>
        <Button variant="brand" onClick={() => router.push("/")}>Go to Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-muted/20">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-black mb-8">Checkout</h1>

        {/* Stepper */}
        <div className="flex items-center gap-4 mb-12 overflow-x-auto pb-4">
          {[
            { n: 1, label: "Delivery Address" },
            { n: 2, label: "Payment Method" },
            { n: 3, label: "Review & Confirm" }
          ].map((s) => (
            <React.Fragment key={s.n}>
              <div className="flex items-center gap-3 shrink-0">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                  step === s.n ? "bg-primary text-white shadow-premium" : 
                  step > s.n ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"
                )}>
                  {step > s.n ? <CheckCircle2 size={20} /> : s.n}
                </div>
                <span className={cn(
                  "text-sm font-bold",
                  step >= s.n ? "text-foreground" : "text-muted-foreground"
                )}>{s.label}</span>
              </div>
              {s.n < 3 && <div className="w-12 h-[2px] bg-muted shrink-0" />}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-6">
            {step === 1 && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Delivery Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Label</label>
                      <Input placeholder="Home, Office..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Phone</label>
                      <Input placeholder="+1 (234) 567-890" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <Input className="pl-12" placeholder="123 Delicious Lane" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">City</label>
                      <Input placeholder="Food City" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Zip</label>
                      <Input placeholder="12345" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <button className="p-6 rounded-2xl border-2 border-primary bg-primary/5 flex flex-col items-center gap-3 text-primary">
                      <CreditCard size={32} />
                      <span className="font-bold">Credit/Debit Card</span>
                    </button>
                    <button className="p-6 rounded-2xl border-2 border-transparent bg-muted/50 hover:bg-muted flex flex-col items-center gap-3 text-muted-foreground">
                      <Image src="https://images.unsplash.com/photo-1594910414546-02e7535560b0?q=80&w=100" alt="Cash" width={32} height={32} className="opacity-50" />
                      <span className="font-bold">Cash on Delivery</span>
                    </button>
                  </div>
                  
                  {/* Mock Card Form */}
                  <div className="p-6 border rounded-2xl space-y-4 bg-muted/10 mt-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Card Number</label>
                      <Input placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Expiry</label>
                        <Input placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">CVC</label>
                        <Input placeholder="123" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 py-2 border-b last:border-0">
                        <div className="w-16 h-16 relative rounded-xl overflow-hidden shrink-0 border">
                          <Image src={item.product.image || ""} alt={item.product.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm">{item.product.name}</h4>
                          <p className="text-xs text-muted-foreground">Quantity: {item.quantity}</p>
                        </div>
                        <div className="font-black text-sm">{formatPrice(item.product.price * item.quantity)}</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <p className="font-bold">Home</p>
                        <p className="text-sm text-muted-foreground">123 Delicious Lane, Food City, 12345</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="flex justify-between pt-4">
              {step > 1 ? (
                <Button variant="ghost" onClick={handleBack} className="rounded-xl h-12 px-6">
                  <ChevronLeft className="mr-2 h-5 w-5" /> Back
                </Button>
              ) : <div />}
              
              {step < 3 ? (
                <Button variant="brand" onClick={handleNext} className="rounded-xl h-12 px-8 font-bold">
                  Continue <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button 
                  variant="brand" 
                  onClick={handlePlaceOrder} 
                  isLoading={isProcessing}
                  className="rounded-xl h-14 px-12 font-black text-lg shadow-premium"
                >
                  Pay {formatPrice(total)}
                </Button>
              )}
            </div>
          </div>

          {/* Sidebar - Order Summary */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl font-black">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-bold">{formatPrice(subtotal())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="font-bold">{formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxes (10%)</span>
                  <span className="font-bold">{formatPrice(tax)}</span>
                </div>
                <div className="border-t pt-4 flex justify-between items-end">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total</p>
                    <p className="text-3xl font-black">{formatPrice(total)}</p>
                  </div>
                  <Badge variant="success" className="mb-1">Secure</Badge>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-2xl">
              <ShieldCheck className="text-emerald-500" size={24} />
              <div className="text-xs text-muted-foreground leading-relaxed">
                Your payment information is processed securely and never stored on our servers.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
