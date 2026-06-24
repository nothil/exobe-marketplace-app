"use client";
import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import {
  ShoppingCart,
  Store,
  Search,
  LayoutDashboard,
  User,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const items = useCartStore((state) => state.items);
  // const totalItems = useCartStore((state) => state.getTotalItems());
  const totalItemsCount = useMemo(() => {
    const currentItems = items || [];
    return currentItems.reduce(
      (accumulatedTotal, activeItem) =>
        accumulatedTotal + (activeItem.quantity || 0),
      0,
    );
  }, [items]);

  const navigationLinks = [
    { name: "Discover", href: "/listings", icon: Store },
    { name: "Merchant Portal", href: "/onboarding", icon: LayoutDashboard },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/5 bg-black/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Marketplace Branding Engine Logo */}
          <div className="flex items-center gap-2">
            <Link href="/listings" className="flex items-center space-x-2">
              <span className="bg-gradient-to-r from-brand-crimson to-rose-500 bg-clip-text text-xl font-black tracking-tight text-transparent">
                eXobe
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Routes */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Checkout Basket Controller Hub & User Actions */}
          <div className="flex items-center space-x-4 ml-auto md:ml-0">
            {/* GO-TO-BASKET REDIRECT TRIGGER COMPONENT WITH LIVE COUNTER BADGE */}
            <Link
              href="/cart"
              className={`relative p-2.5 rounded-xl border transition-all flex items-center justify-center ${
                pathname === "/cart"
                  ? "bg-brand-crimson/10 border-brand-crimson/30 text-brand-crimson"
                  : "bg-neutral-950 border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
              }`}
              aria-label="View shopping basket"
            >
              <ShoppingCart className="w-5 h-5" />

              {/* Conditional Item Count Micro-Badge Trigger */}
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 bg-brand-crimson text-white font-mono text-[10px] font-black rounded-full flex items-center justify-center px-1.5 shadow-lg animate-scaleIn border border-black">
                  {totalItemsCount > 99 ? "99+" : totalItemsCount}
                </span>
              )}
            </Link>

            {/* Profile Avatar Shell Button */}
            <button className="w-9 h-9 rounded-xl bg-neutral-900 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors">
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
