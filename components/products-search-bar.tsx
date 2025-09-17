"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Network {
  id: string
  name: string
  icon: string
}

interface ProductsSearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedNetwork: string
  setSelectedNetwork: (network: string) => void
  networks: Network[]
  currency: string
  setCurrency: (currency: string) => void
}

const currencies = ["EUR", "USD", "PLN", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR"]

export function ProductsSearchBar({
  searchQuery,
  setSearchQuery,
  selectedNetwork,
  setSelectedNetwork,
  networks,
  currency,
  setCurrency,
}: ProductsSearchBarProps) {
  return (
    <div className="border-b border-border bg-background/60">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 py-4 md:py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">All Products</h1>
            <p className="text-xs md:text-sm text-muted-foreground">Browse services and switch currency as needed.</p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2">
            {/* Search bar - full width on mobile */}
            <div className="relative w-full md:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search services"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Network and Currency dropdowns - side by side on mobile */}
            <div className="flex gap-2 w-full md:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-border bg-secondary text-muted-foreground hover:bg-secondary/80 flex-1 md:flex-none text-sm"
                  >
                    {selectedNetwork === "all"
                      ? "All Networks"
                      : networks.find((n) => n.id === selectedNetwork)?.name || "All Networks"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-popover border-border">
                  {networks.map((n) => (
                    <DropdownMenuItem
                      key={n.id}
                      onClick={() => setSelectedNetwork(n.id)}
                      className="hover:bg-secondary flex items-center gap-2"
                    >
                      {n.id !== "all" ? (
                        <img src={n.icon || "/placeholder.svg"} alt={n.name} className="w-4 h-4 rounded" />
                      ) : (
                        <span className="text-base">🌐</span>
                      )}
                      {n.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-border bg-secondary text-muted-foreground hover:bg-secondary/80 min-w-[80px]"
                  >
                    {currency}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-popover border-border">
                  {currencies.map((c) => (
                    <DropdownMenuItem key={c} onClick={() => setCurrency(c)} className="hover:bg-secondary">
                      {c}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
