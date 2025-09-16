"use client"

import { useMemo, useState, useEffect } from "react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ProductsHeader } from "@/components/products-header"
import { ProductsSearchBar } from "@/components/products-search-bar"
import { ServiceCard } from "@/components/service-card"
import { OrderDialog } from "@/components/order-dialog"
import { ChangelogDialog } from "@/components/changelog-dialog"
import { services, networks, type Service } from "@/lib/services-data"
import { formatPrice } from "@/lib/currency-utils"

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

export default function ProductsPage() {
  const [selectedNetwork, setSelectedNetwork] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [currency, setCurrency] = useState("EUR")
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isChangelogOpen, setIsChangelogOpen] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false)

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
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground">
        <ProductsHeader
          currency={currency}
          setCurrency={setCurrency}
          onChangelogClick={() => setIsChangelogOpen(true)}
        />

        <ProductsSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedNetwork={selectedNetwork}
          setSelectedNetwork={setSelectedNetwork}
          networks={networks}
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
                formatPrice={(price, curr) => formatPrice(price, curr)}
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
          formatPrice={(price, curr) => formatPrice(price, curr)}
          currency={currency}
        />

        <ChangelogDialog isOpen={isChangelogOpen} onOpenChange={setIsChangelogOpen} />
      </div>
    </TooltipProvider>
  )
}
