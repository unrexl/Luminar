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

// Custom Network Dropdown Component with site styling
function NetworkDropdown({
  selectedNetwork,
  setSelectedNetwork,
  networks,
}: {
  selectedNetwork: string
  setSelectedNetwork: (network: string) => void
  networks: any[]
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(selectedNetwork)
  
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

  const handleSelect = (optionValue: string) => {
    setSelected(optionValue)
    setSelectedNetwork(optionValue)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest('.network-dropdown')) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <div className={`relative network-dropdown ${isOpen ? 'z-50' : ''}`}>
      <div
        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 flex justify-between items-center hover:border-blue-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate text-gray-800">
          {selected ? networkOptions.find(opt => opt.value === selected)?.label || "All Networks" : "All Networks"}
        </span>
        <svg
          className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto transition-all duration-200 transform origin-top">
          {networkOptions.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-3 cursor-pointer transition-colors duration-150 ${
                selected === option.value 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-800 hover:bg-gray-100'
              }`}
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

// Enhanced ProductsSearchBar component with consistent styling
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
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar - Enhanced styling */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-800 placeholder-gray-500"
          />
        </div>

        {/* Network Selector - Enhanced styling */}
        <div className="w-full md:w-48">
          <NetworkDropdown
            selectedNetwork={selectedNetwork}
            setSelectedNetwork={setSelectedNetwork}
            networks={networks}
          />
        </div>

        {/* Currency Selector - Enhanced styling */}
        <div className="relative w-full md:w-40">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full pl-4 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-gray-800"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="BTC">BTC</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
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
