"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import {
  SlidersHorizontal,
  MapPin,
  Layers,
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  CornerDownLeft,
} from "lucide-react";

import {
  SLIDESHOW_DATA,
  MARKETPLACE_DATA_MOCK,
  CATEGORIES,
} from "@/data/marketplaceData";

export default function DiscoverCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Auto-slide effect engine
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDESHOW_DATA.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, []);

  // Click outside listener to dismiss search suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDESHOW_DATA.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + SLIDESHOW_DATA.length) % SLIDESHOW_DATA.length,
    );
  };

  // Multi-field intelligent processing filter pipeline
  const filteredListings = useMemo(() => {
    return MARKETPLACE_DATA_MOCK.filter((item) => {
      const matchesCategory =
        selectedCategory === "All Items" || item.category === selectedCategory;

      const cleaningQuery = searchQuery.toLowerCase().trim();
      if (!cleaningQuery) return matchesCategory;

      const matchesTitle = item.title.toLowerCase().includes(cleaningQuery);
      const matchesDescription = item.description
        .toLowerCase()
        .includes(cleaningQuery);
      const matchesCity = item.location_city
        .toLowerCase()
        .includes(cleaningQuery);
      const matchesItemCategory = item.category
        .toLowerCase()
        .includes(cleaningQuery);

      return (
        matchesCategory &&
        (matchesTitle ||
          matchesDescription ||
          matchesCity ||
          matchesItemCategory)
      );
    });
  }, [selectedCategory, searchQuery]);

  // Instant suggestion predictive generator
  const liveSmartSuggestions = useMemo(() => {
    const cleanQuery = searchQuery.toLowerCase().trim();
    if (cleanQuery.length < 1) return [];

    return MARKETPLACE_DATA_MOCK.filter(
      (item) =>
        item.title.toLowerCase().includes(cleanQuery) ||
        item.category.toLowerCase().includes(cleanQuery),
    ).slice(0, 5);
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* GLOBAL CONTROLS HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200 mb-8">
        <div>
          <h1 className="text-2xl font-black text-neutral-900 tracking-tight">
            Discover Hub
          </h1>
          <p className="text-xs text-neutral-500 font-mono">
            Exploring {filteredListings.length} verified listings live
          </p>
        </div>

        {/* SMART SEARCH COMPONENT */}
        <div ref={searchContainerRef} className="relative w-full md:w-80 z-30">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search title, details, location..."
              value={searchQuery}
              onFocus={() => setShowSuggestions(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              className="w-full bg-neutral-950 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand-crimson transition-colors shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* FLOATING SUGGESTIONS PANEL */}
          {showSuggestions && liveSmartSuggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-1.5 bg-neutral-950 border border-white/10 rounded-xl shadow-2xl overflow-hidden divide-y divide-white/5">
              <div className="px-3.5 py-1.5 bg-neutral-900/50 text-[10px] font-mono font-bold uppercase tracking-wider text-brand-crimson flex items-center justify-between">
                <span>Predictive Hits</span>
                <span className="opacity-60 text-[9px] font-normal lowercase">
                  click to isolate
                </span>
              </div>
              {liveSmartSuggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => {
                    setSearchQuery(suggestion.title);
                    setShowSuggestions(false);
                  }}
                  className="w-full text-left px-3.5 py-2.5 hover:bg-white/5 flex items-center justify-between gap-3 text-xs transition-colors group"
                >
                  <div className="truncate space-y-0.5">
                    <p className="text-white font-bold truncate group-hover:text-brand-crimson transition-colors">
                      {suggestion.title}
                    </p>
                    <p className="text-[10px] font-mono text-neutral-500">
                      {suggestion.category} • {suggestion.location_city}
                    </p>
                  </div>
                  <CornerDownLeft className="w-3 h-3 text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MASTER COLUMNS MATRIX ENGINE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT SIDEBAR: CATEGORIES */}
        <div className="lg:col-span-3 bg-neutral-950 border border-white/5 rounded-2xl p-5 space-y-4 lg:sticky lg:top-24 shadow-2xl">
          <div className="flex items-center space-x-2 text-white pb-2 border-b border-white/5">
            <SlidersHorizontal className="w-4 h-4 text-brand-crimson" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider">
              Categories
            </h2>
          </div>

          <div className="space-y-1 max-h-[55vh] overflow-y-auto pr-1 scrollbar-thin">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-brand-crimson text-white font-bold scale-[1.01]"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{category}</span>
                <Layers
                  className={`w-3.5 h-3.5 opacity-60 ${selectedCategory === category ? "block" : "hidden"}`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT WORKSPACE */}
        <div className="lg:col-span-9 space-y-8">
          {/* ADJUSTABLE PROMOTIONAL SLIDESHOW */}
          <div className="relative w-full h-[320px] bg-neutral-950 rounded-2xl overflow-hidden border border-white/10 shadow-xl group/slide">
            <div className="absolute inset-0 w-full h-full">
              <img
                src={SLIDESHOW_DATA[currentSlide].image}
                alt={SLIDESHOW_DATA[currentSlide].title}
                className="w-full h-full object-cover transition-all duration-700 ease-in-out filter brightness-35"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent md:bg-gradient-to-r md:from-black md:via-black/60 md:to-transparent" />
            </div>

            <div className="absolute inset-0 p-6 sm:p-8 md:p-10 flex flex-col justify-end md:justify-center items-start max-w-xl space-y-3 z-10">
              <span className="text-[9px] font-mono font-black tracking-widest text-brand-crimson uppercase bg-brand-crimson/10 border border-brand-crimson/30 px-2 py-0.5 rounded">
                {SLIDESHOW_DATA[currentSlide].subtitle}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
                {SLIDESHOW_DATA[currentSlide].title}
              </h2>
              <p className="text-xs text-neutral-300 leading-relaxed max-w-md">
                {SLIDESHOW_DATA[currentSlide].description}
              </p>

              <button
                onClick={() =>
                  setSelectedCategory(SLIDESHOW_DATA[currentSlide].categoryLink)
                }
                className="inline-flex items-center space-x-1.5 bg-brand-crimson hover:bg-brand-crimson/90 text-white font-bold text-[11px] uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all active:scale-98 shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{SLIDESHOW_DATA[currentSlide].cta}</span>
              </button>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-black/60 border border-white/10 text-neutral-400 hover:text-white opacity-0 group-hover/slide:opacity-100 transition-opacity z-20"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-black/60 border border-white/10 text-neutral-400 hover:text-white opacity-0 group-hover/slide:opacity-100 transition-opacity z-20"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <div className="absolute bottom-4 right-4 flex items-center space-x-1 z-20">
              {SLIDESHOW_DATA.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${index === currentSlide ? "bg-brand-crimson w-4" : "bg-white/30"}`}
                />
              ))}
            </div>
          </div>

          {/* DYNAMIC PRODUCT CARDS GRID */}
          <div>
            {filteredListings.length === 0 ? (
              <div className="text-center py-20 bg-neutral-950 rounded-2xl border border-white/5 font-mono text-xs text-neutral-400 shadow-md">
                No product listings live matching the selection criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredListings.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-neutral-950 border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-white/10 transition-all shadow-lg"
                  >
                    <div className="aspect-square bg-neutral-900 relative overflow-hidden">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 text-[9px] font-mono font-bold bg-black/80 text-brand-crimson px-2 py-0.5 rounded border border-white/5 tracking-wider uppercase">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1 text-[10px] text-neutral-500 font-mono">
                          <MapPin className="w-3 h-3 text-brand-crimson" />
                          <span>{item.location_city}</span>
                        </div>
                        <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-brand-crimson transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-sm font-mono font-black text-white">
                          R {item.price.toFixed(2)}
                        </span>
                        <Link
                          href={`/listings/${item.id}`}
                          className="bg-neutral-900 border border-white/10 text-white hover:bg-white hover:text-black px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
