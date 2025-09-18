"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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

interface ServiceCardProps {
  category: string
  services: Service[]
  formatPrice: (price: number, currency: string) => string
  currency: string
  onServiceClick: (service: Service) => void
}

export function ServiceCard({ category, services, formatPrice, currency, onServiceClick }: ServiceCardProps) {
  return (
    <Card className="bg-gray-950/80 border-gray-800/50 backdrop-blur-sm shadow-2xl">
      <CardHeader className="flex-row items-center justify-between space-y-0 bg-gray-900/50 border-b border-gray-800/50 p-4 md:p-6">
        <div className="flex items-center gap-3">
          <img src={services[0]?.icon || "/placeholder.svg"} alt={category} className="w-5 h-5 md:w-6 md:h-6 rounded" />
          <div className="flex items-center gap-2">
            <h2 className="text-base md:text-lg font-semibold text-gray-100">{category}</h2>
          </div>
        </div>
        <span className="text-xs text-gray-400 bg-gray-800/30 px-2 py-1 md:px-3 rounded-full">Price per 1000</span>
      </CardHeader>
      <CardContent className="p-0">
        {services.map((service, index) => {
          return (
            <div
              key={service.id}
              className={`flex flex-col gap-3 p-4 md:p-6 hover:bg-gray-900/40 transition-all duration-300 border-b border-gray-800/30 last:border-b-0 group ${
                index % 2 === 0 ? "bg-gray-950/40" : "bg-gray-900/20"
              }`}
            >
              {/* Mobile Layout */}
              <div className="flex flex-col gap-3 md:hidden">
                {/* Top row: icon, badge, and order button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={service.icon || "/placeholder.svg"} alt={service.network} className="w-5 h-5 rounded" />
                    <Badge
                      variant="secondary"
                      className="bg-violet-600/90 text-white hover:bg-violet-500 shadow-lg text-xs"
                    >
                      {service.id}
                    </Badge>
                  </div>
                  <Button
                    onClick={() => onServiceClick(service)}
                    size="sm"
                    className="bg-violet-600 hover:bg-violet-500 text-white px-3 py-1 text-xs"
                  >
                    Order
                  </Button>
                </div>

                {/* Title */}
                <h3 className="text-sm leading-snug text-gray-200 group-hover:text-violet-300 transition-colors">
                  {service.title}
                </h3>

                {/* Price row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-gray-100 group-hover:text-violet-300 transition-colors">
                      {formatPrice(service.price as number, currency)}
                    </span>
                    {service.oldPrice && service.discount > 0 && (
                      <>
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(service.oldPrice as number, currency)}
                        </span>
                        <Badge className="bg-emerald-600/90 hover:bg-emerald-500 text-white shadow-lg text-xs">
                          -{service.discount.toFixed(1)}%
                        </Badge>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:flex md:items-center md:justify-between">
                {/* Left: icon, id badge, title */}
                <div className="flex items-start gap-4 flex-1">
                  <img
                    src={service.icon || "/placeholder.svg"}
                    alt={service.network}
                    className="w-6 h-6 rounded mt-1"
                  />
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-violet-600/90 text-white hover:bg-violet-500 shadow-lg">
                        {service.id}
                      </Badge>
                    </div>
                    <h3 className="text-sm md:text-[15px] leading-snug text-gray-200 group-hover:text-violet-300 transition-colors">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Right: price block and order button */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-100 group-hover:text-violet-300 transition-colors">
                        {formatPrice(service.price as number, currency)}
                      </span>
                    </div>
                    {service.oldPrice && service.discount > 0 ? (
                      <div className="flex items-center gap-2 justify-end">
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(service.oldPrice as number, currency)}
                        </span>
                        <Badge className="bg-emerald-600/90 hover:bg-emerald-500 text-white shadow-lg">
                          -{service.discount.toFixed(1)}%
                        </Badge>
                      </div>
                    ) : null}
                  </div>
                  <Button
                    onClick={() => onServiceClick(service)}
                    size="sm"
                    className="bg-violet-600 hover:bg-violet-500 text-white"
                  >
                    Order
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
