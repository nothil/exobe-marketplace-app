"use client";
import { use } from "react"; // Imported to safely resolve dynamic async router params
import { useCurrency } from "@/context/currencyContext";
import { useCartStore } from "@/store/useCartStore";
import { MARKETPLACE_DATA_MOCK } from "@/data/marketplaceData";
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

interface ListingDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ListingDetailPage({ params }: ListingDetailPageProps) {
  // 1. Unwrap the async param contract cleanly to prevent Type usability crashes
  const resolvedParams = use(params);

  const { formatPrice } = useCurrency();
  const addItem = useCartStore((state) => state.addItem);

  // 2. Modified item matching pattern using explicit String type casting to guarantee reliable lookups
  const product = MARKETPLACE_DATA_MOCK.find(
    (item) => String(item.id) === String(resolvedParams.id),
  );

  if (!product) {
    return (
      <div className="py-20 text-center font-mono text-xs text-neutral-400">
        Product listing artifact could not be found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <Link
        href="/listings"
        className="inline-flex items-center space-x-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Catalog</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-6 bg-neutral-950 border border-white/5 rounded-2xl overflow-hidden aspect-square">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:col-span-6 space-y-6 bg-neutral-950/40 border border-white/5 p-6 rounded-2xl">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold tracking-wider text-brand-crimson bg-brand-crimson/10 px-2.5 py-1 rounded border border-brand-crimson/20 uppercase">
              {product.category}
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
              {product.title}
            </h1>
            <p className="text-xs font-mono text-neutral-500">
              {product.location_city}, Africa
            </p>
          </div>

          <div className="p-4 bg-neutral-950 border border-white/10 rounded-xl flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">
                Trading Value
              </p>
              <p className="text-xl font-mono font-black text-white">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Swapped "Procure Asset" for "Add to Basket" */}
            <button
              onClick={() =>
                addItem(
                  {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    images: product.images,
                    location_city: product.location_city,
                  },
                  1,
                )
              }
              className="bg-brand-crimson hover:bg-brand-crimson/90 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl flex items-center space-x-2 transition-all active:scale-98 shadow-lg"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Basket</span>
            </button>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest border-b border-white/5 pb-1">
              Specifications
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed font-sans">
              {product.description}
            </p>
          </div>

          <div className="pt-2 grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2 p-3 bg-neutral-950 border border-white/5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span className="text-[10px] text-neutral-400 font-mono">
                eXobe Verified Seller
              </span>
            </div>
            <div className="flex items-center space-x-2 p-3 bg-neutral-950 border border-white/5 rounded-xl">
              <Truck className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span className="text-[10px] text-neutral-400 font-mono">
                Cross-Border Freight
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
