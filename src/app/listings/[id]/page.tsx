"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Zap, CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

const MOCK_DATABASE = {
  lst_1: {
    title: "Organic Dried Rooibos Tea",
    price: 145.0,
    category: "Agri-Processing",
    location_city: "Clanwilliam",
    business_name: "Cederberg Botanicals",
    image:
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=800&q=80",
    description: "Premium export grade herbal tea from the Western Cape.",
  },
  lst_2: {
    title: "Hand-Woven Sisal Tote Bag",
    price: 380.0,
    category: "Custom Textiles",
    location_city: "Johannesburg",
    business_name: "Limpopo Craft Guild",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    description: "Durable everyday market tote bag with leather straps.",
  },
  lst_3: {
    title: "Raw Wildflower Honey",
    price: 220.0,
    category: "Agri-Processing",
    location_city: "Nelspruit",
    business_name: "Madiba Ridge Apiaries",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
    description: "Pure, unpasteurized bushveld honey.",
  },
  lst_4: {
    title: "Terracotta Serving Set",
    price: 650.0,
    category: "Handcrafted Decor",
    location_city: "Gaborone",
    business_name: "Kalahari Earthworks",
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
    description: "Clay dinnerware set consisting of 5 designer modular pieces.",
  },
};

export default function ListingDetailView() {
  const params = useParams();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState("");

  const currentId = params.id as keyof typeof MOCK_DATABASE;
  const product = MOCK_DATABASE[currentId];

  if (!product)
    return (
      <div className="p-8 text-center text-neutral-400">Listing not found.</div>
    );

  // PayJustNow calculation (3 equal monthly installments, interest-free)
  const payJustNowInstallment = ((product.price * quantity) / 3).toFixed(2);

  const handleAddToCart = () => {
    addItem(
      {
        id: currentId,
        title: product.title,
        price: product.price,
        images: [product.image],
        location_city: product.location_city,
        business_name: product.business_name,
      },
      quantity,
    );

    setFeedback("Added to shopping cart!");
    setTimeout(() => setFeedback(""), 2000);
  };

  const handleInstantPurchase = () => {
    // Add item then bypass directly to checkout route
    addItem(
      {
        id: currentId,
        title: product.title,
        price: product.price,
        images: [product.image],
        location_city: product.location_city,
      },
      quantity,
    );
    router.push("/cart");
  };

  return (
    <div className="py-8 space-y-6 max-w-5xl mx-auto">
      <Link
        href="/listings"
        className="inline-flex items-center space-x-2 text-xs text-neutral-400 hover:text-white"
      >
        <ArrowLeft className="w-4 h-4" /> <span>Back to products</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="rounded-2xl overflow-hidden border border-white/5 aspect-square bg-neutral-900">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6 bg-neutral-950 border border-white/5 p-6 rounded-2xl">
          <div>
            <span className="text-xs text-brand-crimson font-mono tracking-wider">
              {product.category}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {product.title}
            </h1>
            <p className="text-neutral-400 text-sm mt-2">
              {product.description}
            </p>
          </div>

          <div className="border-t border-white/5 pt-4 space-y-1">
            <div className="text-2xl font-black text-white">
              R {(product.price * quantity).toFixed(2)}
            </div>

            {/* PayJustNow Widget integration footprint */}
            <div className="bg-neutral-900 border border-neutral-800 p-2.5 rounded-lg flex items-center justify-between text-[11px]">
              <div>
                <span className="text-neutral-400">
                  Or 3 x interest-free payments of{" "}
                </span>
                <span className="font-bold text-white">
                  R {payJustNowInstallment}
                </span>
              </div>
              <span className="text-sky-400 font-black tracking-tighter uppercase text-xs">
                PayJustNow
              </span>
            </div>
          </div>

          {/* QUANTITY CONTROL */}
          <div className="flex items-center space-x-4">
            <span className="text-xs font-mono text-neutral-400 uppercase">
              Quantity:
            </span>
            <div className="flex items-center border border-white/10 rounded-lg overflow-hidden bg-brand-black">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-white hover:bg-white/5"
              >
                -
              </button>
              <span className="px-3 text-sm font-mono font-bold text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-white hover:bg-white/5"
              >
                +
              </button>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 text-white"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add To Cart</span>
            </button>

            <button
              onClick={handleInstantPurchase}
              className="w-full py-3 bg-brand-crimson hover:bg-brand-crimson/90 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 text-white shadow-lg shadow-brand-crimson/10"
            >
              <Zap className="w-4 h-4" />
              <span>Instant Purchase (Buy Now)</span>
            </button>
          </div>

          {feedback && (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2.5 text-center text-xs text-emerald-400 flex items-center justify-center space-x-1 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" /> <span>{feedback}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
