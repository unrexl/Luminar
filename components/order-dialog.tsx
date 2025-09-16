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
  "https://discord.com/api/webhooks/1417603740973662359/DnpSRfDBflA3Z7p8otnpd0lUDmI6rZnmYWGQcJJMEta7VcGnrwI_WK7vO_PFO2bwlESx",
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
        setTimeout(() => {
          onClose()
          resetForm()
        }, 2000)
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
        if (!isLoading && !isSubmitting) {
          onClose()
          resetForm()
        }
      }}
    >
      <DialogContent className="bg-popover border-border max-w-md max-h-[90vh] overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner size="lg" />
          </div>
        ) : showThankYou ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Thank you for your order!</h3>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                Your order has been submitted successfully.
              </p>
            </div>
          </div>
        ) : isRateLimited ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">You've been rate limited!</h3>
              <p className="text-sm text-red-600 dark:text-red-400">
                Please open a ticket in the Discord server to purchase more.
              </p>
              <p className="text-sm text-red-600 dark:text-red-400">
                Your rate limit resets in: <span className="font-bold">{countdown}</span>
              </p>
            </div>
            <Button
              onClick={() => {
                onClose()
                resetForm()
              }}
              variant="outline"
              className="mt-4"
            >
              Close
            </Button>
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
                Order Service
              </DialogTitle>
            </DialogHeader>

            {selectedService && (
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground line-clamp-2">{selectedService.title}</div>

                <Badge variant="secondary" className="bg-violet-600/90 text-white">
                  Service ID: {selectedService.id}
                </Badge>

                {!paymentMethod && (
                  <div className="space-y-4">
                    <Card className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border-violet-200 dark:border-violet-800">
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="text-center">
                            <label className="text-lg font-bold text-violet-800 dark:text-violet-200">
                              Select Quantity
                            </label>
                            <p className="text-xs text-violet-600 dark:text-violet-400 mt-1">
                              Choose how many units you want to order
                            </p>
                          </div>

                          <div className="flex items-center justify-center space-x-3">
                            <Button
                              onClick={() => adjustQuantity(-1000)}
                              variant="outline"
                              size="sm"
                              className="w-10 h-10 rounded-full bg-violet-100 hover:bg-violet-200 dark:bg-violet-800 dark:hover:bg-violet-700 border-violet-300 dark:border-violet-600"
                              disabled={Number.parseInt(formData.quantity) <= 1000}
                            >
                              -
                            </Button>

                            <div className="flex-1 max-w-32">
                              <Input
                                value={formData.quantity}
                                onChange={(e) => handleInputChange("quantity", e.target.value)}
                                className="text-center text-xl font-bold bg-white dark:bg-gray-800 border-2 border-violet-300 dark:border-violet-600 focus:border-violet-500 dark:focus:border-violet-400"
                                type="number"
                                min="1"
                              />
                            </div>

                            <Button
                              onClick={() => adjustQuantity(1000)}
                              variant="outline"
                              size="sm"
                              className="w-10 h-10 rounded-full bg-violet-100 hover:bg-violet-200 dark:bg-violet-800 dark:hover:bg-violet-700 border-violet-300 dark:border-violet-600"
                            >
                              +
                            </Button>
                          </div>

                          <div className="grid grid-cols-4 gap-2">
                            {[1000, 5000, 10000, 25000].map((preset) => (
                              <Button
                                key={preset}
                                onClick={() => setPresetQuantity(preset)}
                                variant={formData.quantity === preset.toString() ? "default" : "outline"}
                                size="sm"
                                className={`text-xs ${
                                  formData.quantity === preset.toString()
                                    ? "bg-violet-600 hover:bg-violet-500 text-white"
                                    : "bg-violet-50 hover:bg-violet-100 dark:bg-violet-900/30 dark:hover:bg-violet-800/50 border-violet-200 dark:border-violet-700"
                                }`}
                              >
                                {preset >= 1000 ? `${preset / 1000}k` : preset}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                            💰 Price Calculator:
                          </div>
                          <div className="text-xs text-blue-700 dark:text-blue-300">
                            Quantity: {Number.parseInt(formData.quantity) || 0} units
                          </div>
                          <div className="text-xs text-blue-700 dark:text-blue-300">
                            Price per 1000: €{selectedService.price.toFixed(2)}
                          </div>
                          <div className="text-lg font-bold text-blue-800 dark:text-blue-200">
                            Total Price: €
                            {calculatePrice(selectedService, Number.parseInt(formData.quantity) || 0).toFixed(2)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-3">
                      <h3 className="text-sm font-medium">Select Payment Method:</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          onClick={() => setPaymentMethod("paypal")}
                          className="bg-blue-600 hover:bg-blue-500 text-white"
                        >
                          PayPal
                        </Button>
                        <Button
                          onClick={() => setPaymentMethod("crypto")}
                          className="bg-orange-600 hover:bg-orange-500 text-white"
                        >
                          Crypto
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Important:</div>
                        <ul className="text-xs text-yellow-700 dark:text-yellow-300 space-y-1">
                          <li>
                            • Do not include any notes in your payment. Payments with notes will be rejected and marked
                            as invalid.
                          </li>
                          <li>• Minimum payment amount: €3.</li>
                          <li>• All payments must be done in € Euros</li>
                          <li>
                            • Order ONLY through Friends & Family! If your payment is not sent via Friends & Family, it
                            will be invalid.
                             𝗣𝗹𝗲𝗮𝘀𝗲 𝘀𝗲𝗻𝗱 𝘆𝗼𝘂𝗿 𝗽𝗮𝘆𝗺𝗲𝗻𝘁 𝘃𝗶𝗮 𝗣𝗮𝘆𝗣𝗮𝗹 𝘁𝗼: 𝘂𝗻𝗿𝗲𝗮𝗹030    
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {paymentMethod === "crypto" && !cryptoType && (
                  <div className="space-y-3">
                    <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-green-800 dark:text-green-200">
                          Minimum payment: €1
                        </div>
                      </CardContent>
                    </Card>

                    <h3 className="text-sm font-medium">Select Cryptocurrency:</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <Button onClick={() => setCryptoType("BTC")} variant="outline" className="text-xs">
                        BTC
                      </Button>
                      <Button onClick={() => setCryptoType("LTC")} variant="outline" className="text-xs">
                        LTC
                      </Button>
                      <Button onClick={() => setCryptoType("ETH")} variant="outline" className="text-xs">
                        ETH
                      </Button>
                    </div>
                  </div>
                )}

                {paymentMethod === "crypto" && cryptoType && (
                  <Card className="bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Payment Address {cryptoType}:</div>
                        <div className="text-xs font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded break-all">
                          {cryptoAddresses[cryptoType]}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {paymentMethod && (paymentMethod === "paypal" || cryptoType) && (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Your Link: <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={formData.link}
                        onChange={(e) => handleInputChange("link", e.target.value)}
                        placeholder="Enter your link here"
                        className="bg-secondary border-border focus:border-violet-500"
                        required
                      />
                    </div>

                    {paymentMethod === "paypal" && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          PayPal Username: <span className="text-red-500">*</span>
                        </label>
                        <Input
                          value={formData.paypalUsername}
                          onChange={(e) => handleInputChange("paypalUsername", e.target.value)}
                          placeholder="Enter your PayPal username"
                          className="bg-secondary border-border focus:border-violet-500"
                          required
                        />
                      </div>
                    )}

                    {paymentMethod === "crypto" && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Your Payment Wallet Address (Optional):</label>
                        <Input
                          value={formData.optimalAddress}
                          onChange={(e) => handleInputChange("optimalAddress", e.target.value)}
                          placeholder="Enter your preferred crypto address (optional)"
                          className="bg-secondary border-border focus:border-violet-500"
                        />
                        <p className="text-xs text-muted-foreground">
                          This is optimal, as it helps you receive faster and more efficient support when problems occur.
                        </p>
                      </div>
                    )}

                    <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-green-800 dark:text-green-200">Order Summary:</div>
                          <div className="text-xs text-green-700 dark:text-green-300">
                            {Number.parseInt(formData.quantity) || 0} units of {selectedService.title}
                          </div>
                          <div className="text-lg font-bold text-green-800 dark:text-green-200">
                            Total Amount to Pay: €
                            {calculatePrice(selectedService, Number.parseInt(formData.quantity) || 0).toFixed(2)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex gap-2 pt-4">
                      <Button
                        onClick={resetSelection}
                        variant="outline"
                        className="flex-1 bg-transparent"
                        disabled={isSubmitting}
                      >
                        Back
                      </Button>
                      <Button
                        onClick={sendToDiscord}
                        className="flex-1 bg-violet-600 hover:bg-violet-500"
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
