"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  PlusCircle,
  LayoutDashboard,
  ShoppingBag,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export default function MobileNav() {
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.getTotalItems());

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Search", href: "/listings", icon: Search },
    { label: "Sell", href: "/onboarding", icon: PlusCircle, highlight: true },
    { label: "Quotes", href: "/cart", icon: ShoppingBag, badge: totalItems },
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-brand-black/95 backdrop-blur-md border-t border-white/10 md:hidden block">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center w-full h-full text-xs font-medium transition-all ${
                item.highlight
                  ? "text-brand-crimson scale-110"
                  : isActive
                    ? "text-brand-crimson"
                    : "text-neutral-400"
              }`}
            >
              <Icon
                className={`${item.highlight ? "w-6 h-6" : "w-5 h-5"} mb-0.5`}
              />
              <span>{item.label}</span>

              {/* RFQ Cart Item Count Badge */}
              {!!item.badge && (
                <span className="absolute top-2 right-4 bg-brand-crimson text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
