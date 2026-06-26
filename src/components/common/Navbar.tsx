"use client";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  Store,
  LayoutDashboard,
  User,
  PackageCheck,
  UserPlus,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function Navbar() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const items = useCartStore((state) => state.items);

  const totalItemsCount = useMemo(() => {
    const currentItems = items || [];
    return currentItems.reduce(
      (accumulatedTotal, activeItem) =>
        accumulatedTotal + (activeItem.quantity || 0),
      0,
    );
  }, [items]);

  // Integrated link schema maps
  const leftNavigationLinks = [
    { name: "Shop", href: "/listings", icon: Store },
    { name: "My Orders", href: "/orders", icon: PackageCheck },
    { name: "Merchant Portal", href: "/onboarding", icon: LayoutDashboard },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/5 bg-black/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Marketplace Branding Logo */}
          <div className="flex items-center gap-2">
            <Link href="/listings" className="flex items-center space-x-2">
              <span className="bg-gradient-to-r from-brand-crimson to-rose-500 bg-clip-text text-xl font-black tracking-tight text-transparent">
                eXobe
              </span>
            </Link>
          </div>

          {/* Core Desktop Navigation Hub */}
          <div className="hidden md:flex items-center space-x-1">
            {leftNavigationLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-white/10 text-white font-bold"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Interactive Utility Control Blocks */}
          <div className="flex items-center space-x-3 ml-auto md:ml-0">
            {/* REGISTER ACTION CTA BUTTON */}
            <Link
              href="/register"
              className={`hidden sm:flex items-center space-x-1.5 px-3.5 py-2 border rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                pathname === "/register"
                  ? "bg-brand-crimson border-brand-crimson text-white"
                  : "bg-transparent border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register</span>
            </Link>

            {/* Live Synchronized Basket Shortcut Trigger */}
            <Link
              href="/cart"
              className={`relative p-2.5 rounded-xl border transition-all flex items-center justify-center ${
                pathname === "/cart"
                  ? "bg-brand-crimson/10 border-brand-crimson/30 text-brand-crimson"
                  : "bg-neutral-950 border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
              }`}
            >
              <ShoppingCart className="w-4 h-4" />

              {isMounted && totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-4.5 bg-brand-crimson text-white font-mono text-[9px] font-black rounded-full flex items-center justify-center px-1 border border-black">
                  {totalItemsCount}
                </span>
              )}
            </Link>

            <button className="w-9 h-9 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors">
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
