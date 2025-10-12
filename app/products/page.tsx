"use client"
import { useMemo, useState, useEffect } from "react"
import { ProductsHeader } from "@/components/products-header"
import { ProductsSearchBar } from "@/components/products-search-bar"
import { ServiceCard } from "@/components/service-card"
import { OrderDialog } from "@/components/order-dialog"
import { ChangelogDialog } from "@/components/changelog-dialog"
import { services, networks, type Service } from "@/lib/services-data"
import { formatPrice, fetchRealTimeCurrencyRates } from "@/lib/currency-utils"

// Loading Component with enhanced animations
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
        {/* Enhanced loading text */}
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

        {/* Enhanced progress bar */}
        <div className="w-80 h-2 bg-gray-800 rounded-full overflow-hidden shadow-inner relative">
          {/* Dynamic progress bar */}
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full shadow-lg transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
          
          {/* Glow effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-sm transition-all duration-200"
            style={{ width: `${Math.max(progress * 0.8, 20)}%` }}
          ></div>
        </div>

        {/* Pulse effect */}
        <div className="w-80 h-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 rounded-full blur-md"></div>
      </div>
    </div>
  )
}

// Enhanced ProductsSearchBar component
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
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isNetworkFocused, setIsNetworkFocused] = useState(false)
  const [isCurrencyFocused, setIsCurrencyFocused] = useState(false)

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-6 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50 shadow-sm">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Enhanced Search Bar */}
        <div className="flex-1 relative">
          <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${isSearchFocused ? 'text-foreground' : 'text-muted-foreground'}`}>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 ${
              isSearchFocused 
                ? 'border-primary shadow-sm' 
                : 'border-border bg-background'
            } focus:outline-none focus:ring-2 focus:ring-primary/20`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Enhanced Network Selector */}
        <div className="relative w-full md:w-48">
          <select
            value={selectedNetwork}
            onChange={(e) => setSelectedNetwork(e.target.value)}
            onFocus={() => setIsNetworkFocused(true)}
            onBlur={() => setIsNetworkFocused(false)}
            className={`w-full pl-4 pr-10 py-3 rounded-lg border transition-all duration-200 appearance-none ${
              isNetworkFocused 
                ? 'border-primary shadow-sm' 
                : 'border-border bg-background'
            } focus:outline-none focus:ring-2 focus:ring-primary/20`}
          >
            <option value="all">All Networks</option>
            {networks.map((network) => (
              <option key={network.id} value={network.id}>
                {network.name}
              </option>
            ))}
          </select>
          <div className={`absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none transition-transform ${isNetworkFocused ? 'rotate-180' : ''}`}>
            <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Enhanced Currency Selector */}
        <div className="relative w-full md:w-40">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            onFocus={() => setIsCurrencyFocused(true)}
            onBlur={() => setIsCurrencyFocused(false)}
            className={`w-full pl-4 pr-10 py-3 rounded-lg border transition-all duration-200 appearance-none ${
              isCurrencyFocused 
                ? 'border-primary shadow-sm' 
                : 'border-border bg-background'
            } focus:outline-none focus:ring-2 focus:ring-primary/20`}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="BTC">BTC</option>
          </select>
          <div className={`absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none transition-transform ${isCurrencyFocused ? 'rotate-180' : ''}`}>
            <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

// Enhanced ProductsHeader component
function EnhancedProductsHeader({
  currency,
  setCurrency,
  onChangelogClick,
}: {
  currency: string
  setCurrency: (currency: string) => void
  onChangelogClick: () => void
}) {
  const [isCurrencyHovered, setIsCurrencyHovered] = useState(false)
  const [isChangelogHovered, setIsChangelogHovered] = useState(false)

  return (
    <header className="w-full max-w-7xl mx-auto px-4 md:px-6 py-6 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ServiceHub
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Enhanced Currency Selector */}
          <div 
            className="relative"
            onMouseEnter={() => setIsCurrencyHovered(true)}
            onMouseLeave={() => setIsCurrencyHovered(false)}
          >
            <div className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-border bg-background transition-all duration-200 hover:border-primary cursor-pointer">
              <span className="text-sm font-medium">Currency</span>
              <span className="font-semibold text-primary">{currency}</span>
              <svg 
                className={`h-4 w-4 text-muted-foreground transition-transform ${isCurrencyHovered ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className={`absolute top-full mt-1 right-0 bg-background border border-border rounded-lg shadow-lg py-1 transition-all duration-200 ${isCurrencyHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              {["USD", "EUR", "GBP", "JPY", "BTC"].map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors ${currency === curr ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Changelog Button */}
          <button
            onClick={onChangelogClick}
            onMouseEnter={() => setIsChangelogHovered(true)}
            onMouseLeave={() => setIsChangelogHovered(false)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-border bg-background transition-all duration-200 hover:border-primary hover:bg-accent"
          >
            <svg 
              className={`h-5 w-5 transition-transform ${isChangelogHovered ? 'scale-110' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="text-sm font-medium">Changelog</span>
          </button>
        </div>
      </div>
    </header>
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
      {/* Enhanced Header */}
      <EnhancedProductsHeader 
        currency={currency} 
        setCurrency={setCurrency} 
        onChangelogClick={() => setIsChangelogOpen(true)} 
      />

      {/* Enhanced Search Bar */}
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
