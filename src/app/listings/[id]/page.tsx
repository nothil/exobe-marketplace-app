"use client";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  Sparkles,
  Truck,
  RefreshCw,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

// Aligned mock dataset using 'title' instead of 'name'
const MARKETPLACE_DATA_MOCK = [
  {
    id: "lst_1",
    title: "Organic Dried Rooibos Tea",
    category: "Agri-Processing",
    price: 145.0,
    images: [
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "Premium export grade herbal tea from the Western Cape. Rich in natural antioxidants, caffeine-free, and meticulously harvested for absolute quality.",
    location_city: "Clanwilliam",
    stock: 14,
  },
  {
    id: "lst_2",
    title: "Hand-Woven Sisal Tote Bag",
    category: "Custom Textiles",
    price: 380.0,
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "Durable everyday market tote bag featuring premium hand-woven sisal structures accented with locally sourced fine leather detailing straps.",
    location_city: "Johannesburg",
    stock: 5,
  },
  {
    id: "lst_3",
    title: "Raw Wildflower Honey",
    category: "Agri-Processing",
    price: 220.0,
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "Pure, unpasteurized bushveld honey harvested sustainably directly from local bee apiaries in the Mpumalanga ridge.",
    location_city: "Nelspruit",
    stock: 8,
  },
  {
    id: "lst_4",
    title: "Terracotta Serving Set",
    category: "Handcrafted Decor",
    price: 650.0,
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "Clay dinnerware serving set consisting of 5 beautifully styled, modular designer tableware pieces built by hand.",
    location_city: "Gaborone",
    stock: 10,
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const [quantity, setQuantity] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  // Match the listing ID safely
  const itemData = useMemo(() => {
    return MARKETPLACE_DATA_MOCK.find((item) => item.id === params.id);
  }, [params.id]);

  if (!itemData) {
    return (
      <div className="py-24 text-center space-y-4 px-4">
        <h2 className="text-xl font-bold text-white">Item Not Found</h2>
        <p className="text-xs text-neutral-400">
          The product listing code requested could not be identified.
        </p>
        <Link
          href="/listings"
          className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-brand-crimson uppercase"
        >
          <ArrowLeft className="w-4 h-4" />{" "}
          <span>Back to Discover Catalog</span>
        </Link>
      </div>
    );
  }

  const handleAddToCartFlow = () => {
    // Aligned perfectly to your Zustand state types
    addItem(
      {
        id: itemData.id,
        title: itemData.title,
        price: itemData.price,
        images: itemData.images,
        location_city: itemData.location_city,
      },
      quantity,
    );

    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 2500);
  };

  const installmentCost = (itemData.price * quantity) / 3;

  return (
    <div className="py-6 max-w-5xl mx-auto px-4 space-y-6">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center space-x-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> <span>Back to Catalog</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* LEFT COMPONENT: PRODUCT IMAGE */}
        <div className="md:col-span-6 bg-neutral-950 border border-white/5 rounded-2xl overflow-hidden aspect-square relative">
          <img
            src={itemData.images[0]}
            alt={itemData.title}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 left-4 text-[10px] font-mono font-bold uppercase tracking-widest bg-black/80 text-brand-crimson border border-brand-crimson/30 px-2.5 py-1 rounded-md backdrop-blur-sm">
            {itemData.category}
          </span>
        </div>

        {/* RIGHT COMPONENT: METADATA & ACTIONS */}
        <div className="md:col-span-6 space-y-6">
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono text-neutral-400 flex items-center space-x-1.5">
              <span>Verified Hub Merchant</span>
              <span className="text-neutral-700">•</span>
              <span className="text-brand-crimson font-bold">
                {itemData.location_city}
              </span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              {itemData.title}
            </h1>
            <p className="text-xl font-mono font-black text-white pt-1">
              R {itemData.price.toFixed(2)}
            </p>
          </div>

          {/* PayJustNow Widget Simulation */}
          <div className="p-3 bg-neutral-950 border border-white/5 rounded-xl space-y-1 text-xs">
            <div className="flex items-center justify-between font-mono">
              <span className="text-neutral-400">
                Or pay 3x interest-free installments of:
              </span>
              <span className="text-emerald-400 font-bold">
                R {installmentCost.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-mono text-neutral-400 tracking-wider uppercase">
              Product Overview
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-950/40 p-4 rounded-xl border border-white/5">
              {itemData.description}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>Select Quantity</span>
              <span className="text-neutral-500">
                {itemData.stock} units left
              </span>
            </div>

            <div className="flex gap-3">
              {/* Stepper */}
              <div className="bg-black border border-white/10 rounded-xl flex items-center overflow-hidden h-12">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 text-neutral-400 hover:text-white font-mono text-sm"
                >
                  -
                </button>
                <span className="w-10 text-center font-mono text-xs font-bold text-white">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(itemData.stock, quantity + 1))
                  }
                  className="px-3 text-neutral-400 hover:text-white font-mono text-sm"
                >
                  +
                </button>
              </div>

              {/* Add to Basket Action */}
              <button
                onClick={handleAddToCartFlow}
                className="flex-grow bg-brand-crimson hover:bg-brand-crimson/90 text-white h-12 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all active:scale-[0.98]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add To Shopping Cart</span>
              </button>
            </div>

            {isSuccess && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl p-2.5 text-center text-xs flex items-center justify-center space-x-1.5 animate-fadeIn">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Item quantity added to your basket!</span>
              </div>
            )}
          </div>

          {/* Trust Footer Badges */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/5 text-[10px] text-neutral-400 text-center font-mono">
            <div className="p-2 bg-neutral-950/50 rounded-xl border border-white/5 flex flex-col items-center space-y-1">
              <ShieldCheck className="w-4 h-4 text-brand-crimson" />
              <span>Escrow Verified</span>
            </div>
            <div className="p-2 bg-neutral-950/50 rounded-xl border border-white/5 flex flex-col items-center space-y-1">
              <Truck className="w-4 h-4 text-brand-crimson" />
              <span>Regional Shipping</span>
            </div>
            <div className="p-2 bg-neutral-950/50 rounded-xl border border-white/5 flex flex-col items-center space-y-1">
              <RefreshCw className="w-4 h-4 text-brand-crimson" />
              <span>7-Day Trade Return</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
