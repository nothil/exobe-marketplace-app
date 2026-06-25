"use client";
import { useState, useMemo, useEffect } from "react";
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
} from "lucide-react";

const SLIDESHOW_DATA = [
  {
    id: "slide_1",
    title: "Premium Regional Agri-Processing",
    subtitle: "DIRECT FROM SOURCE ENTERPRISES",
    description:
      "Source 100% certified raw ingredients, organic components, and wholesale foods safely.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    cta: "Explore Agriculture",
    categoryLink: "Agri-Processing",
  },
  {
    id: "slide_2",
    title: "Next-Gen Tech & Appliances",
    subtitle: "POWERING MODERN WORKSPACES",
    description:
      "Upgrade your commercial workflows with high-efficiency programmable equipment and appliances.",
    image:
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=1200&q=80",
    cta: "Browse Appliances",
    categoryLink: "Appliances",
  },
  {
    id: "slide_3",
    title: "Authentic Design & Custom Fashion",
    subtitle: "CRAFTED PIECES WITH CONTINENTAL FLAIR",
    description:
      "Stand out with beautifully woven sisal market totes and high-density designer textiles.",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
    cta: "View Fashion Items",
    categoryLink: "Fashion",
  },
];

const MARKETPLACE_DATA_MOCK = [
  {
    id: "lst_1",
    title: "Organic Dried Rooibos Tea",
    category: "Agri-Processing",
    price: 145.0,
    images: [
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80",
    ],
    description: "Premium export grade herbal tea from the Western Cape.",
    location_city: "Clanwilliam",
  },
  {
    id: "lst_2",
    title: "Hand-Woven Sisal Tote Bag",
    category: "Fashion",
    price: 380.0,
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "Durable everyday market tote bag featuring premium hand-woven sisal.",
    location_city: "Johannesburg",
  },
  {
    id: "lst_3",
    title: "7-in-1 Smart Programmable Pressure Cooker",
    category: "Appliances",
    price: 1899.0,
    images: [
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "High-efficiency 6L electric pressure cooker, perfect for modern fast-paced catering workloads.",
    location_city: "Durban",
  },
  {
    id: "lst_4",
    title: "Ergonomic Multi-Position Baby Carrier",
    category: "Baby",
    price: 750.0,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "Breathable, premium cotton carrier designed for ultimate spinal support and secure infant transport.",
    location_city: "Pretoria",
  },
  {
    id: "lst_5",
    title: "Long Walk to Freedom (Hardcover Edition)",
    category: "Books",
    price: 290.0,
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "The inspiring autobiography of Nelson Mandela, profiling an unforgettable journey of resilience and liberation.",
    location_city: "Cape Town",
  },
  {
    id: "lst_6",
    title: "Raw Wildflower Honey",
    category: "Agri-Processing",
    price: 220.0,
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    ],
    description: "Pure, unpasteurized bushveld honey harvested sustainably.",
    location_city: "Nelspruit",
  },
  {
    id: "lst_7",
    title: "Terracotta Serving Set",
    category: "Handcrafted Decor",
    price: 650.0,
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "Clay dinnerware serving set consisting of 5 beautifully styled pieces.",
    location_city: "Gaborone",
  },
];

const CATEGORIES = [
  "All Items",
  "Agri-Processing",
  "Appliances",
  "Baby",
  "Books",
  "Custom Textiles",
  "Fashion",
  "Handcrafted Decor",
];

export default function DiscoverCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const filteredListings = useMemo(() => {
    return MARKETPLACE_DATA_MOCK.filter((item) => {
      const matchesCategory =
        selectedCategory === "All Items" || item.category === selectedCategory;
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* GLOBAL CONTROLS HEADER BAR (Always Sticks Perfectly on Top) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200 mb-8">
        <div>
          <h1 className="text-2xl font-black text-neutral-900 tracking-tight">
            Discover Hub
          </h1>
          <p className="text-xs text-neutral-500 font-mono">
            Exploring {filteredListings.length} verified listings live
          </p>
        </div>

        {/* Persistent High-Visibility Search Panel */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products, brands, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-950 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-brand-crimson transition-colors shadow-lg"
          />
        </div>
      </div>

      {/* MASTER COLUMNS MATRIX ENGINE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COMPONENT: CATEGORIES SIDEBAR (Locked to the side) */}
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

        {/* RIGHT AREA PANEL: FLEXIBLE COMPRESSED RUNWAY CONTAINER */}
        <div className="lg:col-span-9 space-y-8">
          {/* THE ADJUSTED ADJUSTABLE PROMOTIONAL SLIDESHOW */}
          <div className="relative w-full h-[320px] bg-neutral-950 rounded-2xl overflow-hidden border border-white/10 shadow-xl group/slide">
            {/* Active Graphic Image Asset Background Layer */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={SLIDESHOW_DATA[currentSlide].image}
                alt={SLIDESHOW_DATA[currentSlide].title}
                className="w-full h-full object-cover transition-all duration-700 ease-in-out filter brightness-35"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent md:bg-gradient-to-r md:from-black md:via-black/60 md:to-transparent" />
            </div>

            {/* Inner Interactive Text Content Overlays */}
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

            {/* Pagination Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-black/60 border border-white/10 text-neutral-400 hover:text-white opacity-0 group-hover/slide:opacity-100 transition-opacity z-20"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-black/60 border border-white/10 text-neutral-400 hover:text-white opacity-0 group-hover/slide:opacity-100 transition-opacity z-20"
              aria-label="Next slide"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <div className="absolute bottom-4 right-4 flex items-center space-x-1 z-20">
              {SLIDESHOW_DATA.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${index === currentSlide ? "bg-brand-crimson w-4" : "bg-white/30"}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* DYNAMIC LISTINGS PRODUCT CARDS GRID */}
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
