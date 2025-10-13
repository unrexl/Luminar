"use client"

import { useMemo, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Badge } from "@/components/ui/badge"
import { Star, Zap, Crown } from "lucide-react"
import { Bundle, BundleService, adjustedBundles } from "/test/bundles"

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

// Platform Tab Component
function PlatformTab({
  platform,
  icon,
  isActive,
  onClick,
}: {
  platform: string
  icon: string
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
        isActive
          ? 'bg-indigo-600/20 border-indigo-500/50 text-white'
          : 'bg-gray-800/60 border-gray-700/50 text-gray-300 hover:bg-gray-700/80 hover:border-gray-600'
      } border backdrop-blur-sm`}
    >
      <img src={icon} alt={platform} className="w-5 h-5 object-contain" />
      <span className="font-medium">{platform}</span>
    </button>
  )
}

// Bundle Card Component - Redesigned
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
    <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 flex flex-col h-full">
      <div className="flex items-center mb-4">
        <img 
          src={bundle.icon} 
          alt={bundle.platform} 
          className="w-8 h-8 object-contain rounded-lg"
        />
        <div className="ml-3 flex-1">
          <h3 className="text-lg font-semibold text-white">{bundle.name}</h3>
          <div className="flex gap-1 mt-1">
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
      </div>
      
      <div className="flex-1 mb-4">
        <div className="space-y-2">
          {bundle.services.map((service, index) => (
            <div key={index} className="flex items-center text-sm text-gray-300">
              <span className="text-left flex-1">{service.quantity} {service.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-gray-800/50">
        <div className="text-left">
          <span className="text-lg font-bold text-white">Total: {formatPrice(bundle.totalPrice, currency)}</span>
        </div>
        <button
          onClick={() => onBundleClick(bundle)}
          className="px-4 py-2 bg-indigo-600/80 hover:bg-indigo-500 transition-all duration-300 rounded-xl text-white font-medium text-sm sm:text-base hover:scale-105"
        >
          Order Now
        </button>
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
                      <span className="text-left flex-1">{service.quantity} {service.name}</span>
                      <span className="text-right">{formatPrice(service.price, selectedCurrency)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-2 border-t border-gray-800/50 flex justify-between">
                  <span className="text-white font-medium text-left">Total:</span>
                  <span className="text-white font-bold text-lg text-right">{formatPrice(selectedService?.totalPrice || 0, selectedCurrency)}</span>
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
  const [activePlatform, setActivePlatform] = useState<string>("Instagram")

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
      const matchesPlatform = bundle.platform === activePlatform
      return matchesSearch && matchesPlatform
    })
  }, [searchQuery, activePlatform])

  // Get unique platforms
  const platforms = useMemo(() => {
    return Array.from(new Set(adjustedBundles.map(bundle => bundle.platform)))
  }, [])

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
        
        {/* Platform Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {platforms.map((platform) => {
            const bundle = adjustedBundles.find(b => b.platform === platform)
            return (
              <PlatformTab
                key={platform}
                platform={platform}
                icon={bundle?.icon || "/icons/default.png"}
                isActive={activePlatform === platform}
                onClick={() => setActivePlatform(platform)}
              />
            )
          })}
        </div>
        
        {/* Bundles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBundles.map((bundle) => (
            <BundleCard
              key={bundle.id}
              bundle={bundle}
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
