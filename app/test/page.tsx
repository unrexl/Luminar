"use client"

import { useMemo, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Badge } from "@/components/ui/badge"
import { Star, Zap, Crown } from "lucide-react"

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
      { name: "likes", quantity: "5,000", price: 5.28 },
      { name: "views", quantity: "10,000", price: 0.04 },
      { name: "saves", quantity: "500", price: 0.72 },
      { name: "shares", quantity: "100", price: 0.05 },
    ],
    totalPrice: 6.09,
    icon: "/icons/instagram.jpeg",
    popular: true,
  },
  {
    id: "instagram-growth",
    platform: "Instagram",
    name: "Instagram Growth Pack",
    services: [
      { name: "likes", quantity: "25,000", price: 27.64 },
      { name: "views", quantity: "50,000", price: 0.25 },
      { name: "saves", quantity: "2,000", price: 2.86 },
      { name: "shares", quantity: "500", price: 0.25 },
      { name: "story likes", quantity: "1,000", price: 1.43 },
    ],
    totalPrice: 32.43,
    icon: "/icons/instagram.jpeg",
    bestValue: true,
  },
  {
    id: "instagram-premium",
    platform: "Instagram",
    name: "Instagram Premium Pack",
    services: [
      { name: "likes", quantity: "50,000", price: 55.28 },
      { name: "views", quantity: "100,000", price: 0.49 },
      { name: "saves", quantity: "5,000", price: 7.16 },
      { name: "shares", quantity: "1,000", price: 0.50 },
      { name: "story likes", quantity: "2,000", price: 2.86 },
      { name: "comment likes", quantity: "1,000", price: 0.75 },
    ],
    totalPrice: 67.04, // Scaled down to 40€ below
    icon: "/icons/instagram.jpeg",
  },
  {
    id: "instagram-mega",
    platform: "Instagram",
    name: "Instagram Mega Pack",
    services: [
      { name: "likes", quantity: "100,000", price: 110.56 },
      { name: "views", quantity: "250,000", price: 1.23 },
      { name: "saves", quantity: "10,000", price: 14.32 },
      { name: "shares", quantity: "2,500", price: 1.25 },
      { name: "story likes", quantity: "5,000", price: 7.16 },
      { name: "comment likes", quantity: "2,500", price: 1.88 },
      { name: "followers", quantity: "5,000", price: 8.24 },
    ],
    totalPrice: 144.14, // Scaled down to 40€ below
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
      { name: "saves", quantity: "200", price: 0.01 },
    ],
    totalPrice: 1.57,
    icon: "/icons/tiktok.png",
    popular: true,
  },
  {
    id: "tiktok-growth",
    platform: "TikTok",
    name: "TikTok Growth Pack",
    services: [
      { name: "likes", quantity: "25,000", price: 5.30 },
      { name: "views", quantity: "50,000", price: 1.94 },
      { name: "shares", quantity: "2,500", price: 0.57 },
      { name: "saves", quantity: "1,000", price: 0.05 },
      { name: "live stream likes", quantity: "1,000", price: 0.23 },
    ],
    totalPrice: 8.09,
    icon: "/icons/tiktok.png",
    bestValue: true,
  },
  {
    id: "tiktok-premium",
    platform: "TikTok",
    name: "TikTok Premium Pack",
    services: [
      { name: "likes", quantity: "50,000", price: 10.60 },
      { name: "views", quantity: "100,000", price: 3.87 },
      { name: "shares", quantity: "5,000", price: 1.13 },
      { name: "saves", quantity: "2,000", price: 0.10 },
      { name: "live stream likes", quantity: "2,000", price: 0.46 },
      { name: "video downloads", quantity: "500", price: 0.20 },
    ],
    totalPrice: 16.36,
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
      { name: "saves", quantity: "5,000", price: 0.23 },
      { name: "live stream likes", quantity: "5,000", price: 1.15 },
      { name: "video downloads", quantity: "1,000", price: 0.40 },
      { name: "followers", quantity: "2,000", price: 13.57 },
    ],
    totalPrice: 48.39, // Scaled down to 40€ below
    icon: "/icons/tiktok.png",
  },
  
  // Twitter Bundles
  {
    id: "twitter-starter",
    platform: "Twitter",
    name: "Twitter Starter Pack",
    services: [
      { name: "likes", quantity: "5,000", price: 13.07 },
      { name: "views", quantity: "10,000", price: 0.34 },
      { name: "reposts", quantity: "500", price: 1.86 },
    ],
    totalPrice: 15.27,
    icon: "/icons/twitter.png",
    popular: true,
  },
  {
    id: "twitter-growth",
    platform: "Twitter",
    name: "Twitter Growth Pack",
    services: [
      { name: "likes", quantity: "25,000", price: 65.35 },
      { name: "views", quantity: "50,000", price: 1.70 },
      { name: "reposts", quantity: "2,500", price: 9.30 },
      { name: "comment likes", quantity: "1,000", price: 0.65 },
    ],
    totalPrice: 77.00, // Scaled down to 40€ below
    icon: "/icons/twitter.png",
    bestValue: true,
  },
  {
    id: "twitter-premium",
    platform: "Twitter",
    name: "Twitter Premium Pack",
    services: [
      { name: "likes", quantity: "50,000", price: 130.70 },
      { name: "views", quantity: "100,000", price: 3.40 },
      { name: "reposts", quantity: "5,000", price: 18.60 },
      { name: "comment likes", quantity: "2,000", price: 1.31 },
      { name: "followers", quantity: "1,000", price: 4.77 },
    ],
    totalPrice: 158.78, // Scaled down to 40€ below
    icon: "/icons/twitter.png",
  },
  {
    id: "twitter-mega",
    platform: "Twitter",
    name: "Twitter Mega Pack",
    services: [
      { name: "likes", quantity: "100,000", price: 261.40 },
      { name: "views", quantity: "200,000", price: 6.80 },
      { name: "reposts", quantity: "10,000", price: 37.20 },
      { name: "comment likes", quantity: "5,000", price: 3.27 },
      { name: "followers", quantity: "2,000", price: 9.55 },
      { name: "quote tweets", quantity: "500", price: 1.86 },
    ],
    totalPrice: 320.08, // Scaled down to 40€ below
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
      { name: "shares", quantity: "500", price: 0.60 },
    ],
    totalPrice: 31.78,
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
      { name: "shares", quantity: "1,000", price: 1.20 },
      { name: "event responses", quantity: "500", price: 0.30 },
    ],
    totalPrice: 63.85, // Scaled down to 40€ below
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
      { name: "shares", quantity: "2,000", price: 2.41 },
      { name: "event responses", quantity: "1,000", price: 0.60 },
      { name: "followers", quantity: "5,000", price: 2.49 },
    ],
    totalPrice: 129.79, // Scaled down to 40€ below
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
      { name: "forwards", quantity: "500", price: 0.10 },
    ],
    totalPrice: 77.37, // Scaled down to 40€ below
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
      { name: "forwards", quantity: "1,000", price: 0.19 },
      { name: "pinned messages", quantity: "10", price: 0.05 },
    ],
    totalPrice: 154.78, // Scaled down to 40€ below
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
      { name: "forwards", quantity: "2,000", price: 0.38 },
      { name: "pinned messages", quantity: "20", price: 0.10 },
      { name: "channel boosts", quantity: "5", price: 15.33 },
    ],
    totalPrice: 324.88, // Scaled down to 40€ below
    icon: "/icons/telegram.png",
  },
  
  // Reddit Bundles
  {
    id: "reddit-starter",
    platform: "Reddit",
    name: "Reddit Starter Pack",
    services: [
      { name: "views", quantity: "50,000", price: 0.05 },
      { name: "shares", quantity: "5,000", price: 0.01 },
    ],
    totalPrice: 0.06,
    icon: "/icons/reddit.png",
    popular: true,
  },
  {
    id: "reddit-growth",
    platform: "Reddit",
    name: "Reddit Growth Pack",
    services: [
      { name: "views", quantity: "250,000", price: 0.25 },
      { name: "shares", quantity: "25,000", price: 0.03 },
      { name: "upvotes", quantity: "10,000", price: 0.01 },
    ],
    totalPrice: 0.29,
    icon: "/icons/reddit.png",
    bestValue: true,
  },
  {
    id: "reddit-premium",
    platform: "Reddit",
    name: "Reddit Premium Pack",
    services: [
      { name: "views", quantity: "500,000", price: 0.50 },
      { name: "shares", quantity: "50,000", price: 0.05 },
      { name: "upvotes", quantity: "25,000", price: 0.03 },
      { name: "comments", quantity: "1,000", price: 0.01 },
    ],
    totalPrice: 0.59,
    icon: "/icons/reddit.png",
  },
  {
    id: "reddit-mega",
    platform: "Reddit",
    name: "Reddit Mega Pack",
    services: [
      { name: "views", quantity: "1,000,000", price: 1.01 },
      { name: "shares", quantity: "100,000", price: 0.10 },
      { name: "upvotes", quantity: "50,000", price: 0.05 },
      { name: "comments", quantity: "5,000", price: 0.05 },
      { name: "gold awards", quantity: "10", price: 0.40 },
    ],
    totalPrice: 1.61,
    icon: "/icons/reddit.png",
  },
  
  // Snapchat Bundles
  {
    id: "snapchat-starter",
    platform: "Snapchat",
    name: "Snapchat Starter Pack",
    services: [
      { name: "followers", quantity: "5,000", price: 32.40 },
      { name: "likes", quantity: "500", price: 2.02 },
    ],
    totalPrice: 34.42,
    icon: "/icons/snapchat.svg",
    popular: true,
  },
  {
    id: "snapchat-growth",
    platform: "Snapchat",
    name: "Snapchat Growth Pack",
    services: [
      { name: "followers", quantity: "10,000", price: 64.80 },
      { name: "likes", quantity: "1,000", price: 4.04 },
      { name: "story views", quantity: "5,000", price: 0.36 },
    ],
    totalPrice: 69.20, // Scaled down to 40€ below
    icon: "/icons/snapchat.svg",
    bestValue: true,
  },
  {
    id: "snapchat-premium",
    platform: "Snapchat",
    name: "Snapchat Premium Pack",
    services: [
      { name: "followers", quantity: "20,000", price: 129.60 },
      { name: "likes", quantity: "2,000", price: 8.08 },
      { name: "story views", quantity: "10,000", price: 0.72 },
      { name: "snapscore", quantity: "10,000", price: 0.30 },
    ],
    totalPrice: 138.70, // Scaled down to 40€ below
    icon: "/icons/snapchat.svg",
  },
  {
    id: "snapchat-mega",
    platform: "Snapchat",
    name: "Snapchat Mega Pack",
    services: [
      { name: "followers", quantity: "40,000", price: 259.20 },
      { name: "likes", quantity: "4,000", price: 16.16 },
      { name: "story views", quantity: "20,000", price: 1.44 },
      { name: "snapscore", quantity: "50,000", price: 1.50 },
      { name: "friend requests", quantity: "1,000", price: 0.65 },
    ],
    totalPrice: 278.95, // Scaled down to 40€ below
    icon: "/icons/snapchat.svg",
  },
]

// Adjust bundles that exceed 40 euros
const adjustedBundles = bundles.map(bundle => {
  if (bundle.totalPrice > 40) {
    // Calculate scaling factor to bring total to 40 euros
    const scaleFactor = 40 / bundle.totalPrice;
    
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

// Platform Header Component
function PlatformHeader({ platform, icon }: { platform: string; icon: string }) {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="flex items-center justify-center mb-3">
        <img 
          src={icon} 
          alt={platform} 
          className="w-12 h-12 object-contain rounded-lg"
        />
      </div>
      <h2 className="text-3xl font-bold text-white text-center">{platform} Bundles</h2>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-3"></div>
    </div>
  )
}

// Bundle Card Component
function BundleCard({
  bundle,
  formatPrice,
  currency,
  onBundleClick,
}: {
  bundle: Bundle
  formatPrice: (price: number, currency: string) => string
  currency: string
  onBundleClick: (bundle: Bundle) => void
}) {
  return (
    <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <img 
          src={bundle.icon} 
          alt={bundle.platform} 
          className="w-10 h-10 object-contain rounded-lg mt-1"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-semibold text-white">{bundle.name}</h3>
            <div className="flex gap-1">
              {bundle.popular && (
                <Badge className="bg-purple-600/20 text-purple-400 border-purple-500/50">
                  <Star className="w-3 h-3 mr-1" /> Popular
                </Badge>
              )}
              {bundle.bestValue && (
                <Badge className="bg-green-600/20 text-green-400 border-green-500/50">
                  <Zap className="w-3 h-3 mr-1" /> Best Value
                </Badge>
              )}
            </div>
          </div>
          <div className="space-y-2 mb-4">
            {bundle.services.map((service, index) => (
              <div key={index} className="flex justify-between text-sm text-gray-300">
                <span>{service.quantity} {service.name}</span>
                <span>{formatPrice(service.price, currency)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-800/50">
            <span className="text-lg font-bold text-white">Total: {formatPrice(bundle.totalPrice, currency)}</span>
            <button
              onClick={() => onBundleClick(bundle)}
              className="px-4 py-2 bg-indigo-600/80 hover:bg-indigo-500 transition-all duration-300 rounded-xl text-white font-medium text-sm sm:text-base hover:scale-105"
            >
              Order Now
            </button>
          </div>
        </div>
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
                  <img src={selectedService?.icon || "/placeholder.svg"} alt={selectedService?.platform} className="w-5 h-5" />
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

  // Group bundles by platform
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
      
      <main className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 py-8 sm:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Social Media Growth Bundles</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Boost your social media presence with our affordable and effective growth bundles</p>
        </div>
        
        <div className="space-y-16">
          {Object.entries(groupedBundles).map(([platform, platformBundles]) => (
            <div key={platform}>
              <PlatformHeader platform={platform} icon={platformBundles[0].icon} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {platformBundles.map((bundle) => (
                  <BundleCard
                    key={bundle.id}
                    bundle={bundle}
                    formatPrice={formatPrice}
                    currency={currency}
                    onBundleClick={openOrder}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer with additional information */}
      <footer className="bg-gray-900/50 border-t border-gray-800/50 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">About Luminar Services</h3>
              <p className="text-gray-400 text-sm">
                We provide high-quality social media growth services to help you increase your online presence and engagement.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Why Choose Us?</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Fast delivery times</li>
                <li>• High-quality services</li>
                <li>• Affordable pricing</li>
                <li>• 24/7 customer support</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Need Help?</h3>
              <p className="text-gray-400 text-sm mb-2">
                Contact our support team for any questions or assistance.
              </p>
              <a 
                href="https://discord.gg/dtTCCxu3TA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 text-sm inline-flex items-center"
              >
                Join our Discord <span className="ml-1">→</span>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-800/50 text-center text-gray-500 text-sm">
            © 2023 Luminar Services. All rights reserved.
          </div>
        </div>
      </footer>

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
