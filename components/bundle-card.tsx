"use client"

import { type Bundle } from "@/lib/bundles-data"

interface BundleCardProps {
  platform: string
  bundles: Bundle[]
  formatPrice: (price: number, currency: string) => string
  currency: string
  onBundleClick: (bundle: Bundle) => void
}

export function BundleCard({ platform, bundles, formatPrice, currency, onBundleClick }: BundleCardProps) {
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
