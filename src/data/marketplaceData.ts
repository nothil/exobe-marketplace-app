// Define clean TypeScript interfaces for strict type safety
export interface SlideItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  categoryLink: string;
}

export interface MarketplaceItem {
  id: string;
  title: string;
  category: string;
  price: number;
  images: string[];
  description: string;
  location_city: string;
}

// 1. Interactive Slideshow Promotional Data Array
export const SLIDESHOW_DATA: SlideItem[] = [
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

// 2. Marketplace Products Data Array
export const MARKETPLACE_DATA_MOCK: MarketplaceItem[] = [
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

// 3. Persistent Navigation Categories Array
export const CATEGORIES: string[] = [
  "All Items",
  "Agri-Processing",
  "Appliances",
  "Baby",
  "Books",
  "Custom Textiles",
  "Fashion",
  "Handcrafted Decor",
];
