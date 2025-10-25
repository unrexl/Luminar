"use client"

import { useMemo, useState, useEffect } from "react"
import { ServiceCard } from "@/components/service-card"
import { OrderDialog } from "@/components/order-dialog"
import { ChangelogDialog } from "@/components/changelog-dialog"
import { services, type Service } from "@/lib/services-data"
import { formatPrice, fetchRealTimeCurrencyRates } from "@/lib/currency-utils"

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
          {/* Left: Brand Logo and Name */}
          <div className="flex items-center space-x-3">
            <img 
              src="/luminar-logo.png"
              alt="Luminar Services"
              className="h-8 sm:h-10 w-8 sm:w-10 object-contain rounded-lg"
            />
            <span className="text-lg sm:text-xl font-bold text-white">Luminar Services</span>
          </div>

          {/* Right: Navigation Buttons */}
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
            placeholder="Search services..."
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

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currency] = useState("EUR")
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isChangelogOpen, setIsChangelogOpen] = useState(false)
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

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch = service.title ? service.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
      return matchesSearch
    })
  }, [searchQuery])

  const groupedServices = useMemo(() => {
    return filteredServices.reduce(
      (acc, service) => {
        if (!acc[service.category]) acc[service.category] = []
        acc[service.category].push(service)
        return acc
      },
      {} as Record<string, Service[]>,
    )
  }, [filteredServices])

  const openOrder = (service: Service) => {
    setIsLoading(true)
    setTimeout(() => {
      setSelectedService(service)
      setIsLoading(false)
    }, 300)
  }

  const closeOrder = () => {
    setSelectedService(null)
  }

  if (!pageLoaded) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Header with Brand and Navigation */}
      <Header />

      {/* Compact Search Bar - Right Aligned */}
      <CompactSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Content */}
      <main className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-6 py-4 sm:py-8">
        <div className="space-y-6 sm:space-y-8">
          {Object.entries(groupedServices).map(([category, categoryServices]) => (
            <ServiceCard
              key={category}
              category={category}
              services={categoryServices}
              formatPrice={(price, curr) => formatPrice(price, curr, currencyRates)}
              currency={currency}
              onServiceClick={openOrder}
            />
          ))}
        </div>
      </main>

      <OrderDialog
        selectedService={selectedService}
        isLoading={isLoading}
        onClose={closeOrder}
        formatPrice={(price, curr) => formatPrice(price, curr, currencyRates)}
        currency={currency}
      />

      <ChangelogDialog isOpen={isChangelogOpen} onOpenChange={setIsChangelogOpen} />
    </div>
  )
}
