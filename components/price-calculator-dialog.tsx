"use client"

import { useState, useEffect } from "react"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LoadingSpinner } from "@/components/loading-spinner"

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

interface PriceCalculatorDialogProps {
  selectedService: Service | null
  isLoading: boolean
  onClose: () => void
  formatPrice: (price: number, currency: string) => string
  currency: string
}

export function PriceCalculatorDialog({
  selectedService,
  isLoading,
  onClose,
  formatPrice,
  currency,
}: PriceCalculatorDialogProps) {
  const [quantity, setQuantity] = useState(1000)
  const [animatedPrice, setAnimatedPrice] = useState(0)

  const totalPrice = selectedService ? (selectedService.price * quantity) / 1000 : 0
  const totalOldPrice = selectedService?.oldPrice ? (selectedService.oldPrice * quantity) / 1000 : 0

  useEffect(() => {
    const startPrice = animatedPrice
    const endPrice = totalPrice
    const duration = 1200 // milliseconds
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Smooth easing function
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
          setQuantity(1000) // Reset quantity when closing
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

                {/* Preset Quantities */}
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

                {/* Custom Quantity */}
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

                {/* Price Breakdown */}
                <div className="space-y-2 pt-2 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quantity:</span>
                    <span>{quantity.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price per 1000:</span>
                    <span>{formatPrice(selectedService.price, currency)}</span>
                  </div>
                  {selectedService.oldPrice && totalOldPrice > totalPrice && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">You save:</span>
                      <span className="text-emerald-400">{formatPrice(totalOldPrice - totalPrice, currency)}</span>
                    </div>
                  )}
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
