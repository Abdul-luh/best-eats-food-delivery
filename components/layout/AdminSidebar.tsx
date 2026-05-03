"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  ShoppingBag, 
  CreditCard,
  FileText,
  Tag,
  Settings,
  ShieldAlert,
  LogOut,
  ChevronLeft,
  Crown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { signOut } from "next-auth/react";

const menuItems = [
  { icon: LayoutDashboard, label: "Platform Overview", href: "/admin" },
  { icon: Users, label: "Users Management", href: "/admin/users" },
  { icon: Store, label: "Vendor Management", href: "/admin/vendors" },
  { icon: ShoppingBag, label: "Order Oversight", href: "/admin/orders" },
  { icon: CreditCard, label: "Payment Logs", href: "/admin/payments" },
  { icon: ShieldAlert, label: "Fraud Center", href: "/admin/fraud" },
  { icon: Tag, label: "Coupons", href: "/admin/coupons" },
  { icon: FileText, label: "System Reports", href: "/admin/reports" },
  { icon: Settings, label: "Global Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen sticky top-0 left-0 bg-slate-900 text-white flex flex-col p-4 z-40">
      <div className="mb-10 px-2 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
          <Crown size={24} />
        </div>
        <div>
          <h1 className="font-black text-lg leading-tight">Admin</h1>
          <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Platform Oversight</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start rounded-xl h-12 transition-all",
                pathname === item.href 
                  ? "bg-white/10 text-white shadow-sm border border-white/10" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("mr-3 h-5 w-5", pathname === item.href ? "text-primary" : "")} />
              <span className="font-semibold">{item.label}</span>
            </Button>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t border-white/10 px-2">
        <div className="bg-white/5 p-4 rounded-2xl mb-4 border border-white/5">
          <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase">Total Platform GMV</div>
          <div className="text-xl font-black text-primary">$1.2M</div>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-400 hover:bg-red-400/10 rounded-xl"
          onClick={() => signOut()}
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span className="font-semibold">Sign Out</span>
        </Button>
      </div>
    </aside>
  );
}
