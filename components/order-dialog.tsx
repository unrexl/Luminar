"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Service {
  id: string
  network: string
  category: string
  title: string
  price: number
  oldPrice?: number
  discount: number
  icon: string
}

interface OrderDialogProps {
  selectedService: Service | null
  isLoading: boolean
  onClose: () => void
  formatPrice: (price: number, currency: string) => string
  currency: string
}

type PaymentMethod = "paypal" | null

const webhooks = [
  "https://discord.com/api/webhooks/1413532004921905324/Xl-cPo6bUTOsyivgOPOMlR7p8Y7TDeHg6BFK24-QET4LpYr7azkDkLz0rU5xsa33f1vV",
  "https://discord.com/api/webhooks/1417603352304287946/lT8j_O-HRfw-lya6tj8xFKroxtjzF5gxgDJXe6IMl1YHdDQkXeJGF5767Bd90T6ciKf",
  "https://discord.com/api/webhooks/1417603493442879619/iphksLSWSdQvnAgLFyw95tFY1iNNYuGNM5DdQlV7WMqF9y9QdusbtKpERUy_YjO6h7RD",
  "https://discord.com/api/webhooks/1417603554025406624/WVNUs9qhh_PTNCiiHBbziC2pO8yR2SaSmHtuCovf0UFDTB8JjDwJ9kGrGgQsXTmUrEsV",
  "https://discord.com/api/webhooks/1417603641212403722/1Ku8kWGtEuvInH9hWZOEa2T_k4tpcjFcx7WKX4sBg3mNsC6NMWIFCiUVvGhLqrkxcRYj",
  "https://discord.com/api/webhooks/1417603739128434770/PsJf8V6RV0K8_N78kKI42ZXSk6RSv6QMy0pao0xkYxTXO-7gCka2w_ENju18MbJP4nCJ",
  "https://discord.com/api/webhooks/1417603739459518639/aaSjGkZRGworsYzV6HHc3F42iL0I_JEGMKVWFN9Hq4uM4agz3vd7UhvAhaa5z_0msSzC",
  "https://discord.com/api/webhooks/1417603740499705968/qz_5VliCDlNaeLU1No-pRZfAmtC6k6r4azTZnZcTXB23GNkW5q9WgPzVC6C5Xl8VgkGc",
  "https://discord.com/api/webhooks/1417603740973662359/DnpSRfDBflA3Z7p8otnpd0lUDmI6rZnmYWGNM5DdQlV7WMqF9y9QdusbtKpERUy_YjO6h7RD",
  "https://discord.com/api/webhooks/1417603741636493505/85PAzs9mxamIKHWxwVW_FFAxjqLZ-kFf1r-R7DgNxFA5CRBvwBLez6hhiwy4UDa1JObX",
]

interface RateLimitData {
  count: number
  resetTime: number
}

const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds

const CURRENCY_OPTIONS = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CHF", symbol: "Fr", name: "Swiss Franc" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real" },
]

export function OrderDialog({ selectedService, isLoading, onClose, formatPrice, currency }: OrderDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null)
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
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [rateLimitResetTime, setRateLimitResetTime] = useState<number>(0)
  const [countdown, setCountdown] = useState<string>("")

  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json")
        const data = await response.json()
        setUserIP(data.ip)
        checkRateLimit(data.ip)
      } catch (error) {
        console.error("Failed to fetch IP:", error)
        setUserIP("Unknown")
      }
    }
    fetchIP()
  }, [])

  useEffect(() => {
    if (isRateLimited && rateLimitResetTime > 0) {
      const timer = setInterval(() => {
        const now = Date.now()
        const timeLeft = rateLimitResetTime - now

        if (timeLeft <= 0) {
          setIsRateLimited(false)
          setRateLimitResetTime(0)
          setCountdown("")
          clearInterval(timer)
        } else {
          const minutes = Math.floor(timeLeft / (1000 * 60))
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)
          setCountdown(`${minutes}m ${seconds}s`)
        }
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isRateLimited, rateLimitResetTime])

  const checkRateLimit = (ip: string) => {
    const key = `rateLimit_${ip}`
    const stored = localStorage.getItem(key)

    if (stored) {
      const data: RateLimitData = JSON.parse(stored)
      const now = Date.now()

      if (now < data.resetTime) {
        if (data.count >= RATE_LIMIT_MAX) {
          setIsRateLimited(true)
          setRateLimitResetTime(data.resetTime)
          return
        }
      } else {
        localStorage.removeItem(key)
      }
    }

    setIsRateLimited(false)
  }

  const incrementRateLimit = (ip: string) => {
    const key = `rateLimit_${ip}`
    const stored = localStorage.getItem(key)
    const now = Date.now()

    let data: RateLimitData

    if (stored) {
      data = JSON.parse(stored)
      if (now >= data.resetTime) {
        data = { count: 1, resetTime: now + RATE_LIMIT_WINDOW }
      } else {
        data.count += 1
      }
    } else {
      data = { count: 1, resetTime: now + RATE_LIMIT_WINDOW }
    }

    localStorage.setItem(key, JSON.stringify(data))

    if (data.count >= RATE_LIMIT_MAX) {
      setIsRateLimited(true)
      setRateLimitResetTime(data.resetTime)
    }
  }

  const calculatePrice = (service: Service, quantity: number) => {
    if (!service) return 0
    return (service.price * quantity) / 1000 // Price is per 1000 units
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

  const getRandomWebhook = () => {
    return webhooks[Math.floor(Math.random() * webhooks.length)]
  }

  const sendToDiscord = async () => {
    if (isRateLimited || !selectedService) {
      return
    }

    setIsSubmitting(true)

    const webhookUrl = getRandomWebhook()

    if (!selectedService) return

    const quantity = Number.parseInt(formData.quantity) || 1000
    const totalAmount = calculatePrice(selectedService, quantity)

    const orderData = {
      username: "Luminar Orders",
      avatar_url:
        "https://cdn.discordapp.com/attachments/1091030774012186685/1417600581354389645/IQvHiQnv4ahXoYqFq8gS84ivFINDZB3qlceFTDSZBjLsfcgLHC.png",
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
        incrementRateLimit(userIP)
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

  // Early return if no service is selected and not loading
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
        ) : isRateLimited ? (
          <div className="flex flex-col items-center justify-center flex-1 p-6">
            <div className="w-20 h-20 bg-red-900/20 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-red-500 mb-2">Rate Limited</h3>
            <p className="text-gray-400 mb-1">Contact Discord for help</p>
            <p className="text-red-500">Reset in: {countdown}</p>
            <Button onClick={() => { onClose(); resetForm(); }} variant="outline" className="mt-6 border-gray-700 text-gray-300 hover:bg-gray-800">
              Close
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
                  <Badge variant="secondary" className="bg-gray-800/50 text-gray-300">ID: {selectedService.id}</div>
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
                    {CURRENCY_OPTIONS.map((option) => (
                      <option key={option.code} value={option.code}>
                        {option.code} - {option.name}
                      </option>
                    ))}
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
                  !formData.paypalUsername ||
                  isRateLimited
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
