"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
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
      <CardHeader className="flex-row items-center justify-between space-y-0 bg-gray-900/50 border-b border-gray-800/50">
        <div className="flex items-center gap-3">
          <img src={services[0]?.icon || "/placeholder.svg"} alt={category} className="w-6 h-6 rounded" />
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-100">{category}</h2>
          </div>
        </div>
        <span className="text-xs text-gray-400 bg-gray-800/30 px-3 py-1 rounded-full">Price per 1000</span>
      </CardHeader>
      <CardContent className="p-0">
        {services.map((service, index) => {
          return (
            <div
              key={service.id}
              onClick={() => onServiceClick(service)}
              className={`flex flex-col gap-3 md:flex-row md:items-center md:justify-between p-6 hover:bg-gray-900/40 transition-all duration-300 cursor-pointer border-b border-gray-800/30 last:border-b-0 group ${
                index % 2 === 0 ? "bg-gray-950/40" : "bg-gray-900/20"
              }`}
            >
              {/* Left: icon, id badge, title */}
              <div className="flex items-start gap-4 flex-1">
                <img src={service.icon || "/placeholder.svg"} alt={service.network} className="w-6 h-6 rounded mt-1" />
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

              {/* Right: price block */}
              <div className="md:text-right flex items-center md:items-end gap-2 md:gap-3">
                <div className="flex flex-col items-start md:items-end">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-100 group-hover:text-violet-300 transition-colors">
                      {formatPrice(service.price as number, currency)}
                    </span>
                  </div>
                  {service.oldPrice && service.discount > 0 ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(service.oldPrice as number, currency)}
                      </span>
                      <Badge className="bg-emerald-600/90 hover:bg-emerald-500 text-white shadow-lg">
                        -{service.discount.toFixed(1)}%
                      </Badge>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
