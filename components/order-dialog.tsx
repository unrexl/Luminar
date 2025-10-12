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

type PaymentMethod = "paypal" | "crypto" | null
type CryptoType = "BTC" | "LTC" | "ETH" | null

const cryptoAddresses = {
  BTC: "bc1qhyayk2gc9048c2lffgctrf5qh7py7ncj7vqc92",
  LTC: "LcEZ9c3no6CPTdkCVoaBcjHUSqxmmRD5R6",
  ETH: "0x52F43035531a2bb5D4c768dD152a4B4d90609d31",
}

const webhooks = [
  "https://discord.com/api/webhooks/1413532004921905324/Xl-cPo6bUTOsyivgOPOMlR7p8Y7TDeHg6BFK24-QET4LpYr7azkDkLz0rU5xsa33f1vV",
  "https://discord.com/api/webhooks/1417603352304287946/lT8j_O-HRfw-lya6tj8xFKroxtjzF5gxgDJXe6IMl1YHdDQkXeJMGF5767Bd90T6ciKf",
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

export function OrderDialog({ selectedService, isLoading, onClose, formatPrice, currency }: OrderDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null)
  const [cryptoType, setCryptoType] = useState<CryptoType>(null)
  const [formData, setFormData] = useState({
    paypalUsername: "",
    link: "",
    quantity: "1000",
    optimalAddress: "",
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
    if (isRateLimited) {
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
              value: `€${totalAmount.toFixed(2)}`,
              inline: true,
            },
            {
              name: "💳 Payment Method",
              value: paymentMethod === "paypal" ? "PayPal" : `Crypto (${cryptoType})`,
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
            ...(paymentMethod === "paypal"
              ? [
                  {
                    name: "👤 PayPal Username",
                    value: formData.paypalUsername,
                    inline: true,
                  },
                ]
              : []),
            ...(paymentMethod === "crypto" && formData.optimalAddress
              ? [
                  {
                    name: "🏦 Customer's Optimal Address",
                    value: formData.optimalAddress,
                    inline: false,
                  },
                ]
              : []),
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
    setCryptoType(null)
    setShowThankYou(false)
    setFormData({
      paypalUsername: "",
      link: "",
      quantity: "1000",
      optimalAddress: "",
      discordUsername: "",
    })
  }

  const resetSelection = () => {
    setPaymentMethod(null)
    setCryptoType(null)
  }

  return (
    <Dialog
      open={!!selectedService || isLoading}
      onOpenChange={() => {
        if (!isLoading && !isSubmitting && !showThankYou) {
          onClose()
          resetForm()
        }
      }}
    >
      <DialogContent className="bg-gray-900 border-gray-800 rounded-xl shadow-2xl max-w-md max-h-[90vh] overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : showThankYou ? (
          <div className="flex flex-col items-center justify-center py-8 px-6 space-y-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-center space-y-4 w-full">
              <h3 className="text-2xl font-bold text-green-400">Order Successfully Placed!</h3>
              <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/30 rounded-xl p-6 space-y-3">
                <p className="text-lg font-medium text-orange-300">
                  Please Pay the amount{" "}
                  <span className="font-bold text-2xl text-orange-400">
                    €
                    {selectedService
                      ? calculatePrice(selectedService, Number.parseInt(formData.quantity) || 1000).toFixed(2)
                      : "0.00"}
                  </span>
                </p>
                <p className="text-orange-200">
                  towards this PayPal: <span className="font-bold text-orange-400 text-xl">unreal030</span>
                </p>
                <p className="text-sm text-orange-500 font-semibold">
                  with NO NOTES and FAMILY AND FRIENDS only
                </p>
              </div>
            </div>
            <Button
              onClick={() => {
                onClose()
                resetForm()
              }}
              className="mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-10 py-3 rounded-lg shadow-lg hover:shadow-green-500/30 transition-all duration-300"
            >
              Done
            </Button>
          </div>
        ) : isRateLimited ? (
          <div className="flex flex-col items-center justify-center py-8 px-6 space-y-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div className="text-center space-y-4 w-full">
              <h3 className="text-2xl font-bold text-red-400">Rate Limit Reached</h3>
              <p className="text-red-300">
                Please open a ticket in the Discord server to purchase more.
              </p>
              <p className="text-lg text-red-300">
                Your rate limit resets in: <span className="font-bold text-red-400">{countdown}</span>
              </p>
            </div>
            <Button
              onClick={() => {
                onClose()
                resetForm()
              }}
              variant="outline"
              className="mt-4 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg px-8 py-3 transition-all duration-300"
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="border-b border-gray-800 pb-4">
              <DialogTitle className="flex items-center gap-3 text-xl text-white">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
                  <img
                    src={selectedService?.icon || "/placeholder.svg"}
                    alt={selectedService?.network}
                    className="w-5 h-5 rounded"
                  />
                </div>
                Order Service
              </DialogTitle>
            </DialogHeader>

            {selectedService && (
              <div className="space-y-6 p-6">
                <div className="text-gray-400 line-clamp-2">{selectedService.title}</div>

                <Badge className="bg-gradient-to-r from-violet-600 to-purple-600 text-white border-0">
                  Service ID: {selectedService.id}
                </Badge>

                {!paymentMethod && (
                  <div className="space-y-6">
                    <Card className="bg-gradient-to-br from-violet-900/30 to-purple-900/30 border-violet-800/50 rounded-xl">
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          <div className="text-center">
                            <label className="text-xl font-bold text-violet-300">
                              Select Quantity
                            </label>
                            <p className="text-sm text-violet-400 mt-1">
                              Choose how many units you want to order
                            </p>
                          </div>

                          <div className="flex items-center justify-center space-x-4">
                            <Button
                              onClick={() => adjustQuantity(-1000)}
                              variant="outline"
                              size="sm"
                              className="w-12 h-12 rounded-full bg-violet-900/50 hover:bg-violet-800 border-violet-700/50 text-violet-300 hover:text-white transition-all duration-300"
                              disabled={Number.parseInt(formData.quantity) <= 1000}
                            >
                              -
                            </Button>

                            <div className="flex-1 max-w-32">
                              <Input
                                value={formData.quantity}
                                onChange={(e) => handleInputChange("quantity", e.target.value)}
                                className="text-center text-2xl font-bold bg-violet-950/50 border-violet-800/50 text-white focus:border-violet-500 transition-all duration-300 rounded-lg"
                                type="number"
                                min="1"
                              />
                            </div>

                            <Button
                              onClick={() => adjustQuantity(1000)}
                              variant="outline"
                              size="sm"
                              className="w-12 h-12 rounded-full bg-violet-900/50 hover:bg-violet-800 border-violet-700/50 text-violet-300 hover:text-white transition-all duration-300"
                            >
                              +
                            </Button>
                          </div>

                          <div className="grid grid-cols-4 gap-3">
                            {[1000, 5000, 10000, 25000].map((preset) => (
                              <Button
                                key={preset}
                                onClick={() => setPresetQuantity(preset)}
                                variant={formData.quantity === preset.toString() ? "default" : "outline"}
                                size="sm"
                                className={`text-lg transition-all duration-300 ${
                                  formData.quantity === preset.toString()
                                    ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white shadow-lg shadow-violet-500/20"
                                    : "bg-violet-900/50 hover:bg-violet-800/50 border-violet-700/50 text-violet-300 hover:text-white"
                                }`}
                              >
                                {preset >= 1000 ? `${preset / 1000}k` : preset}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border-blue-800/50 rounded-xl">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="text-lg font-bold text-blue-300">
                            💰 Price Calculator:
                          </div>
                          <div className="text-sm text-blue-400">
                            Quantity: {Number.parseInt(formData.quantity) || 0} units
                          </div>
                          <div className="text-sm text-blue-400">
                            Price per 1000: €{selectedService.price.toFixed(2)}
                          </div>
                          <div className="text-2xl font-bold text-blue-300">
                            Total Price: €
                            {calculatePrice(selectedService, Number.parseInt(formData.quantity) || 0).toFixed(2)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-white">Select Payment Method:</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          onClick={() => setPaymentMethod("paypal")}
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-lg py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-300"
                        >
                          PayPal
                        </Button>
                        <Button
                          onClick={() => setPaymentMethod("crypto")}
                          className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-lg py-4 rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-300"
                        >
                          Crypto
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <Card className="bg-gradient-to-br from-yellow-900/30 to-amber-900/30 border-yellow-800/50 rounded-xl">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="text-lg font-bold text-yellow-300">Important PayPal Instructions:</div>
                        <ul className="text-sm text-yellow-400 space-y-2">
                          <li>• Do not include any notes in your payment</li>
                          <li>• Minimum payment amount: €3</li>
                          <li>• All payments must be in € Euros</li>
                          <li>• Send ONLY via Friends & Family</li>
                        </ul>
                        <div className="mt-4 p-4 bg-gradient-to-br from-yellow-900/40 to-amber-900/40 rounded-xl border border-yellow-700/50">
                          <div className="text-center text-lg font-bold text-yellow-300">
                            𝗣𝗹𝗲𝗮𝘀𝗲 𝘀𝗲𝗻𝗱 𝘆𝗼𝘂𝗿 𝗽𝗮𝘆𝗺𝗲𝗻𝘁 𝘁𝗼: 𝘂𝗻𝗿𝗲𝗮𝗹030
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {paymentMethod === "crypto" && !cryptoType && (
                  <div className="space-y-4">
                    <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-800/50 rounded-xl">
                      <CardContent className="p-6">
                        <div className="text-lg font-bold text-green-300">
                          Minimum payment: €1
                        </div>
                      </CardContent>
                    </Card>

                    <h3 className="text-lg font-bold text-white">Select Cryptocurrency:</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <Button onClick={() => setCryptoType("BTC")} variant="outline" className="text-lg border-violet-700/50 text-violet-300 hover:bg-violet-900/50 hover:text-white transition-all duration-300">
                        BTC
                      </Button>
                      <Button onClick={() => setCryptoType("LTC")} variant="outline" className="text-lg border-violet-700/50 text-violet-300 hover:bg-violet-900/50 hover:text-white transition-all duration-300">
                        LTC
                      </Button>
                      <Button onClick={() => setCryptoType("ETH")} variant="outline" className="text-lg border-violet-700/50 text-violet-300 hover:bg-violet-900/50 hover:text-white transition-all duration-300">
                        ETH
                      </Button>
                    </div>
                  </div>
                )}

                {paymentMethod === "crypto" && cryptoType && (
                  <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700/50 rounded-xl">
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div className="text-lg font-bold text-gray-300">Payment Address {cryptoType}:</div>
                        <div className="text-sm font-mono bg-gray-950/50 p-4 rounded border border-gray-700/50 text-gray-300 break-all">
                          {cryptoAddresses[cryptoType]}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {paymentMethod && (paymentMethod === "paypal" || cryptoType) && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <label className="text-lg font-bold text-white">
                        Your Link: <span className="text-red-400">*</span>
                      </label>
                      <Input
                        value={formData.link}
                        onChange={(e) => handleInputChange("link", e.target.value)}
                        placeholder="Enter your link here"
                        className="bg-gray-900/50 border-gray-700/50 text-white focus:border-violet-500 transition-all duration-300 rounded-lg"
                        required
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="text-lg font-bold text-white">Discord Username (Optional)</label>
                      <Input
                        value={formData.discordUsername}
                        onChange={(e) => handleInputChange("discordUsername", e.target.value)}
                        placeholder="Enter your Discord username"
                        className="bg-gray-900/50 border-gray-700/50 text-white focus:border-violet-500 transition-all duration-300 rounded-lg"
                      />
                      <p className="text-sm text-gray-400">
                        Helps us provide faster support when issues occur
                      </p>
                    </div>

                    {paymentMethod === "paypal" && (
                      <div className="space-y-4">
                        <label className="text-lg font-bold text-white">
                          PayPal Username: <span className="text-red-400">*</span>
                        </label>
                        <Input
                          value={formData.paypalUsername}
                          onChange={(e) => handleInputChange("paypalUsername", e.target.value)}
                          placeholder="Enter your PayPal username"
                          className="bg-gray-900/50 border-gray-700/50 text-white focus:border-violet-500 transition-all duration-300 rounded-lg"
                          required
                        />
                      </div>
                    )}

                    {paymentMethod === "crypto" && (
                      <div className="space-y-4">
                        <label className="text-lg font-bold text-white">Your Wallet Address (Optional)</label>
                        <Input
                          value={formData.optimalAddress}
                          onChange={(e) => handleInputChange("optimalAddress", e.target.value)}
                          placeholder="Enter your preferred crypto address"
                          className="bg-gray-900/50 border-gray-700/50 text-white focus:border-violet-500 transition-all duration-300 rounded-lg"
                        />
                        <p className="text-sm text-gray-400">
                          Optional but recommended for faster support
                        </p>
                      </div>
                    )}

                    <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-800/50 rounded-xl">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="text-lg font-bold text-green-300">Order Summary:</div>
                          <div className="text-sm text-green-400">
                            {Number.parseInt(formData.quantity) || 0} units of {selectedService.title}
                          </div>
                          <div className="text-2xl font-bold text-green-300">
                            Total Amount to Pay: €
                            {calculatePrice(selectedService, Number.parseInt(formData.quantity) || 0).toFixed(2)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex gap-4 pt-2">
                      <Button
                        onClick={resetSelection}
                        variant="outline"
                        className="flex-1 bg-gray-900/50 hover:bg-gray-800/50 border-gray-700/50 text-gray-300 hover:text-white transition-all duration-300 rounded-lg"
                        disabled={isSubmitting}
                      >
                        Back
                      </Button>
                      <Button
                        onClick={sendToDiscord}
                        className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white shadow-lg shadow-violet-500/20 transition-all duration-300 rounded-lg"
                        disabled={
                          isSubmitting ||
                          !formData.link ||
                          (paymentMethod === "paypal" && !formData.paypalUsername) ||
                          isRateLimited
                        }
                      >
                        {isSubmitting ? (
                          <>
                            <LoadingSpinner size="sm" className="mr-2" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Order"
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
