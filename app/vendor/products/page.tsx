"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Image as ImageIcon,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const mockProducts = [
  { id: "1", name: "Classic Cheeseburger", category: "Burgers", price: 9.99, inventory: 150, status: "IN_STOCK", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=100" },
  { id: "2", name: "Double Whopper", category: "Burgers", price: 12.50, inventory: 85, status: "IN_STOCK", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=100" },
  { id: "3", name: "Onion Rings (8pcs)", category: "Sides", price: 4.99, inventory: 200, status: "IN_STOCK", image: "https://images.unsplash.com/photo-1639024471283-03518883512d?q=80&w=100" },
  { id: "4", name: "Chocolate Shake", category: "Drinks", price: 5.50, inventory: 0, status: "OUT_OF_STOCK", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=100" },
  { id: "5", name: "French Fries XL", category: "Sides", price: 3.99, inventory: 300, status: "IN_STOCK", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=100" },
];

export default function VendorProducts() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-4xl font-black mb-2">Products</h1>
          <p className="text-muted-foreground">Manage your menu and inventory</p>
        </div>
        <Button variant="brand" className="rounded-xl font-bold h-12">
          <Plus size={20} className="mr-2" /> Add New Product
        </Button>
      </div>

      {/* Filters & Search */}
      <Card className="border-none shadow-sm bg-muted/30">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Search products..." 
              className="pl-12 bg-card border-none h-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="h-12 rounded-xl border-none bg-card shadow-sm">
              <Filter size={18} className="mr-2" /> Categories
            </Button>
            <Button variant="outline" className="h-12 rounded-xl border-none bg-card shadow-sm">
              Status
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Product List */}
      <div className="bg-card rounded-3xl border shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mockProducts.map((product) => (
                <tr key={product.id} className="hover:bg-muted/20 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-muted border group-hover:scale-105 transition-transform">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <span className="font-bold text-sm">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="secondary" className="font-medium bg-muted/50">{product.category}</Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-black text-sm">${product.price.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {product.inventory} units
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.status === "IN_STOCK" ? (
                      <div className="flex items-center text-emerald-500 text-xs font-bold gap-1">
                        <CheckCircle2 size={14} /> Active
                      </div>
                    ) : (
                      <div className="flex items-center text-red-500 text-xs font-bold gap-1">
                        <XCircle size={14} /> Out of Stock
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="rounded-lg hover:bg-primary/10 hover:text-primary">
                        <Edit size={18} />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-lg hover:bg-destructive/10 hover:text-destructive">
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="px-6 py-4 bg-muted/30 border-t flex justify-between items-center text-sm text-muted-foreground">
          <p>Showing 5 of 24 products</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled className="rounded-lg">Previous</Button>
            <Button variant="outline" size="sm" className="rounded-lg">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
