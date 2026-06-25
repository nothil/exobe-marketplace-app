"use client";
import { useState } from "react";
import {
  Store,
  Package,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  MapPin,
} from "lucide-react";

export default function VendorOnboardingPage() {
  const [step, setStep] = useState(1);

  // Registration State
  const [businessName, setBusinessName] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("Agri-Processing");

  // Listing State
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productImage, setProductImage] = useState(
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
  );

  const [isLive, setIsLive] = useState(false);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) setStep(step + 1);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLive(true);
  };

  return (
    <div className="py-8 max-w-4xl mx-auto space-y-8 px-4">
      {/* BRAND VALUE PROP HEADER */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-crimson bg-brand-crimson/5 px-2.5 py-1 rounded-full border border-brand-crimson/20">
          Merchant Hub Portal
        </span>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Scale Your Local Enterprise Across the Continent
        </h1>
        <p className="text-xs text-neutral-400 leading-relaxed">
          Join thousands of regional businesses. Register your trading identity,
          instantly launch your product storefront catalogs, and accept modern
          localized mobile installment methods securely.
        </p>
      </div>

      {/* STEPPERS GRAPHIC PROGRESSTION BAR */}
      <div className="max-w-xs mx-auto flex items-center justify-between relative px-2">
        <div
          className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono text-xs font-bold z-10 transition-all ${step >= 1 ? "bg-brand-crimson border-brand-crimson text-white" : "bg-neutral-900 border-white/10 text-neutral-500"}`}
        >
          1
        </div>
        <div
          className={`flex-grow h-0.5 mx-2 transition-all ${step >= 2 ? "bg-brand-crimson" : "bg-neutral-800"}`}
        />
        <div
          className={`w-8 h-8 rounded-full border flex items-center justify-center font-mono text-xs font-bold z-10 transition-all ${step === 2 ? "bg-brand-crimson border-brand-crimson text-white" : "bg-neutral-900 border-white/10 text-neutral-500"}`}
        >
          2
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COMPONENT: HIGH-CONVERSION MULTI-STEP WIZARD FORM */}
        <div className="lg:col-span-7 bg-neutral-950 border border-white/5 p-6 rounded-2xl">
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-5">
              <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
                <Store className="w-4 h-4 text-brand-crimson" />
                <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-white">
                  Step 1: Business Profile Credentials
                </h2>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400 uppercase">
                  Registered Trading/Business Name
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Limpopo Botanical Traders"
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-crimson"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400 uppercase">
                  Primary City Hub Location
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Polokwane, South Africa"
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-crimson"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-crimson hover:bg-brand-crimson/90 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 text-white transition-all"
              >
                <span>Continue to Item Setup</span>{" "}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleFinalSubmit} className="space-y-5">
              <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
                <Package className="w-4 h-4 text-brand-crimson" />
                <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-white">
                  Step 2: List Your Initial Product
                </h2>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400 uppercase">
                  Product Name or Service Title
                </label>
                <input
                  type="text"
                  required
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  placeholder="e.g. Premium Grade Dried Baobab Fruit Powder"
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-crimson"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-400 uppercase">
                    Base Price (ZAR)
                  </label>
                  <input
                    type="number"
                    required
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    placeholder="250"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-crimson font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-neutral-400 uppercase">
                    Market Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-crimson"
                  >
                    <option value="Agri-Processing">Agri-Processing</option>
                    <option value="Custom Textiles">Custom Textiles</option>
                    <option value="Handcrafted Decor">Handcrafted Decor</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400 uppercase">
                  Detailed Product Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={productDesc}
                  onChange={(e) => setProductDesc(e.target.value)}
                  placeholder="Describe your item processing parameters, sizing details, or minimum trade packaging standards..."
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-crimson resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-neutral-400 uppercase">
                  Product Showcase Image URL (Placeholder Auto-Filled)
                </label>
                <input
                  type="text"
                  value={productImage}
                  onChange={(e) => setProductImage(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-neutral-400 font-mono focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-crimson hover:bg-brand-crimson/90 rounded-xl text-xs font-bold uppercase tracking-wider text-white transition-all"
              >
                Deploy Storefront Live
              </button>
            </form>
          )}
        </div>

        {/* RIGHT COMPONENT: LIVE PREVIEW SIMULATOR CARD */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
          <div className="bg-neutral-950 border border-white/5 p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">
                Live Storefront Preview
              </span>
              <div className="flex items-center space-x-1">
                <div
                  className={`w-2 h-2 rounded-full ${isLive ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`}
                />
                <span className="text-[10px] font-mono text-neutral-400">
                  {isLive ? "Active Listing" : "Draft Profile"}
                </span>
              </div>
            </div>

            {/* LIVE REACTIVE ITEM PREVIEW OVERVIEW */}
            <div className="bg-black border border-white/5 rounded-xl overflow-hidden flex flex-col">
              <div className="relative aspect-video bg-neutral-900">
                <img
                  src={
                    productImage ||
                    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
                  }
                  alt="Preview asset"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4 space-y-2">
                <div>
                  <span className="text-[9px] uppercase font-mono text-brand-crimson font-bold tracking-wider">
                    {category}
                  </span>
                  <h3 className="text-sm font-bold text-white truncate">
                    {productTitle || "Untitled Premium Showcase Product"}
                  </h3>
                  <p className="text-[11px] text-neutral-400 line-clamp-2 mt-1 leading-normal">
                    {productDesc ||
                      "Fill out your item parameters on the left to see your high-conversion marketing text automatically sync up here..."}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs font-mono text-neutral-400">
                  <div className="flex items-center space-x-1 text-neutral-300">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                    <span className="truncate max-w-[120px]">
                      {city || "Hub Location"}
                    </span>
                  </div>
                  <span className="font-black text-white text-sm">
                    R {(parseFloat(productPrice) || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Merchant Brand Trust Footer Badge */}
            <div className="flex items-center space-x-2 text-[10px] text-neutral-400 bg-white/5 p-2.5 rounded-xl border border-white/5">
              <ShieldCheck className="w-4 h-4 text-brand-crimson shrink-0" />
              <span>
                Registered via{" "}
                <strong>{businessName || "Your Enterprise"}</strong> hub
                directory.
              </span>
            </div>

            {isLive && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-center text-xs text-emerald-400 flex items-center justify-center space-x-1.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  Enterprise Profile and Product initialized successfully!
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
