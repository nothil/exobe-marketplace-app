"use client";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  Smartphone,
  Store,
  TrendingUp,
} from "lucide-react";

export default function LandingPage() {
  // Hardcoded active hubs to demonstrate continental architecture intent
  const marketHubs = ["Johannesburg", "Nairobi", "Lagos", "Accra", "Cape Town"];

  return (
    <div className="space-y-24 pb-20 pt-8">
      {/* 01. HERO SECTION: Dual-Path Conversion Focus */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-neutral-900 to-brand-black border border-white/5 px-6 py-16 sm:px-12 sm:py-24 text-center">
        {/* Abstract Background Grid Glow */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-crimson/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-6">
          {/* Tagline Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-neutral-300 font-mono tracking-wider uppercase">
            <span className="flex h-2 w-2 rounded-full bg-brand-crimson animate-pulse" />
            <span>
              Built for South Africa Today. Architected for Africa Tomorrow.
            </span>
          </div>

          {/* Aggressive Clear Headline */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-white">
            Elevating African Commerce. <br />
            <span className="text-brand-crimson">Not Exploiting It.</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto font-normal leading-relaxed">
            The decentralized, high-performance marketplace platform connecting
            premium African vendors with regional and cross-border buyers.
            Completely mobile-optimized.
          </p>

          {/* Dual Action CTAs */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/onboarding"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-crimson hover:bg-brand-crimson/90 font-bold text-white flex items-center justify-center space-x-2 transition-all shadow-lg shadow-brand-crimson/20 active:scale-98"
            >
              <Store className="w-5 h-5" />
              <span>Register as a Vendor</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/listings"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-neutral-900 border border-white/10 hover:border-white/20 font-bold text-white flex items-center justify-center space-x-2 transition-all active:scale-98"
            >
              <span>Explore Marketplace</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 02. CONTINENTAL HUB RUNWAY: Architectural Intent Indicator */}
      <section className="border-y border-white/5 py-6 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest flex items-center space-x-2 shrink-0">
            <Globe className="w-4 h-4 text-brand-crimson animate-spin-slow" />
            <span>Active Operational Hubs:</span>
          </div>
          <div className="flex items-center space-x-8 md:space-x-12 overflow-x-auto no-scrollbar py-2 w-full justify-start md:justify-end">
            {marketHubs.map((hub) => (
              <span
                key={hub}
                className="text-sm font-semibold tracking-wide text-neutral-400 shrink-0"
              >
                {hub}{" "}
                <span className="text-brand-crimson font-mono ml-2">//</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 03. CORE VALUE PROPOSITIONS: Designed for Local Context */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-black tracking-tight text-white">
            Why Visionary Entrepreneurs Choose eXobe
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-sm">
            We removed the traditional structural friction patterns keeping
            African enterprises disconnected.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Mobile First */}
          <div className="p-8 rounded-2xl bg-neutral-950 border border-white/5 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brand-crimson/10 border border-brand-crimson/20 flex items-center justify-center text-brand-crimson">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Mobile-Optimized Engine
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Engineered exclusively for lower bandwidth speeds and high-density
              mobile usage. Built as a native Progressive Web Application (PWA).
            </p>
          </div>

          {/* Card 2: Frictionless RFQ & WhatsApp Flows */}
          <div className="p-8 rounded-2xl bg-neutral-950 border border-white/5 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brand-crimson/10 border border-brand-crimson/20 flex items-center justify-center text-brand-crimson">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">
              High-Intent Engagements
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              No generic add-to-cart disconnects. Trade shifts straight to
              direct custom RFQs or instant WhatsApp negotiation queues matching
              authentic regional enterprise habits.
            </p>
          </div>

          {/* Card 3: The Trust Layer */}
          <div className="p-8 rounded-2xl bg-neutral-950 border border-white/5 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brand-crimson/10 border border-brand-crimson/20 flex items-center justify-center text-brand-crimson">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Ubuntu Verification Layer
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Gain explicit marketplace visibility through structural profile
              identity verification verification badges designed to scale
              transaction trust effortlessly.
            </p>
          </div>
        </div>
      </section>

      {/* 04. SCORESHEET EDGE: Marketplace Platform Teaser */}
      <section className="rounded-2xl bg-neutral-950 border border-white/5 p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-8 justify-between">
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-brand-crimson tracking-wider bg-brand-crimson/5 border border-brand-crimson/20 px-2.5 py-1 rounded">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Category Intelligence Embedded</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Track business velocity anywhere.
          </h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Get access to predictive inventory intelligence indicators that
            surface which product categories are underserved or spiking in
            demand directly across specific metropolitan regions.
          </p>
        </div>

        {/* Mock Minimalist Dashboard Graph Visualizer for UI Polish */}
        <div className="w-full lg:w-80 bg-brand-black border border-white/10 rounded-xl p-5 space-y-4 shrink-0 font-mono text-xs">
          <div className="flex items-center justify-between text-neutral-400 border-b border-white/5 pb-2">
            <span>Live Regional Demand</span>
            <span className="text-brand-crimson animate-pulse">● Live</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-neutral-300">Agri-Processing</span>
                <span className="text-emerald-400">+84%</span>
              </div>
              <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                <div className="bg-brand-crimson h-full w-[84%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-neutral-300">Custom Textiles</span>
                <span className="text-emerald-400">+61%</span>
              </div>
              <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                <div className="bg-brand-crimson h-full w-[61%]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
