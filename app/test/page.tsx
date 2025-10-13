"use client"

import { useMemo, useState, useEffect } from "react"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Bundle Data
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
    id: "instagram-starter",
    platform: "Instagram",
    name: "Instagram Starter Pack",
    services: [
      { name: "likes", quantity: "5,000", price: 4.50 },
      { name: "views", quantity: "10,000", price: 0.05 },
      { name: "saves", quantity: "500", price: 1.00 },
      { name: "shares", quantity: "100", price: 0.50 },
    ],
    totalPrice: 6.05,
  },
  {
    id: "instagram-growth",
    platform: "Instagram",
    name: "Instagram Growth Pack",
    services: [
      { name: "likes", quantity: "30,000", price: 27.00 },
      { name: "views", quantity: "50,000", price: 0.25 },
      { name: "saves", quantity: "2,000", price: 4.00 },
      { name: "shares", quantity: "500", price: 2.50 },
    ],
    totalPrice: 33.75,
  },
  {
    id: "instagram-mega",
    platform: "Instagram",
    name: "Instagram Mega Pack",
    services: [
      { name: "likes", quantity: "100,000", price: 90.00 },
      { name: "views", quantity: "200,000", price: 1.00 },
      { name: "saves", quantity: "5,000", price: 5.00 },
      { name: "shares", quantity: "1,000", price: 5.00 },
    ],
    totalPrice: 101.00, // Adjusted to 100.00 in code below
  },
  
  // TikTok Bundles
  {
    id: "tiktok-starter",
    platform: "TikTok",
    name: "TikTok Starter Pack",
    services: [
      { name: "likes", quantity: "5,000", price: 1.05 },
      { name: "views", quantity: "10,000", price: 0.39 },
      { name: "shares", quantity: "500", price: 0.11 },
      { name: "saves", quantity: "200", price: 0.02 },
    ],
    totalPrice: 1.57,
  },
  {
    id: "tiktok-growth",
    platform: "TikTok",
    name: "TikTok Growth Pack",
    services: [
      { name: "likes", quantity: "30,000", price: 6.30 },
      { name: "views", quantity: "100,000", price: 3.87 },
      { name: "shares", quantity: "2,500", price: 0.57 },
      { name: "saves", quantity: "1,000", price: 0.05 },
    ],
    totalPrice: 10.79,
  },
  {
    id: "tiktok-mega",
    platform: "TikTok",
    name: "TikTok Mega Pack",
    services: [
      { name: "likes", quantity: "100,000", price: 21.10 },
      { name: "views", quantity: "500,000", price: 19.35 },
      { name: "shares", quantity: "10,000", price: 2.26 },
      { name: "saves", quantity: "5,000", price: 0.23 },
    ],
    totalPrice: 42.94,
  },
  
  // Twitter Bundles
  {
    id: "twitter-starter",
    platform: "Twitter",
    name: "Twitter Starter Pack",
    services: [
      { name: "likes", quantity: "5,000", price: 14.07 },
      { name: "views", quantity: "10,000", price: 0.34 },
      { name: "reposts", quantity: "500", price: 3.72 },
    ],
    totalPrice: 18.13,
  },
  {
    id: "twitter-growth",
    platform: "Twitter",
    name: "Twitter Growth Pack",
    services: [
      { name: "likes", quantity: "30,000", price: 84.42 },
      { name: "views", quantity: "100,000", price: 3.40 },
      { name: "reposts", quantity: "2,500", price: 18.59 },
    ],
    totalPrice: 106.41, // Adjusted to 100.00 in code below
  },
  {
    id: "twitter-mega",
    platform: "Twitter",
    name: "Twitter Mega Pack",
    services: [
      { name: "likes", quantity: "100,000", price: 281.40 },
      { name: "views", quantity: "500,000", price: 17.00 },
      { name: "reposts", quantity: "10,000", price: 74.38 },
    ],
    totalPrice: 372.78, // Adjusted to 100.00 in code below
  },
  
  // YouTube Bundles
  {
    id: "youtube-starter",
    platform: "YouTube",
    name: "YouTube Starter Pack",
    services: [
      { name: "views", quantity: "5,000", price: 18.59 },
      { name: "likes", quantity: "500", price: 0.10 },
      { name: "comment likes", quantity: "50", price: 0.03},
    ],
    totalPrice: 18.72,
  },
  {
    id: "youtube-growth",
    platform: "YouTube",
    name: "YouTube Growth Pack",
    services: [
      { name: "views", quantity: "30,000", price: 111.56 },
      { name: "likes", quantity: "3,000", price: 0.60 },
      { name: "comment likes", quantity: "300", price: 0.23 },
    ],
    totalPrice: 112.39, // Adjusted to 100.00 in code below
  },
  {
    id: "youtube-mega",
    platform: "YouTube",
    name: "YouTube Mega Pack",
    services: [
      { name: "views", quantity: "100,000", price: 371.87 },
      { name: "likes", quantity: "10,000", price: 2.01 },
      { name: "comment likes", quantity: "1,000", price: 0.85 },
    ],
    totalPrice: 374.73, // Adjusted to 100.00 in code below
  },
  
  // Facebook Bundles
  {
    id: "facebook-starter",
    platform: "Facebook",
    name: "Facebook Starter Pack",
    services: [
      { name: "likes", quantity: "5,000", price: 4.83 },
      { name: "views", quantity: "10,000", price: 0.02 },
      { name: "reactions", quantity: "500", price: 0.37 },
    ],
    totalPrice: 5.22,
  },
  {
    id: "facebook-growth",
    platform: "Facebook",
    name: "Facebook Growth Pack",
    services: [
      { name: "likes", quantity: "30,000", price: 28.98 },
      { name: "views", quantity: "100,000", price: 0.80 },
      { name: "reactions", quantity: "2,500", price: 1.47 },
    ],
    totalPrice: 31.25,
  },
  {
    id: "facebook-mega",
    platform: "Facebook",
    name: "Facebook Mega Pack",
    services: [
      { name: "likes", quantity: "100,000", price: 96.50 },
      { name: "views", quantity: "500,000", price: 2.00 },
      { name: "reactions", quantity: "10,000", price: 5.86 },
    ],
    totalPrice: 104.36, // Adjusted to 100.00 in code below
  },
  
  // Telegram Bundles
  {
    id: "telegram-starter",
    platform: "Telegram",
    name: "Telegram Starter Pack",
    services: [
      { name: "members", quantity: "5,000", price: 15.33 },
      { name: "views", quantity: "10,000", price: 0.38 },
      { name: "reactions", quantity: "500", price: 0.05 },
    ],
    totalPrice: 15.76,
  },
  {
    id: "telegram-growth",
    platform: "Telegram",
    name: "Telegram Growth Pack",
    services: [
      { name: "members", quantity: "30,000", price: 61.31 },
      { name: "views", quantity: "100,000", price: 1.52 },
      { name: "reactions", quantity: "2,000", price: 0.19 },
    ],
    totalPrice: 63.02,
  },
  {
    id: "telegram-mega",
    platform: "Telegram",
    name: "Telegram Mega Pack",
    services: [
      { name: "members", quantity: "100,000", price: 153.27 },
      { name: "views", quantity: "500,000", price: 3.80 },
      { name: "reactions", quantity: "10,000", price: 0.95 },
    ],
    totalPrice: 158.02, // Adjusted to 100.00 in code below
  },
  
  // Twitch Bundles
  {
    id: "twitch-starter",
    platform: "Twitch",
    name: "Twitch Starter Pack",
    services: [
      { name: "followers", quantity: "5,000", price: 10.55 },
      { name: "views", quantity: "10,000", price: 2.01 },
    ],
    totalPrice: 12.56,
  },
  {
    id: "twitch-growth",
    platform: "Twitch",
    name: "Twitch Growth Pack",
    services: [
      { name: "followers", quantity: "30,000", price: 42.12 },
      { name: "views", quantity: "100,000", price: 8.04 },
    ],
    totalPrice: 50.16,
  },
  {
    id: "twitch-mega",
    platform: "Twitch",
    name: "Twitch Mega Pack",
    services: [
      { name: "followers", quantity: "100,000", price: 105.53 },
      { name: "views", quantity: "500,000", price: 40.22 },
    ],
    totalPrice: 145.75, // Adjusted to 100.00 in code below
  },
  
  // Kick Bundles
  {
    id: "kick-starter",
    platform: "Kick",
    name: "Kick Starter Pack",
    services: [
      { name: "followers", quantity: "5,000", price: 12.36 },
      { name: "views", quantity: "10,000", price: 0.42 },
    ],
    totalPrice: 12.78,
  },
  {
    id: "kick-growth",
    platform: "Kick",
    name: "Kick Growth Pack",
    services: [
      { name: "followers", quantity: "30,000", price: 41.21 },
      { name: "views", quantity: "100,000", price: 1.41 },
    ],
    totalPrice: 42.62,
  },
  {
    id: "kick-mega",
    platform: "Kick",
    name: "Kick Mega Pack",
    services: [
      { name: "followers", quantity: "100,000", price: 103.02 },
      { name: "views", quantity: "250,000", price: 3.52 },
    ],
    totalPrice: 106.54, // Adjusted to 100.00 in code below
  },
  
  // Spotify Bundles
  {
    id: "spotify-starter",
    platform: "Spotify",
    name: "Spotify Starter Pack",
    services: [
      { name: "followers", quantity: "10,000", price: 0.01 },
    ],
    totalPrice: 0.01,
  },
  {
    id: "spotify-growth",
    platform: "Spotify",
    name: "Spotify Growth Pack",
    services: [
      { name: "followers", quantity: "50,000", price: 0.07 },
    ],
    totalPrice: 0.07,
  },
  {
    id: "spotify-mega",
    platform: "Spotify",
    name: "Spotify Mega Pack",
    services: [
      { name: "followers", quantity: "100,000", price: 0.14 },
    ],
    totalPrice: 0.14,
  },
  
  // Reddit Bundles
  {
    id: "reddit-starter",
    platform: "Reddit",
    name: "Reddit Starter Pack",
    services: [
      { name: "views", quantity: "50,000", price: 0.0001 },
      { name: "shares", quantity: "5,000", price: 0.00001 },
    ],
    totalPrice: 0.00011,
  },
  {
    id: "reddit-growth",
    platform: "Reddit",
    name: "Reddit Growth Pack",
    services: [
      { name: "views", quantity: "200,000", price: 0.0004 },
      { name: "shares", quantity: "20,000", price: 0.00004 },
    ],
    totalPrice: 0.00044,
  },
  {
    id: "reddit-mega",
    platform: "Reddit",
    name: "Reddit Mega Pack",
    services: [
      { name: "views", quantity: "500,000", price: 0.0010 },
      { name: "shares", quantity: "50,000", price: 0.0001 },
    ],
    totalPrice: 0.0011,
  },
  
  // Snapchat Bundles
  {
    id: "snapchat-starter",
    platform: "Snapchat",
    name: "Snapchat Starter Pack",
    services: [
      { name: "followers", quantity: "5,000", price: 22.61 },
      { name: "likes", quantity: "500", price: 4.02 },
    ],
    totalPrice: 26.63,
  },
  {
    id: "snapchat-growth",
    platform: "Snapchat",
    name: "Snapchat Growth Pack",
    services: [
      { name: "followers", quantity: "30,000", price: 90.45 },
      { name: "likes", quantity: "2,000", price: 16.08 },
    ],
    totalPrice: 106.53, // Adjusted to 100.00 in code below
  },
  {
    id: "snapchat-mega",
    platform: "Snapchat",
    name: "Snapchat Mega Pack",
    services: [
      { name: "followers", quantity: "100,000", price: 226.14 },
      { name: "likes", quantity: "5,000", price: 40.20 },
    ],
    totalPrice: 266.34, // Adjusted to 100.00 in code below
  },
  
  // WhatsApp Bundles
  {
    id: "whatsapp-starter",
    platform: "WhatsApp",
    name: "WhatsApp Starter Pack",
    services: [
      { name: "members", quantity: "10,000", price: 7.54 },
      { name: "reactions", quantity: "1,000", price: 3.77 },
    ],
    totalPrice: 11.31,
  },
  {
    id: "whatsapp-growth",
    platform: "WhatsApp",
    name: "WhatsApp Growth Pack",
    services: [
      { name: "members", quantity: "30,000", price: 22.61 },
      { name: "reactions", quantity: "3,000", price: 11.31 },
    ],
    totalPrice: 33.92,
  },
  {
    id: "whatsapp-mega",
    platform: "WhatsApp",
    name: "WhatsApp Mega Pack",
    services: [
      { name: "members", quantity: "50,000", price: 37.69 },
      { name: "reactions", quantity: "5,000", price: 18.85 },
    ],
    totalPrice: 56.54,
  },
  
  // Google Bundles
  {
    id: "google-starter",
    platform: "Google",
    name: "Google Starter Pack",
    services: [
      { name: "reviews", quantity: "100", price: 25.13 },
    ],
    totalPrice: 25.13,
  },
  {
    id: "google-growth",
    platform: "Google",
    name: "Google Growth Pack",
    services: [
      { name: "reviews", quantity: "500", price: 125.63 },
    ],
    totalPrice: 125.63, // Adjusted to 100.00 in code below
  },
  {
    id: "google-mega",
    platform: "Google",
    name: "Google Mega Pack",
    services: [
      { name: "reviews", quantity: "1,000", price: 251.26 },
    ],
    totalPrice: 251.26, // Adjusted to 100.00 in code below
  },
  
  // Discord Bundles
  {
    id: "discord-starter",
    platform: "Discord",
    name: "Discord Starter Pack",
    services: [
      { name: "server boosts", quantity: "1", price: 0.57 },
    ],
    totalPrice: 0.57,
  },
  {
    id: "discord-growth",
    platform: "Discord",
    name: "Discord Growth Pack",
    services: [
      { name: "server boosts", quantity: "5", price: 2.86 },
    ],
    totalPrice: 2.86,
  },
  {
    id: "discord-mega",
    platform: "Discord",
    name: "Discord Mega Pack",
    services: [
      { name: "server boosts", quantity: "14", price: 8.00 },
    ],
    totalPrice: 8.00,
  },
]

// Adjust bundles that exceed 100 euros
const adjustedBundles = bundles.map(bundle => {
  if (bundle.totalPrice > 100) {
    // Calculate scaling factor to bring total to 100 euros
    const scaleFactor = 100 / bundle.totalPrice;
    
    // Scale down each service quantity proportionally
    const adjustedServices = bundle.services.map(service => {
      const quantityNum = parseInt(service.quantity.replace(/,/g, ''));
      const adjustedQuantity = Math.round(quantityNum * scaleFactor);
      return {
        ...service,
        quantity: adjustedQuantity.toLocaleString(),
        price: service.price * scaleFactor
      };
    });
    
    // Recalculate total
    const adjustedTotal = adjustedServices.reduce((sum, service) => sum + service.price, 0);
    
    return {
      ...bundle,
      services: adjustedServices,
      totalPrice: adjustedTotal
    };
  }
  return bundle;
});

// Loading Component
function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        const increment = prev < 70 ? Math.random() * 20 + 10 : Math.random() * 5 + 2
        return Math.min(prev + increment, 100)
      })
    }, 80)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
            Loading
            <span className="inline-block animate-bounce ml-1">.</span>
            <span className="inline-block animate-bounce ml-0.5" style={{ animationDelay: "0.1s" }}>
              .
            </span>
            <span className="inline-block animate-bounce ml-0.5" style={{ animationDelay: "0.2s" }}>
              .
            </span>
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm">{Math.round(progress)}%</p>
        </div>

        <div className="w-64 sm:w-80 h-2 bg-gray-800 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full shadow-lg transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div
          className="h-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-sm transition-all duration-200"
          style={{ width: `${Math.max(progress * 0.8, 20)}%` }}
        ></div>
      </div>
    </div>
  )
}

// Header Component
function Header() {
  return (
    <header className="w-full backdrop-blur-md bg-black/70 border-b border-gray-800/50 sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          <div className="flex items-center space-x-3">
            <img 
              src="https://media.discordapp.net/attachments/1091030774012186685/1417600581354389645/IQvHiQnv4ahXoYqFq8gS84ivFINDZB3qlceFTDSZBjLsfcgLHC.png?ex=68ecb12c&is=68eb5fac&hm=9478fdf6299c72670ff465269fa2c94d21d700685bafe4f52ed2055ed03f1059&=&format=png&quality=lossless"
              alt="Luminar Services"
              className="h-8 sm:h-10 w-8 sm:w-10 object-contain rounded-lg"
            />
            <span className="text-lg sm:text-xl font-bold text-white">Luminar Services</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://030.vercel.app/"
              className="px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-300 bg-gray-800/60 rounded-xl hover:bg-gray-700/80 transition-all duration-300 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600 hover:scale-105"
            >
              Home
            </a>
            <a
              href="https://discord.gg/dtTCCxu3TA"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-indigo-600/80 rounded-xl hover:bg-indigo-500 transition-all duration-300 backdrop-blur-sm border border-indigo-500/50 hover:border-indigo-400 hover:scale-105"
            >
              Discord
            </a>
            <a
              href="https://030.vercel.app/refund-policy"
              className="px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-300 bg-gray-800/60 rounded-xl hover:bg-gray-700/80 transition-all duration-300 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600 hover:scale-105"
            >
              <span className="hidden sm:inline">Refund Policy</span>
              <span className="sm:hidden">Refund</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

// Compact Search Bar Component
function CompactSearchBar({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string
  setSearchQuery: (query: string) => void
}) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-5">
      <div className="flex justify-end">
        <div className="relative w-full sm:w-56">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg 
              className={`h-4 w-4 transition-all duration-300 ${isSearchFocused ? 'text-indigo-400' : 'text-gray-500'}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholder="Search bundles..."
            className={`w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border transition-all duration-300 bg-gray-900/60 backdrop-blur-sm text-gray-200 placeholder-gray-500 ${
              isSearchFocused 
                ? 'border-indigo-500/50 ring-2 ring-indigo-500/30' 
                : 'border-gray-700/50'
            }`}
          />
        </div>
      </div>
    </div>
  )
}

// Bundle Card Component
function BundleCard({
  platform,
  bundles,
  formatPrice,
  currency,
  onBundleClick,
}: {
  platform: string
  bundles: Bundle[]
  formatPrice: (price: number, currency: string) => string
  currency: string
  onBundleClick: (bundle: Bundle) => void
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{platform} Bundles</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {bundles.map((bundle) => (
          <div
            key={bundle.id}
            className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">{bundle.name}</h3>
              <div className="space-y-2">
                {bundle.services.map((service, index) => (
                  <div key={index} className="flex justify-between text-sm text-gray-300">
                    <span>{service.quantity} {service.name}</span>
                    <span>{formatPrice(service.price, currency)}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800/50">
              <span className="text-lg font-bold text-white">Total: {formatPrice(bundle.totalPrice, currency)}</span>
              <button
                onClick={() => onBundleClick(bundle)}
                className="px-4 py-2 bg-indigo-600/80 hover:bg-indigo-500 transition-all duration-300 rounded-xl text-white font-medium text-sm sm:text-base hover:scale-105"
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Order Dialog
function OrderDialog({
  selectedService,
  isLoading,
  onClose,
  formatPrice,
  currency,
}: {
  selectedService: Bundle | null
  isLoading: boolean
  onClose: () => void
  formatPrice: (price: number, currency: string) => string
  currency: string
}) {
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | null>(null)
  const [selectedCurrency, setSelectedCurrency] = useState(currency)
  const [formData, setFormData] = useState({
    paypalUsername: "",
    discordUsername: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [userIP, setUserIP] = useState<string>("")

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json")
        const data = await response.json()
        setUserIP(data.ip)
      } catch (error) {
        console.error("Failed to fetch IP:", error)
        setUserIP("Unknown")
      }
    }
    fetchIP()
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const sendToDiscord = async () => {
    if (!selectedService) return

    setIsSubmitting(true)

    const webhookUrl = "https://discord.com/api/webhooks/YOUR_WEBHOOK_HERE"

    const orderData = {
      username: "Luminar Orders",
      avatar_url: "https://cdn.discordapp.com/attachments/1091030774012186685/1417600581354389645/IQvHiQnv4ahXoYqFq8gS84ivFINDZB3qlceFTDSZBjLsfcgLHC.png",
      embeds: [
        {
          title: "🛒 New Order Received",
          color: 0x7c3aed,
          fields: [
            {
              name: "📦 Bundle",
              value: `${selectedService.name} (ID: ${selectedService.id})`,
              inline: false,
            },
            {
              name: "💰 Total Amount to Pay",
              value: `${formatPrice(selectedService.totalPrice, selectedCurrency)} (${selectedCurrency})`,
              inline: true,
            },
            {
              name: "💳 Payment Method",
              value: "PayPal",
              inline: true,
            },
            {
              name: "👤 PayPal Username",
              value: formData.paypalUsername,
              inline: true,
            },
            ...(formData.discordUsername
              ? [
                  {
                    name: "👤 Discord Username",
                    value: formData.discordUsername,
                    inline: true,
                  },
                ]
              : []),
            {
              name: "🌐 IP Address",
              value: userIP || "Unknown",
              inline: true,
            },
            {
              name: "📅 Time and Date",
              value: new Date().toLocaleString(),
              inline: false,
            },
          ],
          footer: {
            text: "Luminar Services Order System",
          },
          timestamp: new Date().toISOString(),
        },
      ],
    }

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        setShowThankYou(true)
      } else {
        alert("Failed to submit order. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting order:", error)
      alert("Failed to submit order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setPaymentMethod(null)
    setShowThankYou(false)
    setFormData({
      paypalUsername: "",
      discordUsername: "",
    })
  }

  if (!selectedService && !isLoading) {
    return null
  }

  return (
    <Dialog
      open={!!selectedService || isLoading}
      onOpenChange={(open) => {
        if (!isLoading && !isSubmitting && !showThankYou && !open) {
          onClose()
          resetForm()
        }
      }}
    >
      <DialogContent className="bg-black/80 backdrop-blur-md border-gray-800/50 max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        {isLoading ? (
          <div className="flex items-center justify-center flex-1">
            <LoadingSpinner size="lg" />
          </div>
        ) : showThankYou ? (
          <div className="flex flex-col items-center justify-center flex-1 p-6">
            <div className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-green-500 mb-4">Order Placed!</h3>
            <div className="bg-gray-900/50 p-6 rounded-lg w-full max-w-xs">
              <p className="text-lg text-gray-300 mb-2">
                Pay <span className="font-bold text-green-500">{formatPrice(selectedService!.totalPrice, selectedCurrency)}</span>
              </p>
              <p className="text-gray-400">to PayPal: <span className="font-bold text-purple-400">unreal030</span></p>
              <p className="text-red-500 text-sm mt-2">Friends & Family only</p>
            </div>
            <Button onClick={() => { onClose(); resetForm(); }} className="mt-6 bg-green-600 hover:bg-green-500">
              Done
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <DialogHeader className="border-b border-gray-800/50 pb-4">
              <DialogTitle className="flex items-center gap-3 text-white">
                <div className="w-8 h-8 bg-gray-800/50 rounded flex items-center justify-center">
                  <span className="text-lg">🛒</span>
                </div>
                Order {selectedService?.name}
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {selectedService && (
                <>
                  <div className="text-gray-400 text-sm">{selectedService.name}</div>
                  <Badge variant="secondary" className="bg-gray-800/50 text-gray-300">ID: {selectedService.id}</Badge>
                </>
              )}

              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800/50">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Currency:</span>
                  <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    className="bg-gray-800/50 border border-gray-700/50 text-white px-3 py-1 rounded"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                  </select>
                </div>
              </div>

              <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-800/50">
                <h3 className="text-white font-medium mb-2">Bundle Contents</h3>
                <div className="space-y-2">
                  {selectedService?.services.map((service, index) => (
                    <div key={index} className="flex justify-between text-sm text-gray-300">
                      <span>{service.quantity} {service.name}</span>
                      <span>{formatPrice(service.price, selectedCurrency)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-2 border-t border-gray-800/50 flex justify-between">
                  <span className="text-white font-medium">Total:</span>
                  <span className="text-white font-bold text-lg">{formatPrice(selectedService?.totalPrice || 0, selectedCurrency)}</span>
                </div>
              </div>

              <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-800/50">
                <h3 className="text-white font-medium mb-2">PayPal Instructions</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• No notes allowed</li>
                  <li>• Minimum: €3</li>
                  <li>• Friends & Family only</li>
                  <li>• Send to: <span className="font-bold text-purple-400">unreal030</span></li>
                </ul>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">PayPal Username *</label>
                <Input 
                  value={formData.paypalUsername} 
                  onChange={(e) => handleInputChange("paypalUsername", e.target.value)} 
                  className="bg-gray-800/50 border-gray-700/50 text-white" 
                  placeholder="Enter your PayPal username"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Discord Username (Optional)</label>
                <Input 
                  value={formData.discordUsername} 
                  onChange={(e) => handleInputChange("discordUsername", e.target.value)} 
                  className="bg-gray-800/50 border-gray-700/50 text-white" 
                  placeholder="Enter your Discord username"
                />
              </div>
            </div>

            <div className="border-t border-gray-800/50 p-4 flex justify-end">
              <button
                onClick={sendToDiscord}
                disabled={
                  isSubmitting ||
                  !selectedService ||
                  !formData.paypalUsername
                }
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Order"}
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

// Main Page Component
export default function BundlesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currency] = useState("EUR")
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false)
  const [currencyRates, setCurrencyRates] = useState<Record<string, number>>({})

  useEffect(() => {
    const loadCurrencyRates = async () => {
      try {
        const rates = await fetchRealTimeCurrencyRates()
        setCurrencyRates(rates)
      } catch (error) {
        console.error("Failed to fetch currency rates:", error)
      }
    }

    loadCurrencyRates()

    const interval = setInterval(loadCurrencyRates, 30 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setPageLoaded(true)
    }, 1200)

    return () => clearTimeout(loadingTimer)
  }, [])

  const filteredBundles = useMemo(() => {
    return adjustedBundles.filter((bundle) => {
      const matchesSearch = bundle.name ? bundle.name.toLowerCase().includes(searchQuery.toLowerCase()) : true
      return matchesSearch
    })
  }, [searchQuery])

  const groupedBundles = useMemo(() => {
    return filteredBundles.reduce(
      (acc, bundle) => {
        if (!acc[bundle.platform]) acc[bundle.platform] = []
        acc[bundle.platform].push(bundle)
        return acc
      },
      {} as Record<string, Bundle[]>,
    )
  }, [filteredBundles])

  const openOrder = (bundle: Bundle) => {
    setIsLoading(true)
    setTimeout(() => {
      setSelectedBundle(bundle)
      setIsLoading(false)
    }, 300)
  }

  const closeOrder = () => {
    setSelectedBundle(null)
  }

  const formatPrice = (price: number, currency: string) => {
    const rate = currencyRates[currency] || 1
    const convertedPrice = price * rate
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(convertedPrice)
  }

  const fetchRealTimeCurrencyRates = async () => {
    try {
      const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD")
      const data = await response.json()
      return data.rates
    } catch (error) {
      console.error("Failed to fetch currency rates:", error)
      return {}
    }
  }

  if (!pageLoaded) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header />
      <CompactSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <main className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          {Object.entries(groupedBundles).map(([platform, platformBundles]) => (
            <BundleCard
              key={platform}
              platform={platform}
              bundles={platformBundles}
              formatPrice={formatPrice}
              currency={currency}
              onBundleClick={openOrder}
            />
          ))}
        </div>
      </main>

      <OrderDialog
        selectedService={selectedBundle}
        isLoading={isLoading}
        onClose={closeOrder}
        formatPrice={formatPrice}
        currency={currency}
      />
    </div>
  )
}
