// bundles.ts
export interface BundleService {
  name: string
  quantity: string
  price: number
}

export interface Bundle {
  id: string
  platform: string
  name: string
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Diamond'
  services: BundleService[]
  totalPrice: number
  icon: string
  popular?: boolean
  bestValue?: boolean
}

export const bundles: Bundle[] = [
  // Instagram Bundles
  {
    id: "instagram-bronze",
    platform: "Instagram",
    name: "Instagram Bronze Pack",
    tier: "Bronze",
    services: [
      { name: "likes", quantity: "1,000", price: 1.06 },
      { name: "views", quantity: "5,000", price: 0.02 },
      { name: "saves", quantity: "100", price: 0.14 },
    ],
    totalPrice: 1.22,
    icon: "/icons/instagram.jpeg",
  },
  {
    id: "instagram-silver",
    platform: "Instagram",
    name: "Instagram Silver Pack",
    tier: "Silver",
    services: [
      { name: "likes", quantity: "5,000", price: 5.28 },
      { name: "views", quantity: "25,000", price: 0.10 },
      { name: "saves", quantity: "500", price: 0.72 },
    ],
    totalPrice: 6.10,
    icon: "/icons/instagram.jpeg",
    popular: true,
  },
  {
    id: "instagram-gold",
    platform: "Instagram",
    name: "Instagram Gold Pack",
    tier: "Gold",
    services: [
      { name: "likes", quantity: "15,000", price: 15.83 },
      { name: "views", quantity: "75,000", price: 0.31 },
      { name: "saves", quantity: "1,500", price: 2.15 },
    ],
    totalPrice: 18.29,
    icon: "/icons/instagram.jpeg",
    bestValue: true,
  },
  {
    id: "instagram-diamond",
    platform: "Instagram",
    name: "Instagram Diamond Pack",
    tier: "Diamond",
    services: [
      { name: "likes", quantity: "35,000", price: 36.93 },
      { name: "views", quantity: "150,000", price: 0.62 },
      { name: "saves", quantity: "3,000", price: 2.29 },
    ],
    totalPrice: 39.84,
    icon: "/icons/instagram.jpeg",
  },

  // TikTok Bundles
  {
    id: "tiktok-bronze",
    platform: "TikTok",
    name: "TikTok Bronze Pack",
    tier: "Bronze",
    services: [
      { name: "likes", quantity: "1,000", price: 0.21 },
      { name: "views", quantity: "5,000", price: 0.19 },
      { name: "shares", quantity: "100", price: 0.02 },
      { name: "saves", quantity: "50", price: 0.002 },
    ],
    totalPrice: 0.42,
    icon: "/icons/tiktok.png",
  },
  {
    id: "tiktok-silver",
    platform: "TikTok",
    name: "TikTok Silver Pack",
    tier: "Silver",
    services: [
      { name: "likes", quantity: "10,000", price: 2.11 },
      { name: "views", quantity: "50,000", price: 1.94 },
      { name: "shares", quantity: "1,000", price: 0.23 },
      { name: "saves", quantity: "500", price: 0.02 },
    ],
    totalPrice: 4.30,
    icon: "/icons/tiktok.png",
    popular: true,
  },
  {
    id: "tiktok-gold",
    platform: "TikTok",
    name: "TikTok Gold Pack",
    tier: "Gold",
    services: [
      { name: "likes", quantity: "40,000", price: 8.44 },
      { name: "views", quantity: "200,000", price: 7.74 },
      { name: "shares", quantity: "4,000", price: 0.90 },
      { name: "saves", quantity: "2,000", price: 0.09 },
    ],
    totalPrice: 17.17,
    icon: "/icons/tiktok.png",
    bestValue: true,
  },
  {
    id: "tiktok-diamond",
    platform: "TikTok",
    name: "TikTok Diamond Pack",
    tier: "Diamond",
    services: [
      { name: "likes", quantity: "100,000", price: 21.10 },
      { name: "views", quantity: "500,000", price: 19.35 },
      { name: "shares", quantity: "8,000", price: 1.81 },
      { name: "saves", quantity: "4,000", price: 0.18 },
    ],
    totalPrice: 42.44,
    icon: "/icons/tiktok.png",
  },

  // Twitter Bundles
  {
    id: "twitter-bronze",
    platform: "Twitter",
    name: "Twitter Bronze Pack",
    tier: "Bronze",
    services: [
      { name: "likes", quantity: "500", price: 1.40 },
      { name: "views", quantity: "5,000", price: 0.17 },
      { name: "reposts", quantity: "50", price: 0.19 },
    ],
    totalPrice: 1.76,
    icon: "/icons/twitter.png",
  },
  {
    id: "twitter-silver",
    platform: "Twitter",
    name: "Twitter Silver Pack",
    tier: "Silver",
    services: [
      { name: "likes", quantity: "2,500", price: 6.98 },
      { name: "views", quantity: "25,000", price: 0.85 },
      { name: "reposts", quantity: "300", price: 1.12 },
    ],
    totalPrice: 8.95,
    icon: "/icons/twitter.png",
    popular: true,
  },
  {
    id: "twitter-gold",
    platform: "Twitter",
    name: "Twitter Gold Pack",
    tier: "Gold",
    services: [
      { name: "likes", quantity: "7,500", price: 20.95 },
      { name: "views", quantity: "75,000", price: 2.55 },
      { name: "reposts", quantity: "1,000", price: 3.72 },
    ],
    totalPrice: 27.22,
    icon: "/icons/twitter.png",
    bestValue: true,
  },
  {
    id: "twitter-diamond",
    platform: "Twitter",
    name: "Twitter Diamond Pack",
    tier: "Diamond",
    services: [
      { name: "likes", quantity: "13,000", price: 36.28 },
      { name: "views", quantity: "100,000", price: 3.40 },
      { name: "reposts", quantity: "1,500", price: 5.58 },
    ],
    totalPrice: 45.26,
    icon: "/icons/twitter.png",
  },

  // Facebook Bundles
  {
    id: "facebook-bronze",
    platform: "Facebook",
    name: "Facebook Bronze Pack",
    tier: "Bronze",
    services: [
      { name: "likes", quantity: "1,000", price: 1.21 },
      { name: "views", quantity: "5,000", price: 0.01 },
      { name: "reactions", quantity: "100", price: 0.04 },
    ],
    totalPrice: 1.26,
    icon: "/icons/facebook.png",
  },
  {
    id: "facebook-silver",
    platform: "Facebook",
    name: "Facebook Silver Pack",
    tier: "Silver",
    services: [
      { name: "likes", quantity: "5,000", price: 6.03 },
      { name: "views", quantity: "25,000", price: 0.05 },
      { name: "reactions", quantity: "500", price: 0.18 },
    ],
    totalPrice: 6.26,
    icon: "/icons/facebook.png",
    popular: true,
  },
  {
    id: "facebook-gold",
    platform: "Facebook",
    name: "Facebook Gold Pack",
    tier: "Gold",
    services: [
      { name: "likes", quantity: "15,000", price: 18.09 },
      { name: "views", quantity: "75,000", price: 0.15 },
      { name: "reactions", quantity: "1,500", price: 0.55 },
    ],
    totalPrice: 18.79,
    icon: "/icons/facebook.png",
    bestValue: true,
  },
  {
    id: "facebook-diamond",
    platform: "Facebook",
    name: "Facebook Diamond Pack",
    tier: "Diamond",
    services: [
      { name: "likes", quantity: "32,000", price: 38.60 },
      { name: "views", quantity: "150,000", price: 0.30 },
      { name: "reactions", quantity: "3,000", price: 1.10 },
    ],
    totalPrice: 40.00,
    icon: "/icons/facebook.png",
  },

  // Telegram Bundles
  {
    id: "telegram-bronze",
    platform: "Telegram",
    name: "Telegram Bronze Pack",
    tier: "Bronze",
    services: [
      { name: "members", quantity: "500", price: 1.53 },
      { name: "views", quantity: "2,500", price: 0.02 },
      { name: "reactions", quantity: "50", price: 0.005 },
    ],
    totalPrice: 1.56,
    icon: "/icons/telegram.png",
  },
  {
    id: "telegram-silver",
    platform: "Telegram",
    name: "Telegram Silver Pack",
    tier: "Silver",
    services: [
      { name: "members", quantity: "2,500", price: 7.66 },
      { name: "views", quantity: "12,500", price: 0.10 },
      { name: "reactions", quantity: "250", price: 0.02 },
    ],
    totalPrice: 7.78,
    icon: "/icons/telegram.png",
    popular: true,
  },
  {
    id: "telegram-gold",
    platform: "Telegram",
    name: "Telegram Gold Pack",
    tier: "Gold",
    services: [
      { name: "members", quantity: "7,500", price: 22.99 },
      { name: "views", quantity: "37,500", price: 0.29 },
      { name: "reactions", quantity: "750", price: 0.07 },
    ],
    totalPrice: 23.35,
    icon: "/icons/telegram.png",
    bestValue: true,
  },
  {
    id: "telegram-diamond",
    platform: "Telegram",
    name: "Telegram Diamond Pack",
    tier: "Diamond",
    services: [
      { name: "members", quantity: "12,500", price: 38.32 },
      { name: "views", quantity: "62,500", price: 0.48 },
      { name: "reactions", quantity: "1,250", price: 0.12 },
    ],
    totalPrice: 38.92,
    icon: "/icons/telegram.png",
  },

  // Reddit Bundles
  {
    id: "reddit-bronze",
    platform: "Reddit",
    name: "Reddit Bronze Pack",
    tier: "Bronze",
    services: [
      { name: "views", quantity: "2,500", price: 2.51 },
      { name: "shares", quantity: "250", price: 0.25 },
    ],
    totalPrice: 2.76,
    icon: "/icons/reddit.png",
  },
  {
    id: "reddit-silver",
    platform: "Reddit",
    name: "Reddit Silver Pack",
    tier: "Silver",
    services: [
      { name: "views", quantity: "7,500", price: 7.54 },
      { name: "shares", quantity: "750", price: 0.75 },
    ],
    totalPrice: 8.29,
    icon: "/icons/reddit.png",
    popular: true,
  },
  {
    id: "reddit-gold",
    platform: "Reddit",
    name: "Reddit Gold Pack",
    tier: "Gold",
    services: [
      { name: "views", quantity: "20,000", price: 20.10 },
      { name: "shares", quantity: "2,000", price: 2.01 },
    ],
    totalPrice: 22.11,
    icon: "/icons/reddit.png",
    bestValue: true,
  },
  {
    id: "reddit-diamond",
    platform: "Reddit",
    name: "Reddit Diamond Pack",
    tier: "Diamond",
    services: [
      { name: "views", quantity: "37,500", price: 37.69 },
      { name: "shares", quantity: "3,750", price: 3.77 },
    ],
    totalPrice: 41.46,
    icon: "/icons/reddit.png",
  },
]

// Filter bundles to only include those under or equal to 40 euros
export const affordableBundles = bundles.filter(bundle => bundle.totalPrice <= 40);

// Adjust bundles that exceed 40 euros (for display purposes)
export const adjustedBundles = bundles.map(bundle => {
  if (bundle.totalPrice > 40) {
    const scaleFactor = 40 / bundle.totalPrice;
    const adjustedServices = bundle.services.map(service => {
      const quantityNum = parseInt(service.quantity.replace(/,/g, ''));
      const adjustedQuantity = Math.round(quantityNum * scaleFactor);
      return {
        ...service,
        quantity: adjustedQuantity.toLocaleString(),
        price: service.price * scaleFactor
      };
    });
    const adjustedTotal = adjustedServices.reduce((sum, service) => sum + service.price, 0);
    return {
      ...bundle,
      services: adjustedServices,
      totalPrice: adjustedTotal
    };
  }
  return bundle;
});
