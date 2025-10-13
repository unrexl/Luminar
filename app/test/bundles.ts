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
      { name: "views", quantity: "5,000", price: 0.04 },
      { name: "shares", quantity: "100", price: 0.23 },
      { name: "saves", quantity: "50", price: 0.05 },
    ],
    totalPrice: 0.53,
    icon: "/icons/tiktok.png",
  },
  {
    id: "tiktok-silver",
    platform: "TikTok",
    name: "TikTok Silver Pack",
    tier: "Silver",
    services: [
      { name: "likes", quantity: "5,000", price: 1.05 },
      { name: "views", quantity: "25,000", price: 0.20 },
      { name: "shares", quantity: "500", price: 0.12 },
      { name: "saves", quantity: "250", price: 0.03 },
    ],
    totalPrice: 1.40,
    icon: "/icons/tiktok.png",
    popular: true,
  },
  {
    id: "tiktok-gold",
    platform: "TikTok",
    name: "TikTok Gold Pack",
    tier: "Gold",
    services: [
      { name: "likes", quantity: "15,000", price: 3.15 },
      { name: "views", quantity: "75,000", price: 0.60 },
      { name: "shares", quantity: "1,500", price: 0.30 },
      { name: "saves", quantity: "750", price: 0.09 },
    ],
    totalPrice: 4.14,
    icon: "/icons/tiktok.png",
    bestValue: true,
  },
  {
    id: "tiktok-diamond",
    platform: "TikTok",
    name: "TikTok Diamond Pack",
    tier: "Diamond",
    services: [
      { name: "likes", quantity: "50,000", price: 10.50 },
      { name: "views", quantity: "250,000", price: 2.00 },
      { name: "shares", quantity: "5,000", price: 1.15 },
      { name: "saves", quantity: "2,000", price: 0.18 },
    ],
    totalPrice: 13.83,
    icon: "/icons/tiktok.png",
  },

  // Twitter Bundles
  {
    id: "twitter-bronze",
    platform: "Twitter",
    name: "Twitter Bronze Pack",
    tier: "Bronze",
    services: [
      { name: "likes", quantity: "500", price: 2.61 },
      { name: "views", quantity: "5,000", price: 0.03 },
      { name: "retweets", quantity: "50", price: 3.72 },
    ],
    totalPrice: 6.36,
    icon: "/icons/twitter.png",
  },
  {
    id: "twitter-silver",
    platform: "Twitter",
    name: "Twitter Silver Pack",
    tier: "Silver",
    services: [
      { name: "likes", quantity: "2,500", price: 13.05 },
      { name: "views", quantity: "25,000", price: 0.15 },
      { name: "retweets", quantity: "250", price: 6.10 },
    ],
    totalPrice: 19.30,
    icon: "/icons/twitter.png",
    popular: true,
  },
  {
    id: "twitter-gold",
    platform: "Twitter",
    name: "Twitter Gold Pack",
    tier: "Gold",
    services: [
      { name: "likes", quantity: "7,500", price: 19.57 },
      { name: "views", quantity: "75,000", price: 0.45 },
      { name: "retweets", quantity: "750", price: 11.16 },
    ],
    totalPrice: 31.18,
    icon: "/icons/twitter.png",
    bestValue: true,
  },
  {
    id: "twitter-diamond",
    platform: "Twitter",
    name: "Twitter Diamond Pack",
    tier: "Diamond",
    services: [
      { name: "likes", quantity: "15,000", price: 26.10 },
      { name: "views", quantity: "150,000", price: 0.90 },
      { name: "retweets", quantity: "1,500", price: 12.18 },
    ],
    totalPrice: 39.18,
    icon: "/icons/twitter.png",
  },

  // YouTube Bundles
  {
    id: "youtube-bronze",
    platform: "YouTube",
    name: "YouTube Bronze Pack",
    tier: "Bronze",
    services: [
      { name: "likes", quantity: "500", price: 0.10 },
      { name: "views", quantity: "2,500", price: 0.20 },
    ],
    totalPrice: 0.30,
    icon: "/icons/youtube.png",
  },
  {
    id: "youtube-silver",
    platform: "YouTube",
    name: "YouTube Silver Pack",
    tier: "Silver",
    services: [
      { name: "likes", quantity: "2,500", price: 0.50 },
      { name: "views", quantity: "12,500", price: 1.00 },
    ],
    totalPrice: 1.50,
    icon: "/icons/youtube.png",
    popular: true,
  },
  {
    id: "youtube-gold",
    platform: "YouTube",
    name: "YouTube Gold Pack",
    tier: "Gold",
    services: [
      { name: "likes", quantity: "10,000", price: 2.00 },
      { name: "views", quantity: "50,000", price: 2.00 },
    ],
    totalPrice: 4.00,
    icon: "/icons/youtube.png",
    bestValue: true,
  },
  {
    id: "youtube-diamond",
    platform: "YouTube",
    name: "YouTube Diamond Pack",
    tier: "Diamond",
    services: [
      { name: "likes", quantity: "25,000", price: 5.00 },
      { name: "views", quantity: "100,000", price: 5.00 },
    ],
    totalPrice: 10.00,
    icon: "/icons/youtube.png",
  },

  // Reddit Bundles
  {
    id: "reddit-bronze",
    platform: "Reddit",
    name: "Reddit Bronze Pack",
    tier: "Bronze",
    services: [
      { name: "views", quantity: "2,500", price: 1.01 },
      { name: "shares", quantity: "250", price: 1.01 },
    ],
    totalPrice: 2.02,
    icon: "/icons/reddit.png",
  },
  {
    id: "reddit-silver",
    platform: "Reddit",
    name: "Reddit Silver Pack",
    tier: "Silver",
    services: [
      { name: "views", quantity: "7,500", price: 3.03 },
      { name: "shares", quantity: "750", price: 2.01 },
    ],
    totalPrice: 5.04,
    icon: "/icons/reddit.png",
    popular: true,
  },
  {
    id: "reddit-gold",
    platform: "Reddit",
    name: "Reddit Gold Pack",
    tier: "Gold",
    services: [
      { name: "views", quantity: "20,000", price: 6.72 },
      { name: "shares", quantity: "2,000", price: 4.02 },
    ],
    totalPrice: 10.74,
    icon: "/icons/reddit.png",
    bestValue: true,
  },
  {
    id: "reddit-diamond",
    platform: "Reddit",
    name: "Reddit Diamond Pack",
    tier: "Diamond",
    services: [
      { name: "views", quantity: "40,000", price: 13.44 },
      { name: "shares", quantity: "4,000", price: 8.04 },
    ],
    totalPrice: 21.48,
    icon: "/icons/reddit.png",
  },
]

// Filter bundles to only include those under or equal to 40 euros
export const affordableBundles = bundles.filter(bundle => bundle.totalPrice <= 40)

// Adjust bundles that exceed 40 euros (for display purposes)
export const adjustedBundles = bundles.map(bundle => {
  if (bundle.totalPrice > 40) {
    const scaleFactor = 40 / bundle.totalPrice
    const adjustedServices = bundle.services.map(service => {
      const quantityNum = parseInt(service.quantity.replace(/,/g, ''))
      const adjustedQuantity = Math.round(quantityNum * scaleFactor)
      return {
        ...service,
        quantity: adjustedQuantity.toLocaleString(),
        price: service.price * scaleFactor
      }
    })
    const adjustedTotal = adjustedServices.reduce((sum, s) => sum + s.price, 0)
    return { ...bundle, services: adjustedServices, totalPrice: adjustedTotal }
  }
  return bundle
})
