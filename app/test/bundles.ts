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
      { name: "views", quantity: "5,000", price: 0.00 },
      { name: "saves", quantity: "100", price: 0.14 },
    ],
    totalPrice: 1.20,
    icon: "/icons/instagram.jpeg",
  },
  {
    id: "instagram-silver",
    platform: "Instagram",
    name: "Instagram Silver Pack",
    tier: "Silver",
    services: [
      { name: "likes", quantity: "5,000", price: 5.30 },
      { name: "views", quantity: "25,000", price: 0.00 },
      { name: "saves", quantity: "500", price: 0.70 },
    ],
    totalPrice: 6.00,
    icon: "/icons/instagram.jpeg",
    popular: true,
  },
  {
    id: "instagram-gold",
    platform: "Instagram",
    name: "Instagram Gold Pack",
    tier: "Gold",
    services: [
      { name: "likes", quantity: "15,000", price: 15.90 },
      { name: "views", quantity: "75,000", price: 0.00 },
      { name: "saves", quantity: "1,500", price: 2.10 },
    ],
    totalPrice: 18.00,
    icon: "/icons/instagram.jpeg",
    bestValue: true,
  },
  {
    id: "instagram-diamond",
    platform: "Instagram",
    name: "Instagram Diamond Pack",
    tier: "Diamond",
    services: [
      { name: "likes", quantity: "35,000", price: 36.90 },
      { name: "views", quantity: "150,000", price: 0.00 },
      { name: "saves", quantity: "3,000", price: 2.20 },
    ],
    totalPrice: 39.10,
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
      { name: "shares", quantity: "100", price: 0.02 },
      { name: "saves", quantity: "50", price: 0.01 },
    ],
    totalPrice: 0.28,
    icon: "/icons/tiktok.png",
  },
  {
    id: "tiktok-silver",
    platform: "TikTok",
    name: "TikTok Silver Pack",
    tier: "Silver",
    services: [
      { name: "likes", quantity: "10,000", price: 2.10 },
      { name: "views", quantity: "50,000", price: 0.20 },
      { name: "shares", quantity: "500", price: 0.12 },
      { name: "saves", quantity: "500", price: 0.03 },
    ],
    totalPrice: 2.45,
    icon: "/icons/tiktok.png",
    popular: true,
  },
  {
    id: "tiktok-gold",
    platform: "TikTok",
    name: "TikTok Gold Pack",
    tier: "Gold",
    services: [
      { name: "likes", quantity: "40,000", price: 8.40 },
      { name: "views", quantity: "200,000", price: 0.80 },
      { name: "shares", quantity: "2,000", price: 0.40 },
      { name: "saves", quantity: "1,000", price: 0.06 },
    ],
    totalPrice: 9.66,
    icon: "/icons/tiktok.png",
    bestValue: true,
  },
  {
    id: "tiktok-diamond",
    platform: "TikTok",
    name: "TikTok Diamond Pack",
    tier: "Diamond",
    services: [
      { name: "likes", quantity: "100,000", price: 21.00 },
      { name: "views", quantity: "500,000", price: 2.00 },
      { name: "shares", quantity: "4,000", price: 0.90 },
      { name: "saves", quantity: "2,000", price: 0.10 },
    ],
    totalPrice: 24.00,
    icon: "/icons/tiktok.png",
  },

  // Twitter Bundles
  {
    id: "twitter-bronze",
    platform: "Twitter",
    name: "Twitter Bronze Pack",
    tier: "Bronze",
    services: [
      { name: "likes", quantity: "500", price: 1.30 },
      { name: "views", quantity: "5,000", price: 0.15 },
      { name: "retweets", quantity: "50", price: 0.37 },
    ],
    totalPrice: 1.82,
    icon: "/icons/twitter.png",
  },
  {
    id: "twitter-silver",
    platform: "Twitter",
    name: "Twitter Silver Pack",
    tier: "Silver",
    services: [
      { name: "likes", quantity: "2,500", price: 6.50 },
      { name: "views", quantity: "25,000", price: 0.75 },
      { name: "retweets", quantity: "300", price: 1.12 },
    ],
    totalPrice: 8.37,
    icon: "/icons/twitter.png",
    popular: true,
  },
  {
    id: "twitter-gold",
    platform: "Twitter",
    name: "Twitter Gold Pack",
    tier: "Gold",
    services: [
      { name: "likes", quantity: "7,500", price: 19.50 },
      { name: "views", quantity: "75,000", price: 2.25 },
      { name: "retweets", quantity: "1,000", price: 3.72 },
    ],
    totalPrice: 25.47,
    icon: "/icons/twitter.png",
    bestValue: true,
  },
  {
    id: "twitter-diamond",
    platform: "Twitter",
    name: "Twitter Diamond Pack",
    tier: "Diamond",
    services: [
      { name: "likes", quantity: "13,000", price: 33.90 },
      { name: "views", quantity: "100,000", price: 3.00 },
      { name: "retweets", quantity: "1,500", price: 5.58 },
    ],
    totalPrice: 42.48,
    icon: "/icons/twitter.png",
  },

  // Reddit Bundles
  {
    id: "reddit-bronze",
    platform: "Reddit",
    name: "Reddit Bronze Pack",
    tier: "Bronze",
    services: [
      { name: "views", quantity: "2,500", price: 2.53 },
      { name: "shares", quantity: "250", price: 0.25 },
    ],
    totalPrice: 2.78,
    icon: "/icons/reddit.png",
  },
  {
    id: "reddit-silver",
    platform: "Reddit",
    name: "Reddit Silver Pack",
    tier: "Silver",
    services: [
      { name: "views", quantity: "7,500", price: 7.59 },
      { name: "shares", quantity: "750", price: 0.75 },
    ],
    totalPrice: 8.34,
    icon: "/icons/reddit.png",
    popular: true,
  },
  {
    id: "reddit-gold",
    platform: "Reddit",
    name: "Reddit Gold Pack",
    tier: "Gold",
    services: [
      { name: "views", quantity: "20,000", price: 20.20 },
      { name: "shares", quantity: "2,000", price: 2.00 },
    ],
    totalPrice: 22.20,
    icon: "/icons/reddit.png",
    bestValue: true,
  },
  {
    id: "reddit-diamond",
    platform: "Reddit",
    name: "Reddit Diamond Pack",
    tier: "Diamond",
    services: [
      { name: "views", quantity: "37,500", price: 37.87 },
      { name: "shares", quantity: "3,750", price: 3.75 },
    ],
    totalPrice: 41.62,
    icon: "/icons/reddit.png",
  },
]
