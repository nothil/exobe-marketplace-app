"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  ShieldCheck,
  MapPin,
  ArrowUpRight,
  Camera,
  Sparkles,
  X,
  ShoppingCart,
  CheckCircle2,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

const MOCK_LISTINGS = [
  {
    id: "lst_1",
    title: "Organic Dried Rooibos Tea",
    description: "Premium export grade herbal tea from the Western Cape.",
    price: 145.0,
    currency: "ZAR",
    category: "Agri-Processing",
    location_city: "Clanwilliam",
    location_country: "South Africa",
    business_name: "Cederberg Botanicals",
    is_verified: true,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "lst_2",
    title: "Hand-Woven Sisal Tote Bag",
    description: "Durable everyday market tote bag with leather straps.",
    price: 380.0,
    currency: "ZAR",
    category: "Custom Textiles",
    location_city: "Johannesburg",
    location_country: "South Africa",
    business_name: "Limpopo Craft Guild",
    is_verified: true,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "lst_3",
    title: "Raw Wildflower Honey",
    description: "Pure, unpasteurized bushveld honey.",
    price: 220.0,
    currency: "ZAR",
    category: "Agri-Processing",
    location_city: "Nelspruit",
    location_country: "South Africa",
    business_name: "Madiba Ridge Apiaries",
    is_verified: false,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "lst_4",
    title: "Terracotta Serving Set",
    description: "Clay dinnerware set consisting of 5 designer modular pieces.",
    price: 650.0,
    currency: "ZAR",
    category: "Handcrafted Decor",
    location_city: "Gaborone",
    location_country: "Botswana",
    business_name: "Kalahari Earthworks",
    is_verified: true,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80",
  },
];

export default function ListingsHub() {
  const addItem = useCartStore((state) => state.addItem);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showVisualSearch, setShowVisualSearch] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Quick action shortcut command function
  const handleQuickAdd = (
    e: React.MouseEvent,
    listing: (typeof MOCK_LISTINGS)[0],
  ) => {
    // Crucial step: Prevent parent card click event routing from triggering detail page redirects!
    e.preventDefault();
    e.stopPropagation();

    addItem(
      {
        id: listing.id,
        title: listing.title,
        price: listing.price,
        images: [listing.image],
        location_city: listing.location_city,
        business_name: listing.business_name,
      },
      1,
    );

    setToastMessage(`"${listing.title}" added to cart!`);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const triggerVisualSearch = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setSearchQuery("Tote Bag");
      setShowVisualSearch(false);
    }, 2000);
  };

  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="py-8 space-y-8 relative">
      {/* FLOATING SUCCESS CONFIRMATION NOTIFICATION CONTAINER */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 border border-brand-crimson/30 px-4 py-3 rounded-xl shadow-2xl shadow-brand-crimson/5 flex items-center space-x-2 animate-fadeIn max-w-xs sm:max-w-md text-center">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs text-white font-medium truncate">
            {toastMessage}
          </span>
        </div>
      )}

      {/* HEADER WITH VISUAL SEARCH TRIGGER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">
            Market Discovery Hub
          </h1>
          <p className="text-neutral-400 text-sm">
            Shop premium items from validated local businesses.
          </p>
        </div>

        <div className="relative w-full md:w-96 flex items-center gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-950 border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-white focus:outline-none focus:border-brand-crimson"
            />
            <button
              onClick={() => setShowVisualSearch(true)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-brand-crimson transition-colors"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* AI VISUAL SEARCH OVERLAY */}
      {showVisualSearch && (
        <div className="fixed inset-0 z-50 bg-brand-black/90 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-neutral-950 border border-white/10 p-6 rounded-2xl max-w-md w-full text-center space-y-4 relative">
            <button
              onClick={() => setShowVisualSearch(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 rounded-full bg-brand-crimson/10 border border-brand-crimson/30 flex items-center justify-center text-brand-crimson mx-auto">
              <Camera className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold">AI Visual Lens Search</h3>
            <div
              className="border border-dashed border-white/10 p-8 rounded-xl bg-brand-black cursor-pointer"
              onClick={triggerVisualSearch}
            >
              {scanning ? (
                <p className="text-xs text-brand-crimson font-mono animate-pulse">
                  Analyzing textures...
                </p>
              ) : (
                <p className="text-xs text-neutral-400">
                  Click to run a{" "}
                  <span className="text-brand-crimson font-bold underline">
                    Simulate Upload Scan
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* RENDER PRODUCTS CATALOG GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredListings.map((listing) => (
          <div
            key={listing.id}
            className="bg-neutral-950 border border-white/5 rounded-2xl overflow-hidden flex flex-col h-full group relative"
          >
            {/* Visual Thumbnail Frame */}
            <div className="relative aspect-square bg-neutral-900 overflow-hidden">
              <img
                src={listing.image}
                alt={listing.title}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-102"
              />

              {/* THE SHORCUT QUICK-ADD ICON CONTAINER */}
              <button
                onClick={(e) => handleQuickAdd(e, listing)}
                className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-neutral-950/90 backdrop-blur-md border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-brand-crimson hover:border-brand-crimson transition-all active:scale-90 shadow-xl"
                title="Quick Add 1 Unit to Basket"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>

            {/* Product Metadata Info Body */}
            <div className="p-4 flex flex-col flex-grow space-y-2 justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">
                  {listing.category}
                </span>
                <h3 className="text-sm font-bold text-white line-clamp-1">
                  {listing.title}
                </h3>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="font-mono text-sm font-black">
                  R {listing.price.toFixed(2)}
                </span>
                <Link
                  href={`/listings/${listing.id}`}
                  className="bg-white/5 hover:bg-brand-crimson border border-white/10 hover:border-brand-crimson text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all"
                >
                  <span>View</span> <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
