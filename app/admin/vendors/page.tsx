"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  Store, 
  Star, 
  TrendingUp, 
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const mockVendors = [
  { id: "1", name: "Burger King Premium", owner: "John Doe", rating: 4.8, revenue: 12450, status: "VERIFIED", joined: "2024-01-15", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=100" },
  { id: "2", name: "Sushi Master", owner: "Alice Smith", rating: 4.9, revenue: 8200, status: "VERIFIED", joined: "2024-02-01", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=100" },
  { id: "3", name: "La Piazza", owner: "Bob Wilson", rating: 4.7, revenue: 15600, status: "PENDING", joined: "2024-03-10", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=100" },
  { id: "4", name: "Garden Fresh", owner: "Elena Rigby", rating: 4.5, revenue: 3400, status: "VERIFIED", joined: "2024-02-15", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=100" },
];

export default function AdminVendors() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black mb-2">Vendors</h1>
          <p className="text-muted-foreground">Manage restaurant partners and applications</p>
        </div>
        <Button variant="brand" className="rounded-xl font-bold h-12">
          <Plus size={20} className="mr-2" /> New Application
        </Button>
      </div>

      {/* Stats row for vendors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <p className="text-xs font-bold text-primary uppercase mb-1">Total Vendors</p>
            <h3 className="text-3xl font-black">128</h3>
          </CardContent>
        </Card>
        <Card className="bg-emerald-500/5 border-emerald-500/20">
          <CardContent className="p-6">
            <p className="text-xs font-bold text-emerald-500 uppercase mb-1">Pending Approval</p>
            <h3 className="text-3xl font-black">12</h3>
          </CardContent>
        </Card>
        <Card className="bg-blue-500/5 border-blue-500/20">
          <CardContent className="p-6">
            <p className="text-xs font-bold text-blue-500 uppercase mb-1">Total Payouts</p>
            <h3 className="text-3xl font-black">$45.2k</h3>
          </CardContent>
        </Card>
      </div>

      <div className="bg-card rounded-3xl border shadow-premium overflow-hidden">
        <div className="p-6 border-b flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Search by restaurant name..." 
              className="pl-12 h-12"
            />
          </div>
          <Button variant="outline" className="h-12 rounded-xl">
            <Filter size={18} className="mr-2" /> Status
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/30">
                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Restaurant</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Rating</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mockVendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-muted/10 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden border">
                        <Image src={vendor.image} alt={vendor.name} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-sm">{vendor.name}</div>
                        <div className="text-xs text-muted-foreground">Owner: {vendor.owner}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm">
                      <Star size={16} fill="currentColor" /> {vendor.rating}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-black text-sm">${vendor.revenue.toLocaleString()}</div>
                    <div className="text-[10px] text-emerald-500 font-bold">+12.5%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vendor.status === "VERIFIED" ? (
                      <Badge variant="success" className="gap-1">
                        <ShieldCheck size={12} /> Verified
                      </Badge>
                    ) : (
                      <Badge variant="warning" className="gap-1">
                        <AlertCircle size={12} /> Pending
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {new Date(vendor.joined).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Button variant="ghost" size="icon" className="rounded-xl group-hover:bg-primary/10 group-hover:text-primary">
                      <ExternalLink size={18} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
