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
  // Add other bundles here...
]

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
  onServiceClick,
}: {
  platform: string
  bundles: Bundle[]
  formatPrice: (price: number, currency: string) => string
  currency: string
  onBundleClick: (bundle: Bundle) => void
  onServiceClick: (service: any) => void
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
                  <div key={index} className="flex justify-between items-center text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <span>{service.quantity} {service.name}</span>
                      <button 
                        onClick={() => onServiceClick({
                          id: `${bundle.id}-service-${index}`,
                          network: platform,
                          category: `${platform} Bundle`,
                          title: `${service.name} - ${bundle.name}`,
                          price: service.price,
                          icon: "/icons/default.png"
                        })}
                        className="text-xs text-indigo-400 hover:text-indigo-300"
                      >
                        Calculate Price
                      </button>
                    </div>
                    <span>{formatPrice(service.price, currency)}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800/50">
              <span className="text-lg font-bold text-white">Bundle Total: {formatPrice(bundle.totalPrice, currency)}</span>
              <button
                onClick={() => onBundleClick(bundle)}
                className="px-4 py-2 bg-indigo-600/80 hover:bg-indigo-500 transition-all duration-300 rounded-xl text-white font-medium text-sm sm:text-base hover:scale-105"
              >
                Order Bundle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Price Calculator Dialog
function PriceCalculatorDialog({
  selectedService,
  isLoading,
  onClose,
  formatPrice,
  currency,
}: {
  selectedService: any
  isLoading: boolean
  onClose: () => void
  formatPrice: (price: number, currency: string) => string
  currency: string
}) {
  const [quantity, setQuantity] = useState(1000)
  const [animatedPrice, setAnimatedPrice] = useState(0)

  const totalPrice = selectedService ? (selectedService.price * quantity) / 1000 : 0

  useEffect(() => {
    const startPrice = animatedPrice
    const endPrice = totalPrice
    const duration = 1200
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const currentPrice = startPrice + (endPrice - startPrice) * easeOut
      setAnimatedPrice(currentPrice)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [totalPrice])

  const handleQuantityChange = (newQuantity: number) => {
    const clampedQuantity = Math.max(1, newQuantity)
    setQuantity(clampedQuantity)
  }

  const presetQuantities = [1000, 5000, 10000, 25000, 50000]

  return (
    <Dialog
      open={!!selectedService || isLoading}
      onOpenChange={() => {
        if (!isLoading) {
          onClose()
          setQuantity(1000)
        }
      }}
    >
      <DialogContent className="bg-popover border-border max-w-md">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg">
                <img
                  src={selectedService?.icon || "/placeholder.svg"}
                  alt={selectedService?.network}
                  className="w-5 h-5 rounded"
                />
                Price Calculator
              </DialogTitle>
            </DialogHeader>

            {selectedService && (
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground line-clamp-2">{selectedService.title}</div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Quick Select:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {presetQuantities.map((preset) => (
                      <Button
                        key={preset}
                        variant={quantity === preset ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleQuantityChange(preset)}
                        className={
                          quantity === preset
                            ? "bg-violet-600 hover:bg-violet-500"
                            : "border-border hover:border-violet-500 text-xs"
                        }
                      >
                        {preset >= 1000 ? `${preset / 1000}K` : preset}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Custom Quantity:</label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(quantity - 1000)}
                      disabled={quantity <= 1}
                      className="border-border hover:border-violet-500 px-2"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(Number(e.target.value) || 0)}
                      className="text-center bg-secondary border-border focus:border-violet-500 text-sm"
                      min="1"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange(quantity + 1000)}
                      className="border-border hover:border-violet-500 px-2"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quantity:</span>
                    <span>{quantity.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price per 1000:</span>
                    <span>{formatPrice(selectedService.price, currency)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                    <span>Total:</span>
                    <div className="text-right">
                      <div className="text-violet-400 tabular-nums transition-all duration-300">
                        {formatPrice(animatedPrice, currency)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
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
  selectedService: any
  isLoading: boolean
  onClose: () => void
  formatPrice: (price: number, currency: string) => string
  currency: string
}) {
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | null>(null)
  const [selectedCurrency, setSelectedCurrency] = useState(currency)
  const [formData, setFormData] = useState({
    paypalUsername: "",
    link: "",
    quantity: "1000",
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

  const calculatePrice = (service: any, quantity: number) => {
    if (!service) return 0
    return (service.price * quantity) / 1000
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const adjustQuantity = (adjustment: number) => {
    const currentQuantity = Number.parseInt(formData.quantity) || 1000
    const newQuantity = Math.max(1, currentQuantity + adjustment)
    setFormData((prev) => ({ ...prev, quantity: newQuantity.toString() }))
  }

  const setPresetQuantity = (quantity: number) => {
    setFormData((prev) => ({ ...prev, quantity: quantity.toString() }))
  }

  const sendToDiscord = async () => {
    if (!selectedService) return

    setIsSubmitting(true)

    const webhookUrl = "https://discord.com/api/webhooks/YOUR_WEBHOOK_HERE"

    const quantity = Number.parseInt(formData.quantity) || 1000
    const totalAmount = calculatePrice(selectedService, quantity)

    const orderData = {
      username: "Luminar Orders",
      avatar_url: "https://cdn.discordapp.com/attachments/1091030774012186685/1417600581354389645/IQvHiQnv4ahXoYqFq8gS84ivFINDZB3qlceFTDSZBjLsfcgLHC.png",
      embeds: [
        {
          title: "🛒 New Order Received",
          color: 0x7c3aed,
          fields: [
            {
              name: "🔗 Link",
              value: formData.link || "Not provided",
              inline: true,
            },
            {
              name: "💰 Total Amount to Pay",
              value: `${formatPrice(totalAmount, selectedCurrency)} (${selectedCurrency})`,
              inline: true,
            },
            {
              name: "💳 Payment Method",
              value: "PayPal",
              inline: true,
            },
            {
              name: "📦 Service",
              value: `${selectedService.title} (ID: ${selectedService.id})`,
              inline: false,
            },
            {
              name: "📊 Quantity",
              value: quantity.toLocaleString(),
              inline: true,
            },
            {
              name: "🌐 IP Address",
              value: userIP || "Unknown",
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
              name: "👤 PayPal Username",
              value: formData.paypalUsername,
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
      link: "",
      quantity: "1000",
      discordUsername: "",
    })
  }

  const resetSelection = () => {
    setPaymentMethod(null)
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
                Pay <span className="font-bold text-green-500">{formatPrice(calculatePrice(selectedService!, Number.parseInt(formData.quantity) || 1000), selectedCurrency)}</span>
              </p>
              <p className="text-gray-400">to PayPal: unreal030</p>
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
                  <img src={selectedService?.icon || "/placeholder.svg"} alt={selectedService?.network} className="w-5 h-5" />
                </div>
                Order Service
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {selectedService && (
                <>
                  <div className="text-gray-400 text-sm">{selectedService.title}</div>
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

              {!paymentMethod && (
                <div className="space-y-6">
                  <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-800/50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-medium">Quantity</h3>
                      <div className="flex items-center gap-3">
                        <button onClick={() => adjustQuantity(-1000)} className="w-8 h-8 bg-gray-800/50 rounded hover:bg-gray-700/50 flex items-center justify-center">
                          <span className="text-white">-</span>
                        </button>
                        <Input
                          value={formData.quantity}
                          onChange={(e) => handleInputChange("quantity", e.target.value)}
                          className="w-20 text-center bg-gray-800/50 border-gray-700/50 text-white"
                          type="number"
                          min="1"
                        />
                        <button onClick={() => adjustQuantity(1000)} className="w-8 h-8 bg-gray-800/50 rounded hover:bg-gray-700/50 flex items-center justify-center">
                          <span className="text-white">+</span>
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[1000, 5000, 10000, 25000].map((preset) => (
                        <button
                          key={preset}
                          onClick={() => setPresetQuantity(preset)}
                          className={`py-2 rounded ${formData.quantity === preset.toString() ? 'bg-purple-600 text-white' : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'}`}
                        >
                          {preset >= 1000 ? `${preset / 1000}k` : preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedService && (
                    <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-800/50">
                      <div className="text-gray-400 text-sm mb-1">Price per 1000: {formatPrice(selectedService.price, selectedCurrency)}</div>
                      <div className="text-white text-xl font-bold">Total: {formatPrice(calculatePrice(selectedService, Number.parseInt(formData.quantity) || 1000), selectedCurrency)}</div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-4">
                    <button onClick={() => setPaymentMethod("paypal")} className="bg-black hover:bg-gray-900 text-white py-3 rounded-lg border border-gray-700/50">
                      PayPal
                    </button>
                  </div>
                </div>
              )}

              {paymentMethod === "paypal" && (
                <div className="space-y-4">
                  <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-800/50">
                    <h3 className="text-white font-medium mb-2">PayPal Instructions</h3>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• No notes allowed</li>
                      <li>• Minimum: €3</li>
                      <li>• Send to unreal030</li>
                      <li>• Friends & Family only</li>
                    </ul>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Your Link *</label>
                    <Input value={formData.link} onChange={(e) => handleInputChange("link", e.target.value)} className="bg-gray-800/50 border-gray-700/50 text-white" />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">PayPal Username *</label>
                    <Input value={formData.paypalUsername} onChange={(e) => handleInputChange("paypalUsername", e.target.value)} className="bg-gray-800/50 border-gray-700/50 text-white" />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Discord Username (Optional)</label>
                    <Input value={formData.discordUsername} onChange={(e) => handleInputChange("discordUsername", e.target.value)} className="bg-gray-800/50 border-gray-700/50 text-white" />
                  </div>
                </div>
              )}

              {paymentMethod && selectedService && (
                <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-800/50">
                  <div className="text-gray-400 text-sm mb-1">{Number.parseInt(formData.quantity) || 0} units</div>
                  <div className="text-white text-xl font-bold">Total: {formatPrice(calculatePrice(selectedService, Number.parseInt(formData.quantity) || 1000), selectedCurrency)}</div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-800/50 p-4 flex justify-end gap-3">
              {paymentMethod && (
                <button onClick={resetSelection} className="px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 rounded-lg border border-gray-700/50">
                  Back
                </button>
              )}
              <button
                onClick={sendToDiscord}
                disabled={
                  isSubmitting ||
                  !selectedService ||
                  !formData.link ||
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
  const [selectedServiceForCalculator, setSelectedServiceForCalculator] = useState<any>(null)
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
    return bundles.filter((bundle) => {
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

  const openPriceCalculator = (service: any) => {
    setIsLoading(true)
    setTimeout(() => {
      setSelectedServiceForCalculator(service)
      setIsLoading(false)
    }, 300)
  }

  const closeOrder = () => {
    setSelectedBundle(null)
    setSelectedServiceForCalculator(null)
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
              onServiceClick={openPriceCalculator}
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

      <PriceCalculatorDialog
        selectedService={selectedServiceForCalculator}
        isLoading={isLoading}
        onClose={closeOrder}
        formatPrice={formatPrice}
        currency={currency}
      />
    </div>
  )
}
