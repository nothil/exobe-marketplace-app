"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Supported Continental & Global Currencies
export type CurrencyCode = "ZAR" | "USD" | "NGN" | "KES" | "GHS" | "XOF";

interface CurrencyContextType {
  currentCurrency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (priceInZAR: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined,
);

// Exchange rates calculated with 1 ZAR as the baseline anchor currency
const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  ZAR: 1.0,
  USD: 0.054, // 1 ZAR = ~0.054 USD
  NGN: 82.5, // 1 ZAR = ~82.50 Nigerian Naira
  KES: 7.15, // 1 ZAR = ~7.15 Kenyan Shilling
  GHS: 0.83, // 1 ZAR = ~0.83 Ghanaian Cedi
  XOF: 33.12, // 1 ZAR = ~33.12 West African CFA Franc
};

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  ZAR: "R",
  USD: "$",
  NGN: "₦",
  KES: "KSh",
  GHS: "GH₵",
  XOF: "CFA",
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currentCurrency, setCurrency] = useState<CurrencyCode>("ZAR");

  const formatPrice = (priceInZAR: number) => {
    const rate = EXCHANGE_RATES[currentCurrency];
    const convertedPrice = priceInZAR * rate;
    const symbol = CURRENCY_SYMBOLS[currentCurrency];

    return `${symbol} ${convertedPrice.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <CurrencyContext.Provider
      value={{ currentCurrency, setCurrency, formatPrice }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
