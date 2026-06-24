import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Listing {
  id: string;
  title: string;
  price: number;
  images: string[];
  location_city: string;
  business_name?: string;
}

interface CartItem {
  listing: Listing;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (listing: Listing, quantity: number) => void;
  removeItem: (listingId: string) => void;
  updateQuantity: (listingId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (listing, quantity) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.listing.id === listing.id,
        );

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.listing.id === listing.id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            ),
          });
        } else {
          set({ items: [...currentItems, { listing, quantity }] });
        }
      },

      removeItem: (listingId) => {
        set({
          items: get().items.filter((item) => item.listing.id !== listingId),
        });
      },

      updateQuantity: (listingId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(listingId);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.listing.id === listingId ? { ...item, quantity } : item,
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.listing.price * item.quantity,
          0,
        ),
    }),
    { name: "exobe-retail-cart" },
  ),
);
