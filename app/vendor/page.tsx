"use client";

import React from "react";
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  Clock, 
  ChevronRight,
  Plus,
  Store
} from "lucide-react";
import { StatsCard } from "@/components/vendor/StatsCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function VendorDashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Burger King Premium</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl font-bold">
            Download Report
          </Button>
          <Link href="/vendor/products/new">
            <Button variant="brand" className="rounded-xl font-bold">
              <Plus size={20} className="mr-2" /> Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Today's Revenue" 
          value="$452.80" 
          icon={DollarSign} 
          trend={{ value: 12, isPositive: true }}
          color="emerald"
        />
        <StatsCard 
          title="New Orders" 
          value="24" 
          icon={ShoppingBag} 
          trend={{ value: 5, isPositive: true }}
          color="brand"
        />
        <StatsCard 
          title="Avg. Rating" 
          value="4.8" 
          icon={TrendingUp} 
          color="amber"
        />
        <StatsCard 
          title="Avg. Prep Time" 
          value="18m" 
          icon={Clock} 
          trend={{ value: 2, isPositive: false }}
          color="blue"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Orders Table Placeholder */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-black">Recent Orders</CardTitle>
            <Link href="/vendor/orders" className="text-primary text-sm font-bold hover:underline">
              View All
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "#ORD-7392", customer: "John Doe", items: 3, total: 42.50, status: "PREPARING" },
                { id: "#ORD-7391", customer: "Alice Smith", items: 1, total: 12.99, status: "ACCEPTED" },
                { id: "#ORD-7390", customer: "Bob Wilson", items: 2, total: 28.00, status: "READY" },
                { id: "#ORD-7389", customer: "Elena Rigby", items: 4, total: 56.40, status: "PENDING" },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-card rounded-xl flex items-center justify-center font-bold border">
                      {order.id.slice(-2)}
                    </div>
                    <div>
                      <div className="font-bold">{order.id}</div>
                      <div className="text-xs text-muted-foreground">{order.customer} • {order.items} items</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <div className="font-bold">${order.total.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground">Credit Card</div>
                    </div>
                    <Badge variant={
                      order.status === "READY" ? "success" : 
                      order.status === "PREPARING" ? "brand" : 
                      order.status === "PENDING" ? "warning" : "secondary"
                    }>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Sidebar Widgets */}
        <div className="space-y-8">
          {/* Best Sellers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-black">Top Products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Whopper Burger", sales: 124, revenue: 1238.76 },
                { name: "Chicken Royale", sales: 98, revenue: 881.02 },
                { name: "Onion Rings", sales: 76, revenue: 304.00 },
              ].map((product, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-xl font-black text-muted-foreground/30 w-6">#{i+1}</div>
                    <div>
                      <div className="font-bold text-sm">{product.name}</div>
                      <div className="text-xs text-muted-foreground">{product.sales} sold</div>
                    </div>
                  </div>
                  <div className="font-bold text-sm">${product.revenue.toFixed(0)}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Store Status */}
          <Card className="bg-brand-600 text-white border-none overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Store size={80} />
            </div>
            <CardContent className="p-6 relative z-10">
              <h4 className="font-bold mb-2">Store Status</h4>
              <p className="text-sm opacity-80 mb-6">Your store is currently open and accepting orders.</p>
              <Button className="w-full bg-white text-brand-600 font-bold hover:bg-slate-100 rounded-xl">
                Close Store
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
