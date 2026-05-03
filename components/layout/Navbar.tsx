"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  X, 
  User, 
  LogOut, 
  ChevronDown,
  LayoutDashboard,
  Settings,
  Moon,
  Sun,
  Bell
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/useCartStore";
import { useUIStore } from "@/lib/store/useUIStore";
import { cn } from "@/lib/utils/cn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { totalItems } = useCartStore();
  const { isDarkMode, toggleDarkMode, toggleCart, toggleSidebar } = useUIStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAdmin = session?.user?.role === "ADMIN";
  const isVendor = session?.user?.role === "VENDOR";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-border py-2" 
          : "bg-transparent border-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-premium">
              B
            </div>
            <span className="text-xl font-bold tracking-tight hidden sm:block">
              Best<span className="text-primary">Eats</span>
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search for food, restaurants..."
              className="w-full bg-muted/50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary transition-all"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              className="relative rounded-full"
            >
              <ShoppingCart size={20} />
              {totalItems() > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                  variant="brand"
                >
                  {totalItems()}
                </Badge>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hidden sm:flex"
            >
              <Bell size={20} />
            </Button>

            {session ? (
              <div className="flex items-center gap-3">
                <div className="hidden lg:flex flex-col items-end mr-1">
                  <span className="text-sm font-semibold">{session.user?.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">{session.user?.role?.toLowerCase()}</span>
                </div>
                <div className="group relative">
                  <Avatar className="h-10 w-10 border-2 border-primary/20 group-hover:border-primary transition-all cursor-pointer">
                    <AvatarImage src={session.user?.image || ""} />
                    <AvatarFallback>{session.user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  
                  {/* User Dropdown Placeholder */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-card border rounded-xl shadow-premium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2">
                    {isAdmin && (
                      <Link href="/admin">
                        <Button variant="ghost" className="w-full justify-start text-sm">
                          <LayoutDashboard className="mr-2 h-4 w-4" /> Admin Panel
                        </Button>
                      </Link>
                    )}
                    {isVendor && (
                      <Link href="/vendor">
                        <Button variant="ghost" className="w-full justify-start text-sm">
                          <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                        </Button>
                      </Link>
                    )}
                    <Link href="/profile">
                      <Button variant="ghost" className="w-full justify-start text-sm">
                        <User className="mr-2 h-4 w-4" /> Profile
                      </Button>
                    </Link>
                    <Link href="/orders">
                      <Button variant="ghost" className="w-full justify-start text-sm">
                        <ShoppingCart className="mr-2 h-4 w-4" /> Orders
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-sm text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => signOut()}
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link href="/login">
                  <Button variant="ghost" className="hidden sm:flex">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="brand">Sign Up</Button>
                </Link>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t p-4 space-y-4 animate-fade-in">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-muted rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/restaurants" className="p-3 bg-muted rounded-xl text-center font-medium">Restaurants</Link>
            <Link href="/categories" className="p-3 bg-muted rounded-xl text-center font-medium">Categories</Link>
            <Link href="/offers" className="p-3 bg-muted rounded-xl text-center font-medium">Offers</Link>
            <Link href="/support" className="p-3 bg-muted rounded-xl text-center font-medium">Support</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
