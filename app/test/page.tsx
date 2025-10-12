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
}

export const bundles: Bundle[] = [
  // Instagram Bundles
  {
    id: "instagram-bundle-1",
    platform: "Instagram",
    name: "instagram bundle 1",
    services: [
      { name: "views", quantity: "50k", price: 0.20 },
      { name: "likes", quantity: "8.9k", price: 9.39 },
      { name: "saves", quantity: "2k", price: 2.00 },
      { name: "shares", quantity: "725", price: 0.73 },
    ],
    totalPrice: 12.32,
  },
  {
    id: "instagram-bundle-2",
    platform: "Instagram",
    name: "instagram bundle 2",
    services: [
      { name: "views", quantity: "200k", price: 0.82 },
      { name: "likes", quantity: "35k", price: 36.93 },
      { name: "saves", quantity: "8k", price: 8.00 },
      { name: "shares", quantity: "3k", price: 3.00 },
    ],
    totalPrice: 48.75,
  },
  {
    id: "instagram-bundle-3",
    platform: "Instagram",
    name: "instagram bundle 3",
    services: [
      { name: "views", quantity: "500k", price: 2.05 },
      { name: "likes", quantity: "90k", price: 94.97 },
      { name: "saves", quantity: "20k", price: 20.00 },
      { name: "shares", quantity: "7.5k", price: 7.50 },
    ],
    totalPrice: 124.52,
  },
  
  // TikTok Bundles
  {
    id: "tiktok-bundle-1",
    platform: "TikTok",
    name: "tiktok bundle 1",
    services: [
      { name: "views", quantity: "100k", price: 3.87 },
      { name: "likes", quantity: "15k", price: 3.17 },
      { name: "shares", quantity: "5k", price: 1.13 },
      { name: "saves", quantity: "2k", price: 0.09 },
    ],
    totalPrice: 8.26,
  },
  {
    id: "tiktok-bundle-2",
    platform: "TikTok",
    name: "tiktok bundle 2",
    services: [
      { name: "views", quantity: "500k", price: 19.35 },
      { name: "likes", quantity: "75k", price: 15.83 },
      { name: "shares", quantity: "25k", price: 5.65 },
      { name: "saves", quantity: "10k", price: 0.45 },
    ],
    totalPrice: 41.28,
  },
  {
    id: "tiktok-bundle-3",
    platform: "TikTok",
    name: "tiktok bundle 3",
    services: [
      { name: "views", quantity: "1M", price: 38.70 },
      { name: "likes", quantity: "150k", price: 31.65 },
      { name: "shares", quantity: "50k", price: 11.31 },
      { name: "saves", quantity: "20k", price: 0.90 },
    ],
    totalPrice: 82.56,
  },
  
  // Twitter Bundles
  {
    id: "twitter-bundle-1",
    platform: "Twitter",
    name: "twitter bundle 1",
    services: [
      { name: "views", quantity: "50k", price: 1.70 },
      { name: "likes", quantity: "8k", price: 20.91 },
      { name: "reposts", quantity: "2k", price: 7.44 },
    ],
    totalPrice: 30.05,
  },
  {
    id: "twitter-bundle-2",
    platform: "Twitter",
    name: "twitter bundle 2",
    services: [
      { name: "views", quantity: "200k", price: 6.80 },
      { name: "likes", quantity: "32k", price: 83.62 },
      { name: "reposts", quantity: "8k", price: 29.75 },
    ],
    totalPrice: 120.17,
  },
  {
    id: "twitter-bundle-3",
    platform: "Twitter",
    name: "twitter bundle 3",
    services: [
      { name: "views", quantity: "500k", price: 17.00 },
      { name: "likes", quantity: "80k", price: 209.06 },
      { name: "reposts", quantity: "20k", price: 74.37 },
    ],
    totalPrice: 300.43,
  },
  
  // YouTube Bundles
  {
    id: "youtube-bundle-1",
    platform: "YouTube",
    name: "youtube bundle 1",
    services: [
      { name: "views", quantity: "50k", price: 185.94 },
      { name: "likes", quantity: "5k", price: 1.01 },
      { name: "comment likes", quantity: "500", price: 0.33 },
    ],
    totalPrice: 187.28,
  },
  {
    id: "youtube-bundle-2",
    platform: "YouTube",
    name: "youtube bundle 2",
    services: [
      { name: "views", quantity: "200k", price: 743.74 },
      { name: "likes", quantity: "20k", price: 5.02 },
      { name: "comment likes", quantity: "2k", price: 1.51 },
    ],
    totalPrice: 750.27,
  },
  {
    id: "youtube-bundle-3",
    platform: "YouTube",
    name: "youtube bundle 3",
    services: [
      { name: "views", quantity: "500k", price: 1859.35 },
      { name: "likes", quantity: "50k", price: 20.11 },
      { name: "comment likes", quantity: "5k", price: 4.27 },
    ],
    totalPrice: 1883.73,
  },
  
  // Facebook Bundles
  {
    id: "facebook-bundle-1",
    platform: "Facebook",
    name: "facebook bundle 1",
    services: [
      { name: "views", quantity: "50k", price: 0.20 },
      { name: "likes", quantity: "8k", price: 9.65 },
      { name: "reactions", quantity: "2k", price: 0.73 },
    ],
    totalPrice: 10.58,
  },
  {
    id: "facebook-bundle-2",
    platform: "Facebook",
    name: "facebook bundle 2",
    services: [
      { name: "views", quantity: "200k", price: 0.80 },
      { name: "likes", quantity: "32k", price: 38.60 },
      { name: "reactions", quantity: "8k", price: 2.94 },
    ],
    totalPrice: 42.34,
  },
  {
    id: "facebook-bundle-3",
    platform: "Facebook",
    name: "facebook bundle 3",
    services: [
      { name: "views", quantity: "500k", price: 2.00 },
      { name: "likes", quantity: "80k", price: 96.50 },
      { name: "reactions", quantity: "20k", price: 7.34 },
    ],
    totalPrice: 105.84,
  },
  
  // Telegram Bundles
  {
    id: "telegram-bundle-1",
    platform: "Telegram",
    name: "telegram bundle 1",
    services: [
      { name: "views", quantity: "50k", price: 0.38 },
      { name: "members", quantity: "5k", price: 15.33 },
      { name: "reactions", quantity: "1k", price: 0.10 },
    ],
    totalPrice: 15.81,
  },
  {
    id: "telegram-bundle-2",
    platform: "Telegram",
    name: "telegram bundle 2",
    services: [
      { name: "views", quantity: "200k", price: 1.52 },
      { name: "members", quantity: "20k", price: 61.31 },
      { name: "reactions", quantity: "4k", price: 0.38 },
    ],
    totalPrice: 63.21,
  },
  {
    id: "telegram-bundle-3",
    platform: "Telegram",
    name: "telegram bundle 3",
    services: [
      { name: "views", quantity: "500k", price: 3.80 },
      { name: "members", quantity: "50k", price: 153.27 },
      { name: "reactions", quantity: "10k", price: 0.95 },
    ],
    totalPrice: 158.02,
  },
  
  // Twitch Bundles
  {
    id: "twitch-bundle-1",
    platform: "Twitch",
    name: "twitch bundle 1",
    services: [
      { name: "views", quantity: "50k", price: 20.11 },
      { name: "followers", quantity: "5k", price: 10.55 },
    ],
    totalPrice: 30.66,
  },
  {
    id: "twitch-bundle-2",
    platform: "Twitch",
    name: "twitch bundle 2",
    services: [
      { name: "views", quantity: "200k", price: 80.44 },
      { name: "followers", quantity: "20k", price: 42.12 },
    ],
    totalPrice: 122.56,
  },
  {
    id: "twitch-bundle-3",
    platform: "Twitch",
    name: "twitch bundle 3",
    services: [
      { name: "views", quantity: "500k", price: 201.10 },
      { name: "followers", quantity: "50k", price: 105.53 },
    ],
    totalPrice: 306.63,
  },
  
  // Kick Bundles
  {
    id: "kick-bundle-1",
    platform: "Kick",
    name: "kick bundle 1",
    services: [
      { name: "views", quantity: "30k", price: 0.42 },
      { name: "followers", quantity: "3k", price: 12.36 },
    ],
    totalPrice: 12.78,
  },
  {
    id: "kick-bundle-2",
    platform: "Kick",
    name: "kick bundle 2",
    services: [
      { name: "views", quantity: "100k", price: 1.41 },
      { name: "followers", quantity: "10k", price: 41.21 },
    ],
    totalPrice: 42.62,
  },
  {
    id: "kick-bundle-3",
    platform: "Kick",
    name: "kick bundle 3",
    services: [
      { name: "views", quantity: "250k", price: 3.52 },
      { name: "followers", quantity: "25k", price: 103.02 },
    ],
    totalPrice: 106.54,
  },
  
  // Spotify Bundles
  {
    id: "spotify-bundle-1",
    platform: "Spotify",
    name: "spotify bundle 1",
    services: [
      { name: "followers", quantity: "10k", price: 0.01 },
    ],
    totalPrice: 0.01,
  },
  {
    id: "spotify-bundle-2",
    platform: "Spotify",
    name: "spotify bundle 2",
    services: [
      { name: "followers", quantity: "50k", price: 0.07 },
    ],
    totalPrice: 0.07,
  },
  {
    id: "spotify-bundle-3",
    platform: "Spotify",
    name: "spotify bundle 3",
    services: [
      { name: "followers", quantity: "100k", price: 0.14 },
    ],
    totalPrice: 0.14,
  },
  
  // Reddit Bundles
  {
    id: "reddit-bundle-1",
    platform: "Reddit",
    name: "reddit bundle 1",
    services: [
      { name: "views", quantity: "50k", price: 0.0001 },
      { name: "shares", quantity: "5k", price: 0.00001 },
    ],
    totalPrice: 0.0001,
  },
  {
    id: "reddit-bundle-2",
    platform: "Reddit",
    name: "reddit bundle 2",
    services: [
      { name: "views", quantity: "200k", price: 0.0004 },
      { name: "shares", quantity: "20k", price: 0.00004 },
    ],
    totalPrice: 0.0004,
  },
  {
    id: "reddit-bundle-3",
    platform: "Reddit",
    name: "reddit bundle 3",
    services: [
      { name: "views", quantity: "500k", price: 0.0010 },
      { name: "shares", quantity: "50k", price: 0.0001 },
    ],
    totalPrice: 0.0011,
  },
  
  // Snapchat Bundles
  {
    id: "snapchat-bundle-1",
    platform: "Snapchat",
    name: "snapchat bundle 1",
    services: [
      { name: "followers", quantity: "5k", price: 22.61 },
      { name: "likes", quantity: "500", price: 4.02 },
    ],
    totalPrice: 26.63,
  },
  {
    id: "snapchat-bundle-2",
    platform: "Snapchat",
    name: "snapchat bundle 2",
    services: [
      { name: "followers", quantity: "20k", price: 90.45 },
      { name: "likes", quantity: "2k", price: 16.08 },
    ],
    totalPrice: 106.53,
  },
  {
    id: "snapchat-bundle-3",
    platform: "Snapchat",
    name: "snapchat bundle 3",
    services: [
      { name: "followers", quantity: "50k", price: 226.14 },
      { name: "likes", quantity: "5k", price: 40.20 },
    ],
    totalPrice: 266.34,
  },
  
  // WhatsApp Bundles
  {
    id: "whatsapp-bundle-1",
    platform: "WhatsApp",
    name: "whatsapp bundle 1",
    services: [
      { name: "members", quantity: "10k", price: 7.54 },
      { name: "reactions", quantity: "1k", price: 3.77 },
    ],
    totalPrice: 11.31,
  },
  {
    id: "whatsapp-bundle-2",
    platform: "WhatsApp",
    name: "whatsapp bundle 2",
    services: [
      { name: "members", quantity: "30k", price: 22.61 },
      { name: "reactions", quantity: "3k", price: 11.31 },
    ],
    totalPrice: 33.92,
  },
  {
    id: "whatsapp-bundle-3",
    platform: "WhatsApp",
    name: "whatsapp bundle 3",
    services: [
      { name: "members", quantity: "50k", price: 37.69 },
      { name: "reactions", quantity: "5k", price: 18.85 },
    ],
    totalPrice: 56.54,
  },
  
  // Google Bundles
  {
    id: "google-bundle-1",
    platform: "Google",
    name: "google bundle 1",
    services: [
      { name: "reviews", quantity: "100", price: 25.13 },
    ],
    totalPrice: 25.13,
  },
  {
    id: "google-bundle-2",
    platform: "Google",
    name: "google bundle 2",
    services: [
      { name: "reviews", quantity: "500", price: 125.63 },
    ],
    totalPrice: 125.63,
  },
  {
    id: "google-bundle-3",
    platform: "Google",
    name: "google bundle 3",
    services: [
      { name: "reviews", quantity: "1k", price: 251.26 },
    ],
    totalPrice: 251.26,
  },
  
  // Discord Bundles
  {
    id: "discord-bundle-1",
    platform: "Discord",
    name: "discord bundle 1",
    services: [
      { name: "server boosts", quantity: "1", price: 0.57 },
    ],
    totalPrice: 0.57,
  },
  {
    id: "discord-bundle-2",
    platform: "Discord",
    name: "discord bundle 2",
    services: [
      { name: "server boosts", quantity: "5", price: 2.86 },
    ],
    totalPrice: 2.86,
  },
  {
    id: "discord-bundle-3",
    platform: "Discord",
    name: "discord bundle 3",
    services: [
      { name: "server boosts", quantity: "14", price: 8.00 },
    ],
    totalPrice: 8.00,
  },
]
