"use client";
import { Package, Clock, CheckCircle2, ArrowUpRight } from "lucide-react";

// Historical mock datasets simulation matching checkout tracking expectations
const MOCK_ORDERS = [
  {
    orderId: "EXB-89721-ZA",
    date: "22 June 2026",
    status: "In Transit",
    totalPrice: 525.0,
    items: [
      { title: "Organic Dried Rooibos Tea", quantity: 1, price: 145.0 },
      { title: "Hand-Woven Sisal Tote Bag", quantity: 1, price: 380.0 },
    ],
  },
  {
    orderId: "EXB-74109-ZA",
    date: "14 May 2026",
    status: "Delivered",
    totalPrice: 220.0,
    items: [{ title: "Raw Wildflower Honey", quantity: 1, price: 220.0 }],
  },
];

export default function MyOrdersPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          Order Procurement History
        </h1>
        <p className="text-xs text-neutral-400 font-mono">
          Monitor and view delivery track structures from escrow nodes
        </p>
      </div>

      <div className="space-y-4">
        {MOCK_ORDERS.map((order) => (
          <div
            key={order.orderId}
            className="bg-neutral-950 border border-white/5 rounded-2xl overflow-hidden"
          >
            {/* Top Info Strip */}
            <div className="p-4 bg-neutral-900/50 border-b border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-neutral-500 text-[10px] uppercase">
                    Reference ID
                  </p>
                  <p className="text-white font-bold">{order.orderId}</p>
                </div>
                <div>
                  <p className="text-neutral-500 text-[10px] uppercase">
                    Date Issued
                  </p>
                  <p className="text-neutral-300">{order.date}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span
                  className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border flex items-center space-x-1.5 ${
                    order.status === "In Transit"
                      ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                      : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  }`}
                >
                  {order.status === "In Transit" ? (
                    <Clock className="w-3 h-3" />
                  ) : (
                    <CheckCircle2 className="w-3 h-3" />
                  )}
                  <span>{order.status}</span>
                </span>
              </div>
            </div>

            {/* Inner Products Listing Rows */}
            <div className="p-4 divide-y divide-white/5">
              {order.items.map((product, index) => (
                <div
                  key={index}
                  className="py-3 first:pt-0 last:pb-0 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <p className="text-white font-bold">{product.title}</p>
                    <p className="text-neutral-400 text-[11px] font-mono">
                      Qty: {product.quantity}
                    </p>
                  </div>
                  <span className="font-mono text-neutral-300">
                    R {product.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Total Settlement Segment */}
            <div className="p-4 bg-neutral-900/20 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-neutral-400 font-mono">
                Total Paid Settled
              </span>
              <span className="text-sm font-mono font-black text-white">
                R {order.totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
