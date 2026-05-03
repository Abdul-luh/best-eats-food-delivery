"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronLeft,
  Store,
  Wallet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { signOut } from "next-auth/react";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/vendor" },
  { icon: ShoppingBag, label: "Orders", href: "/vendor/orders" },
  { icon: Package, label: "Products", href: "/vendor/products" },
  { icon: BarChart3, label: "Analytics", href: "/vendor/analytics" },
  { icon: Wallet, label: "Payouts", href: "/vendor/payouts" },
  { icon: Settings, label: "Settings", href: "/vendor/settings" },
];

export function VendorSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen sticky top-0 left-0 bg-card border-r flex flex-col p-4 shadow-sm z-40">
      <div className="mb-10 px-2 flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-premium">
          <Store size={24} />
        </div>
        <div>
          <h1 className="font-black text-lg leading-tight">Vendor</h1>
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? "brand" : "ghost"}
              className={cn(
                "w-full justify-start rounded-xl h-12 transition-all",
                pathname === item.href ? "shadow-premium" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              <span className="font-semibold">{item.label}</span>
            </Button>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t px-2">
        <div className="bg-muted/50 p-4 rounded-2xl mb-4">
          <div className="text-xs font-bold text-muted-foreground mb-1">REVENUE TODAY</div>
          <div className="text-xl font-black text-emerald-500">$452.80</div>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-destructive hover:bg-destructive/10 rounded-xl"
          onClick={() => signOut()}
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span className="font-semibold">Sign Out</span>
        </Button>
      </div>
    </aside>
  );
}
