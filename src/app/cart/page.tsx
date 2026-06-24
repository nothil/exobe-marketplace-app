"use client";
import { useCartStore } from "@/store/useCartStore";
import { Trash2, CreditCard, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const handleCheckout = () => {
    setCheckoutComplete(true);
    clearCart();
  };

  if (checkoutComplete) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <h2 className="text-3xl font-black text-white">Order Confirmed!</h2>
        <p className="text-xs text-neutral-400 leading-relaxed">
          Your transaction was successful. Redirecting seamlessly to the secure
          PayJustNow installment scheduling portal...
        </p>
        <Link
          href="/listings"
          className="inline-block px-6 py-2 bg-brand-crimson font-bold text-xs rounded-xl mt-4"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-black text-white">Your Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-white/5 rounded-2xl space-y-4">
          <p className="text-neutral-500 text-sm font-mono">
            Your basket is currently empty.
          </p>
          <Link
            href="/listings"
            className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10"
          >
            Browse Marketplace
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* ITEMS LIST */}
          <div className="md:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.listing.id}
                className="bg-neutral-950 border border-white/5 p-4 rounded-xl flex items-center space-x-4"
              >
                <img
                  src={item.listing.images[0]}
                  alt={item.listing.title}
                  className="w-16 h-16 object-cover rounded-lg bg-neutral-900"
                />
                <div className="flex-grow min-w-0">
                  <h3 className="text-sm font-bold text-white truncate">
                    {item.listing.title}
                  </h3>
                  <p className="text-xs font-mono text-neutral-400 mt-0.5">
                    R {item.listing.price.toFixed(2)} each
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.listing.id, item.quantity - 1)
                    }
                    className="px-2 text-neutral-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="text-xs font-mono font-bold text-white w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.listing.id, item.quantity + 1)
                    }
                    className="px-2 text-neutral-400 hover:text-white"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.listing.id)}
                  className="text-neutral-500 hover:text-brand-crimson p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* CHECKOUT SUMMARY CARD */}
          <div className="md:col-span-4 bg-neutral-950 border border-white/5 p-5 rounded-xl space-y-4">
            <h3 className="text-sm font-bold border-b border-white/5 pb-2">
              Order Summary
            </h3>
            <div className="flex justify-between items-baseline font-mono text-xs text-neutral-400">
              <span>Subtotal:</span>
              <span className="text-white font-bold">
                R {getTotalPrice().toFixed(2)}
              </span>
            </div>

            {/* PayJustNow Gateway Promo Option */}
            <div className="p-3 bg-sky-500/5 border border-sky-500/20 rounded-xl space-y-2">
              <div className="text-[11px] font-bold text-sky-400 font-mono tracking-wider uppercase">
                PayJustNow Enabled
              </div>
              <p className="text-[10px] text-neutral-400 leading-normal">
                Pay 1/3 today, and the rest over the next two months
                interest-free.
              </p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-brand-crimson hover:bg-brand-crimson/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Checkout via PayJustNow</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
