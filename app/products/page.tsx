"use client"
import { useMemo, useState, useEffect } from "react"
import { ProductsHeader } from "@/components/products-header"
import { ProductsSearchBar } from "@/components/products-search-bar"
import { ServiceCard } from "@/components/service-card"
import { OrderDialog } from "@/components/order-dialog"
import { ChangelogDialog } from "@/components/changelog-dialog"
import { services, networks, type Service } from "@/lib/services-data"
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
        // Faster initial loading, then slower towards the end
        const increment = prev < 70 ? Math.random() * 20 + 10 : Math.random() * 5 + 2
        return Math.min(prev + increment, 100)
      })
    }, 80) // Faster interval for quicker loading

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex flex-col items-center space-y-6">
        {/* Loading text */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-white mb-2">
            Loading
            <span className="inline-block animate-bounce ml-1">.</span>
            <span className="inline-block animate-bounce ml-0.5" style={{ animationDelay: "0.1s" }}>
              .
            </span>
            <span className="inline-block animate-bounce ml-0.5" style={{ animationDelay: "0.2s" }}>
              .
            </span>
          </h3>
          <p className="text-gray-400 text-sm">{Math.round(progress)}%</p>
        </div>

        {/* Progress bar container */}
        <div className="w-80 h-2 bg-gray-800 rounded-full overflow-hidden shadow-inner">
          {/* Dynamic progress bar */}
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full shadow-lg transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Glow effect under progress bar */}
        <div
          className="h-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-sm transition-all duration-200"
          style={{ width: `${Math.max(progress * 0.8, 20)}%` }}
        ></div>
      </div>
    </div>
  )
}

// Custom Dropdown Component
function CustomDropdown({
  value,
  onChange,
  options,
  placeholder = "Select...",
  className = "",
  label = "",
}: {
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string; label: string }>
  placeholder?: string
  className?: string
  label?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(value)

  const handleSelect = (optionValue: string) => {
    setSelected(optionValue)
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div
        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <span>{selected ? options.find(opt => opt.value === selected)?.label || placeholder : placeholder}</span>
          <svg
            className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Enhanced ProductsSearchBar component with custom dropdowns
function EnhancedProductsSearchBar({
  searchQuery,
  setSearchQuery,
  selectedNetwork,
  setSelectedNetwork,
  networks,
  currency,
  setCurrency,
}: {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedNetwork: string
  setSelectedNetwork: (network: string) => void
  networks: any[]
  currency: string
  setCurrency: (currency: string) => void
}) {
  // Filter networks to only include the specified IDs
  const allowedNetworkIds = [
    "all", 
    "instagram", 
    "tiktok", 
    "twitter", 
    "youtube", 
    "telegram", 
    "facebook", 
    "twitch", 
    "spotify", 
    "reddit", 
    "whatsapp", 
    "snapchat", 
    "kick", 
    "discord", 
    "google"
  ];
  
  const filteredNetworks = networks.filter(network => allowedNetworkIds.includes(network.id));
  
  // Network options
  const networkOptions = [
    { value: "all", label: "All Networks" },
    ...filteredNetworks.map(network => ({
      value: network.id,
      label: network.name
    }))
  ];
  
  // Currency options
  const currencyOptions = [
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
    { value: "GBP", label: "GBP" },
    { value: "JPY", label: "JPY" },
    { value: "BTC", label: "BTC" }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Enhanced Search Bar */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services..."
            className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Enhanced Network Selector */}
        <div className="w-full md:w-48">
          <CustomDropdown
            value={selectedNetwork}
            onChange={setSelectedNetwork}
            options={networkOptions}
            placeholder="All Networks"
            className="w-full"
          />
        </div>

        {/* Enhanced Currency Selector */}
        <div className="w-full md:w-40">
          <CustomDropdown
            value={currency}
            onChange={setCurrency}
            options={currencyOptions}
            placeholder="Currency"
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  const [selectedNetwork, setSelectedNetwork] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currency, setCurrency] = useState("EUR")
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isChangelogOpen, setIsChangelogOpen] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false)
  const [currencyRates, setCurrencyRates] = useState<Record<string, number>>({})

  // Remove duplicate network entries
  const uniqueNetworks = useMemo(() => {
    const networkMap = new Map()
    networks.forEach(network => {
      if (!networkMap.has(network.id)) {
        networkMap.set(network.id, network)
      }
    })
    return Array.from(networkMap.values())
  }, [networks])

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

    // Update rates every 30 minutes
    const interval = setInterval(loadCurrencyRates, 30 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  // Simulate page loading process
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setPageLoaded(true)
    }, 1200) // Adjust this timing based on your needs (1.2 seconds)

    return () => clearTimeout(loadingTimer)
  }, [])

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesNetwork = selectedNetwork === "all" || service.network === selectedNetwork
      const matchesSearch = service.title ? service.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
      return matchesNetwork && matchesSearch
    })
  }, [selectedNetwork, searchQuery])

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
    }, 300) // Small delay for loading animation
  }

  const closeOrder = () => {
    setSelectedService(null)
  }

  // Show loading screen until page is loaded
  if (!pageLoaded) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProductsHeader currency={currency} setCurrency={setCurrency} onChangelogClick={() => setIsChangelogOpen(true)} />

      <EnhancedProductsSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedNetwork={selectedNetwork}
        setSelectedNetwork={setSelectedNetwork}
        networks={uniqueNetworks}
        currency={currency}
        setCurrency={setCurrency}
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
