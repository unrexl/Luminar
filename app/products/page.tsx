"use client"

import { useMemo, useState, useEffect } from "react"
import { ServiceCard } from "@/components/service-card"
import { OrderDialog } from "@/components/order-dialog"
import { Header } from "@/components/header"
import { ChangelogDialog } from "@/components/changelog-dialog"
import { Loading } from "@/components/loading"

// Types
interface Service {
  id: string
  title: string
  category: string
  description?: string
  price: number
  minQuantity?: number
  maxQuantity?: number
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
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-5">
      <div className="flex justify-end">
        <div className="relative w-56">
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
            className={`w-full pl-9 pr-3 py-2 text-sm rounded-xl border transition-all duration-300 bg-gray-900/60 backdrop-blur-sm text-gray-200 placeholder-gray-500 ${
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

// Currency conversion utility
async function fetchRealTimeCurrencyRates(): Promise<Record<string, number>> {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
    const data = await response.json()
    return data.rates
  } catch (error) {
    console.error('Failed to fetch currency rates:', error)
    return { EUR: 0.92, USD: 1, GBP: 0.79 }
  }
}

function formatPrice(price: number, currency: string, rates: Record<string, number>): string {
  const rate = rates[currency] || 1
  const converted = price * rate
  const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$'
  return `${symbol}${converted.toFixed(2)}`
}

// Sample services data - replace with your actual data
const services: Service[] = [
  {
    id: "1",
    title: "Instagram Followers",
    category: "Instagram",
    description: "High quality Instagram followers",
    price: 10.00,
    minQuantity: 100,
    maxQuantity: 10000
  },
  {
    id: "2",
    title: "TikTok Views",
    category: "TikTok",
    description: "Boost your TikTok video views",
    price: 5.00,
    minQuantity: 1000,
    maxQuantity: 100000
  },
  // Add more services here
]

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
      <main className="mx-auto w-full max-w-7xl px-4 md:px-6 py-8">
        <div className="space-y-8">
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
