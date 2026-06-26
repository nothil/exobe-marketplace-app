"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Store,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { SLIDESHOW_DATA, CATEGORIES } from "@/data/marketplaceData";

export default function RootLandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Synchronized automatic promotional rotator loop engine
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDESHOW_DATA.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDESHOW_DATA.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + SLIDESHOW_DATA.length) % SLIDESHOW_DATA.length,
    );
  };

  return (
    <div className="py-8 space-y-12">
      {/* 1. THE HERO INTEGRATED SLIDESHOW ENGINE */}
      <div className="relative w-full h-[400px] bg-neutral-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl group/slide">
        <div className="absolute inset-0 w-full h-full">
          <img
            src={SLIDESHOW_DATA[currentSlide].image}
            alt={SLIDESHOW_DATA[currentSlide].title}
            className="w-full h-full object-cover transition-all duration-700 ease-in-out filter brightness-35 scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent md:bg-gradient-to-r md:from-black md:via-black/60 md:to-transparent" />
        </div>

        <div className="absolute inset-0 p-6 sm:p-10 md:p-16 flex flex-col justify-end md:justify-center items-start max-w-2xl space-y-4 z-10">
          <span className="text-[10px] font-mono font-black tracking-widest text-brand-crimson uppercase bg-brand-crimson/10 border border-brand-crimson/30 px-3 py-1 rounded">
            {SLIDESHOW_DATA[currentSlide].subtitle}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            {SLIDESHOW_DATA[currentSlide].title}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-md">
            {SLIDESHOW_DATA[currentSlide].description}
          </p>

          <Link
            href="/listings"
            className="inline-flex items-center space-x-2 bg-brand-crimson hover:bg-brand-crimson/90 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all active:scale-98 shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{SLIDESHOW_DATA[currentSlide].cta}</span>
          </Link>
        </div>

        {/* Manual Left/Right Triggers */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-black/60 border border-white/10 text-neutral-400 hover:text-white opacity-0 group-hover/slide:opacity-100 transition-opacity z-20"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-black/60 border border-white/10 text-neutral-400 hover:text-white opacity-0 group-hover/slide:opacity-100 transition-opacity z-20"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Slide Indicator Dots Track */}
        <div className="absolute bottom-6 right-6 flex items-center space-x-1.5 z-20">
          {SLIDESHOW_DATA.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === currentSlide ? "bg-brand-crimson w-5" : "bg-white/20"}`}
            />
          ))}
        </div>
      </div>

      {/* 2. VALUE PROPOSITION FEATURE LAYERS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-neutral-950 border border-white/5 rounded-2xl space-y-2">
          <Store className="w-5 h-5 text-brand-crimson" />
          <h3 className="text-xs font-mono font-bold uppercase text-white tracking-wide">
            Direct Sourcing
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Connect directly with certified pan-African enterprises and local
            suppliers without intermediaries.
          </p>
        </div>
        <div className="p-5 bg-neutral-950 border border-white/5 rounded-2xl space-y-2">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <h3 className="text-xs font-mono font-bold uppercase text-white tracking-wide">
            Escrow Protection
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Transactions are fully verified, secured, and held until the raw
            assets safely reach their port destination.
          </p>
        </div>
        <div className="p-5 bg-neutral-950 border border-white/5 rounded-2xl space-y-2">
          <Globe className="w-5 h-5 text-blue-500" />
          <h3 className="text-xs font-mono font-bold uppercase text-white tracking-wide">
            Cross-Border Rails
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Seamlessly checkout using integrated multi-currency systems mapping
            major African trading hubs.
          </p>
        </div>
      </div>

      {/* 3. QUICK DISCOVERY CATEGORIES PORT */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-white tracking-tight">
              Browse by Category
            </h2>
            <p className="text-[11px] font-mono text-neutral-500">
              Explore structured trade inventory networks
            </p>
          </div>
          <Link
            href="/listings"
            className="inline-flex items-center space-x-1 text-xs font-mono text-neutral-400 hover:text-white transition-colors group"
          >
            <span>Open Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIES.filter((cat) => cat !== "All Items")
            .slice(0, 4)
            .map((category) => (
              <Link
                key={category}
                href="/listings"
                className="p-5 bg-neutral-950 border border-white/5 rounded-2xl flex flex-col justify-between items-start hover:border-white/10 transition-all group"
              >
                <span className="text-xs font-bold text-white group-hover:text-brand-crimson transition-colors">
                  {category}
                </span>
                <span className="text-[10px] font-mono text-neutral-500 mt-4 inline-flex items-center space-x-1">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-4px] group-hover:translate-x-0" />
                </span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
