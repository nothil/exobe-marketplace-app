"use client";
import { useCurrency, CurrencyCode } from "@/context/currencyContext";
import { Coins } from "lucide-react";

export default function CurrencySelector() {
  const { currentCurrency, setCurrency } = useCurrency();

  return (
    <div className="flex items-center space-x-1.5 bg-neutral-900 border border-white/10 px-2.5 py-1.5 rounded-xl transition-all hover:border-white/20">
      <Coins className="w-3.5 h-3.5 text-brand-crimson" />

      <select
        value={currentCurrency}
        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        className="bg-transparent text-white text-xs font-mono font-bold focus:outline-none cursor-pointer pr-1"
      >
        <option value="ZAR" className="bg-neutral-950 text-white">
          ZAR (R)
        </option>
        <option value="USD" className="bg-neutral-950 text-white">
          USD ($)
        </option>
        <option value="NGN" className="bg-neutral-950 text-white">
          NGN (₦)
        </option>
        <option value="KES" className="bg-neutral-950 text-white">
          KES (KSh)
        </option>
        <option value="GHS" className="bg-neutral-950 text-white">
          GHS (₵)
        </option>
        <option value="XOF" className="bg-neutral-950 text-white">
          XOF (CFA)
        </option>
      </select>
    </div>
  );
}
