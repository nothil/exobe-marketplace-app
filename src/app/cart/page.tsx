"use client";
import { useCartStore } from "@/store/useCartStore";
import {
  Trash2,
  CreditCard,
  Calendar,
  ShieldCheck,
  Sparkles,
  AlertTriangle, // Imported for warning banner layout
} from "lucide-react";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // State: Toggle selector between PayJustNow and a direct standard Card checkout
  const [activeMethod, setActiveMethod] = useState<"PAYJUSTNOW" | "CARD">(
    "PAYJUSTNOW",
  );

  // Compute calculated values
  const totalAmount = getTotalPrice();
  const installmentAmount = totalAmount / 3;

  // Next-generation logic: Enforce a rigid R700 baseline minimum check constraint for installment rails
  const isEligibleForInstallments = totalAmount >= 700;

  // Automatically fall back to Credit Card processing if user alters quantities below the threshold
  useEffect(() => {
    if (!isEligibleForInstallments && activeMethod === "PAYJUSTNOW") {
      setActiveMethod("CARD");
    }
  }, [totalAmount, isEligibleForInstallments, activeMethod]);

  // Generate dynamic dates for the next two months payment schedule
  const paymentScheduleDates = useMemo(() => {
    const today = new Date();

    const month1 = new Date();
    month1.setMonth(today.getMonth() + 1);

    const month2 = new Date();
    month2.setMonth(today.getMonth() + 2);

    const formatOptions: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return {
      today: "Due Immediately",
      month1: month1.toLocaleDateString("en-ZA", formatOptions),
      month2: month2.toLocaleDateString("en-ZA", formatOptions),
    };
  }, []);

  const handleCheckout = () => {
    setCheckoutComplete(true);
    clearCart();
  };

  if (checkoutComplete) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 mx-auto animate-pulse">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-black text-white">Order Confirmed!</h2>
        <p className="text-xs text-neutral-400 leading-relaxed">
          {activeMethod === "PAYJUSTNOW"
            ? `Your transaction structure was finalized securely. We are handing your
            profile off to the official PayJustNow gateway to verify your identity
            and link your debit/credit card...`
            : `Your payment was authorized successfully. Secure gateway clearing tokens 
            have locked this inventory segment. Your freight manifests are generating now.`}
        </p>
        <Link
          href="/listings"
          className="inline-block px-6 py-3 bg-brand-crimson hover:bg-brand-crimson/90 font-bold text-xs rounded-xl mt-4 uppercase tracking-wider transition-all"
        >
          Continue Discovering Products
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-5xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-white tracking-tight">
          Your Shopping Basket
        </h1>
        <p className="text-xs text-neutral-400 font-mono">
          Review items and view your custom PayJustNow installment options.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-white/5 rounded-2xl space-y-4">
          <p className="text-neutral-500 text-sm font-mono">
            Your basket is currently empty.
          </p>
          <Link
            href="/listings"
            className="inline-block px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-colors"
          >
            Browse Products Hub
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: ACTIVE BASKET ITEMS LISTING */}
          <div className="lg:col-span-7 space-y-4">
            {items.map((item) => (
              <div
                key={item.listing.id}
                className="bg-neutral-950 border border-white/5 p-4 rounded-xl flex items-center space-x-4 transition-all hover:border-white/10"
              >
                <img
                  src={item.listing.images[0]}
                  alt={item.listing.title}
                  className="w-16 h-16 object-cover rounded-lg bg-neutral-900 border border-white/5 shrink-0"
                />

                <div className="flex-grow min-w-0">
                  <h3 className="text-sm font-bold text-white truncate">
                    {item.listing.title}
                  </h3>
                  <p className="text-xs font-mono text-neutral-500 mt-0.5">
                    R {item.listing.price.toFixed(2)} each
                  </p>
                </div>

                <div className="flex items-center space-x-1.5 border border-white/5 bg-brand-black rounded-lg p-1">
                  <button
                    onClick={() =>
                      updateQuantity(item.listing.id, item.quantity - 1)
                    }
                    className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
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
                    className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.listing.id)}
                  className="text-neutral-500 hover:text-brand-crimson p-2 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT: LIVE INTERACTIVE PAYJUSTNOW SUMMARY CARD */}
          <div className="lg:col-span-5 space-y-4 sticky top-24">
            <div className="bg-neutral-950 border border-white/10 p-6 rounded-2xl space-y-6">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide border-b border-white/5 pb-3">
                Checkout Summary
              </h3>

              {/* TOTAL BASE CASH PRICE DISPLAY */}
              <div className="flex justify-between items-baseline font-mono text-xs text-neutral-400">
                <span>Total Upfront Cash Price:</span>
                <span className="text-xl font-black text-white">
                  R {totalAmount.toFixed(2)}
                </span>
              </div>

              {/* DUAL METHOD SELECTOR TABS BAR */}
              <div className="grid grid-cols-2 gap-2 bg-neutral-900 p-1 rounded-xl border border-white/5">
                <button
                  type="button"
                  disabled={!isEligibleForInstallments}
                  onClick={() => setActiveMethod("PAYJUSTNOW")}
                  className={`py-2 text-[11px] font-mono font-bold uppercase rounded-lg transition-all ${
                    !isEligibleForInstallments
                      ? "opacity-30 cursor-not-allowed text-neutral-600"
                      : activeMethod === "PAYJUSTNOW"
                        ? "bg-white/10 text-white"
                        : "text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  Installments
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMethod("CARD")}
                  className={`py-2 text-[11px] font-mono font-bold uppercase rounded-lg transition-all ${
                    activeMethod === "CARD"
                      ? "bg-white/10 text-white"
                      : "text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  Card Payment
                </button>
              </div>

              {/* MINIMUM VALUE LIMIT WARNING BANNER INJECTION */}
              {!isEligibleForInstallments && (
                <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-2.5 text-amber-400 animate-in fade-in duration-200">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold font-mono tracking-wide uppercase">
                      Installments Locked
                    </p>
                    <p className="text-[10px] text-neutral-400 leading-normal font-sans">
                      PayJustNow features are only available for procurement
                      orders totaling R 700.00 or higher.
                    </p>
                  </div>
                </div>
              )}

              {/* CONDITIONALLY RENDER INTERFACE ELEMENTS BASED ON SELECTED METHOD */}
              {activeMethod === "PAYJUSTNOW" && isEligibleForInstallments ? (
                <>
                  {/* INTERACTIVE PAYJUSTNOW INSTALLMENT TIMELINE WIDGET */}
                  <div className="border border-sky-500/20 bg-sky-500/5 p-4 rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <Sparkles className="w-4 h-4 text-sky-400" />
                        <span className="text-xs font-bold text-sky-400 font-mono tracking-wider uppercase">
                          PayJustNow Schedule
                        </span>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 bg-sky-400/20 text-sky-400 font-bold rounded uppercase tracking-widest">
                        0% Interest
                      </span>
                    </div>

                    <p className="text-[11px] text-neutral-400 leading-normal">
                      Split this payment into 3 equal monthly bites,
                      interest-free. Your tailored collection layout looks
                      exactly like this:
                    </p>

                    {/* THE INSTALLMENT SCHEDULE TIMELINE PIPELINE */}
                    <div className="space-y-3 pt-2">
                      {/* SLICE 1: TODAY */}
                      <div className="flex items-center justify-between border-l-2 border-sky-400 pl-3 py-0.5">
                        <div className="space-y-0.5">
                          <span className="text-[11px] font-bold text-white block">
                            1st Payment (Today)
                          </span>
                          <span className="text-[10px] text-neutral-400 font-mono">
                            {paymentScheduleDates.today}
                          </span>
                        </div>
                        <span className="font-mono text-sm font-black text-sky-400">
                          R {installmentAmount.toFixed(2)}
                        </span>
                      </div>

                      {/* SLICE 2: NEXT MONTH */}
                      <div className="flex items-center justify-between border-l-2 border-neutral-800 pl-3 py-0.5">
                        <div className="space-y-0.5">
                          <span className="text-[11px] font-bold text-white block">
                            2nd Payment
                          </span>
                          <span className="text-[10px] text-neutral-500 font-mono">
                            {paymentScheduleDates.month1}
                          </span>
                        </div>
                        <span className="font-mono text-sm font-bold text-neutral-300">
                          R {installmentAmount.toFixed(2)}
                        </span>
                      </div>

                      {/* SLICE 3: MONTH AFTER NEXT */}
                      <div className="flex items-center justify-between border-l-2 border-neutral-800 pl-3 py-0.5">
                        <div className="space-y-0.5">
                          <span className="text-[11px] font-bold text-white block">
                            3rd Final Payment
                          </span>
                          <span className="text-[10px] text-neutral-500 font-mono">
                            {paymentScheduleDates.month2}
                          </span>
                        </div>
                        <span className="font-mono text-sm font-bold text-neutral-300">
                          R {installmentAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* PAYJUSTNOW ACTION BUTTON */}
                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-brand-crimson hover:bg-brand-crimson/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-brand-crimson/10 active:scale-98 transition-all"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Confirm Order via PayJustNow</span>
                  </button>
                </>
              ) : (
                <>
                  {/* DIRECT INLINE CREDIT CARD TERMINAL VIEW LAYER */}
                  <div className="p-4 bg-neutral-900 border border-white/5 rounded-xl space-y-3 animate-in fade-in duration-200">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="4111 2222 3333 4444"
                        maxLength={19}
                        className="w-full bg-neutral-950 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-neutral-700 focus:outline-none focus:border-brand-crimson"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                          Expiry
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full bg-neutral-950 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-center text-white placeholder-neutral-700 focus:outline-none focus:border-brand-crimson"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                          CVC
                        </label>
                        <input
                          type="password"
                          placeholder="•••"
                          maxLength={3}
                          className="w-full bg-neutral-950 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-center text-white placeholder-neutral-700 focus:outline-none focus:border-brand-crimson"
                        />
                      </div>
                    </div>
                  </div>

                  {/* STANDARD CARD CHECKOUT ACTION BUTTON */}
                  <button
                    onClick={handleCheckout}
                    className="w-full py-4 bg-white hover:bg-neutral-200 text-black rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg active:scale-98 transition-all"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Pay Full Upfront Amount</span>
                  </button>
                </>
              )}

              <div className="flex items-center justify-center space-x-1.5 text-[10px] font-mono text-neutral-500 text-center">
                <Calendar className="w-3.5 h-3.5" />
                <span>No hidden fees • Instant approvals fallback</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
