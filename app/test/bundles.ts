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
  services: BundleService[]
  totalPrice: number
  icon: string
  popular?: boolean
  bestValue?: boolean
}

export const bundles: Bundle[] = [
  // Instagram Bundles
  {
    id: "instagram-starter",
    platform: "Instagram",
    name: "Instagram Starter Pack",
    services: [
      { name: "likes", quantity: "5,000", price: 1.06 },
      { name: "views", quantity: "10,000", price: 0.04 },
      { name: "story_likes", quantity: "500", price: 1.43 },
    ],
    totalPrice: 2.53,
    icon: "/icons/instagram.jpeg",
    popular: true,
  },
  {
    id: "instagram-growth",
    platform: "Instagram",
    name: "Instagram Growth Pack",
    services: [
      { name: "likes", quantity: "25,000", price: 5.28 },
      { name: "views", quantity: "50,000", price: 0.20 },
      { name: "story_likes", quantity: "2,000", price: 5.72 },
    ],
    totalPrice: 11.20,
    icon: "/icons/instagram.jpeg",
    bestValue: true,
  },
  {
    id: "instagram-premium",
    platform: "Instagram",
    name: "Instagram Premium Pack",
    services: [
      { name: "likes", quantity: "50,000", price: 10.56 },
      { name: "views", quantity: "100,000", price: 0.41 },
      { name: "story_likes", quantity: "5,000", price: 14.32 },
    ],
    totalPrice: 25.29,
    icon: "/icons/instagram.jpeg",
  },
  {
    id: "instagram-mega",
    platform: "Instagram",
    name: "Instagram Mega Pack",
    services: [
      { name: "likes", quantity: "100,000", price: 21.10 },
      { name: "views", quantity: "250,000", price: 1.02 },
      { name: "story_likes", quantity: "10,000", price: 28.64 },
    ],
    totalPrice: 50.76,
    icon: "/icons/instagram.jpeg",
  },
  
  // TikTok Bundles
  {
    id: "tiktok-starter",
    platform: "TikTok",
    name: "TikTok Starter Pack",
    services: [
      { name: "likes", quantity: "5,000", price: 1.06 },
      { name: "views", quantity: "10,000", price: 0.39 },
      { name: "shares", quantity: "500", price: 0.11 },
    ],
    totalPrice: 1.56,
    icon: "/icons/tiktok.png",
    popular: true,
  },
  {
    id: "tiktok-growth",
    platform: "TikTok",
    name: "TikTok Growth Pack",
    services: [
      { name: "likes", quantity: "25,000", price: 5.28 },
      { name: "views", quantity: "50,000", price: 1.94 },
      { name: "shares", quantity: "2,500", price: 0.57 },
    ],
    totalPrice: 7.79,
    icon: "/icons/tiktok.png",
    bestValue: true,
  },
  {
    id: "tiktok-premium",
    platform: "TikTok",
    name: "TikTok Premium Pack",
    services: [
      { name: "likes", quantity: "50,000", price: 10.56 },
      { name: "views", quantity: "100,000", price: 3.87 },
      { name: "shares", quantity: "5,000", price: 1.13 },
    ],
    totalPrice: 15.56,
    icon: "/icons/tiktok.png",
  },
  {
    id: "tiktok-mega",
    platform: "TikTok",
    name: "TikTok Mega Pack",
    services: [
      { name: "likes", quantity: "100,000", price: 21.10 },
      { name: "views", quantity: "250,000", price: 9.68 },
      { name: "shares", quantity: "10,000", price: 2.26 },
    ],
    totalPrice: 33.04,
    icon: "/icons/tiktok.png",
  },
  
  // Twitter Bundles
  {
    id: "twitter-starter",
    platform: "Twitter",
    name: "Twitter Starter Pack",
    services: [
      { name: "likes", quantity: "5,000", price: 14.07 },
      { name: "views", quantity: "10,000", price: 0.34 },
      { name: "reposts", quantity: "500", price: 1.86 },
    ],
    totalPrice: 16.27,
    icon: "/icons/twitter.png",
    popular: true,
  },
  {
    id: "twitter-growth",
    platform: "Twitter",
    name: "Twitter Growth Pack",
    services: [
      { name: "likes", quantity: "25,000", price: 70.35 },
      { name: "views", quantity: "50,000", price: 1.70 },
      { name: "reposts", quantity: "2,500", price: 9.30 },
    ],
    totalPrice: 81.35,
    icon: "/icons/twitter.png",
    bestValue: true,
  },
  {
    id: "twitter-premium",
    platform: "Twitter",
    name: "Twitter Premium Pack",
    services: [
      { name: "likes", quantity: "50,000", price: 140.70 },
      { name: "views", quantity: "100,000", price: 3.40 },
      { name: "reposts", quantity: "5,000", price: 18.60 },
    ],
    totalPrice: 162.70,
    icon: "/icons/twitter.png",
  },
  {
    id: "twitter-mega",
    platform: "Twitter",
    name: "Twitter Mega Pack",
    services: [
      { name: "likes", quantity: "100,000", price: 281.40 },
      { name: "views", quantity: "200,000", price: 6.80 },
      { name: "reposts", quantity: "10,000", price: 37.20 },
    ],
    totalPrice: 325.40,
    icon: "/icons/twitter.png",
  },
  
  // Facebook Bundles
  {
    id: "facebook-starter",
    platform: "Facebook",
    name: "Facebook Starter Pack",
    services: [
      { name: "likes", quantity: "5,000", price: 6.03 },
      { name: "views", quantity: "10,000", price: 0.02 },
      { name: "reactions", quantity: "500", price: 0.18 },
    ],
    totalPrice: 6.23,
    icon: "/icons/facebook.png",
    popular: true,
  },
  {
    id: "facebook-growth",
    platform: "Facebook",
    name: "Facebook Growth Pack",
    services: [
      { name: "likes", quantity: "25,000", price: 30.16 },
      { name: "views", quantity: "50,000", price: 0.10 },
      { name: "reactions", quantity: "2,500", price: 0.92 },
    ],
    totalPrice: 31.18,
    icon: "/icons/facebook.png",
    bestValue: true,
  },
  {
    id: "facebook-premium",
    platform: "Facebook",
    name: "Facebook Premium Pack",
    services: [
      { name: "likes", quantity: "50,000", price: 60.31 },
      { name: "views", quantity: "100,000", price: 0.20 },
      { name: "reactions", quantity: "5,000", price: 1.84 },
    ],
    totalPrice: 62.35,
    icon: "/icons/facebook.png",
  },
  {
    id: "facebook-mega",
    platform: "Facebook",
    name: "Facebook Mega Pack",
    services: [
      { name: "likes", quantity: "100,000", price: 120.62 },
      { name: "views", quantity: "200,000", price: 0.40 },
      { name: "reactions", quantity: "10,000", price: 3.67 },
    ],
    totalPrice: 124.69,
    icon: "/icons/facebook.png",
  },
  
  // Telegram Bundles
  {
    id: "telegram-starter",
    platform: "Telegram",
    name: "Telegram Starter Pack",
    services: [
      { name: "members", quantity: "5,000", price: 15.33 },
      { name: "views", quantity: "10,000", price: 0.08 },
      { name: "reactions", quantity: "500", price: 0.05 },
    ],
    totalPrice: 15.46,
    icon: "/icons/telegram.png",
    popular: true,
  },
  {
    id: "telegram-growth",
    platform: "Telegram",
    name: "Telegram Growth Pack",
    services: [
      { name: "members", quantity: "25,000", price: 76.65 },
      { name: "views", quantity: "50,000", price: 0.38 },
      { name: "reactions", quantity: "2,500", price: 0.24 },
    ],
    totalPrice: 77.27,
    icon: "/icons/telegram.png",
    bestValue: true,
  },
  {
    id: "telegram-premium",
    platform: "Telegram",
    name: "Telegram Premium Pack",
    services: [
      { name: "members", quantity: "50,000", price: 153.30 },
      { name: "views", quantity: "100,000", price: 0.76 },
      { name: "reactions", quantity: "5,000", price: 0.48 },
    ],
    totalPrice: 154.54,
    icon: "/icons/telegram.png",
  },
  {
    id: "telegram-mega",
    platform: "Telegram",
    name: "Telegram Mega Pack",
    services: [
      { name: "members", quantity: "100,000", price: 306.60 },
      { name: "views", quantity: "200,000", price: 1.52 },
      { name: "reactions", quantity: "10,000", price: 0.95 },
    ],
    totalPrice: 309.07,
    icon: "/icons/telegram.png",
  },
  
  // Reddit Bundles
  {
    id: "reddit-starter",
    platform: "Reddit",
    name: "Reddit Starter Pack",
    services: [
      { name: "views", quantity: "50,000", price: 1.01 },
      { name: "shares", quantity: "5,000", price: 1.01 },
    ],
    totalPrice: 2.02,
    icon: "/icons/reddit.png",
    popular: true,
  },
  {
    id: "reddit-growth",
    platform: "Reddit",
    name: "Reddit Growth Pack",
    services: [
      { name: "views", quantity: "250,000", price: 5.03 },
      { name: "shares", quantity: "25,000", price: 5.03 },
    ],
    totalPrice: 10.06,
    icon: "/icons/reddit.png",
    bestValue: true,
  },
  {
    id: "reddit-premium",
    platform: "Reddit",
    name: "Reddit Premium Pack",
    services: [
      { name: "views", quantity: "500,000", price: 10.05 },
      { name: "shares", quantity: "50,000", price: 10.05 },
    ],
    totalPrice: 20.10,
    icon: "/icons/reddit.png",
  },
  {
    id: "reddit-mega",
    platform: "Reddit",
    name: "Reddit Mega Pack",
    services: [
      { name: "views", quantity: "1,000,000", price: 20.10 },
      { name: "shares", quantity: "100,000", price: 20.10 },
    ],
    totalPrice: 40.20,
    icon: "/icons/reddit.png",
  },
]
