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
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">All Products</h1>
            <p className="text-sm text-muted-foreground">Browse services and switch currency as needed.</p>
          </div>
          <div className="flex w-full md:w-auto items-center gap-2">
            <div className="relative hidden md:block w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search services"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-border bg-secondary text-muted-foreground hover:bg-secondary/80"
                >
                  {selectedNetwork === "all"
                    ? "All networks"
                    : networks.find((n) => n.id === selectedNetwork)?.name || "All networks"}
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

            {/* Mobile search */}
            <div className="relative md:hidden flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search services"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Mobile currency */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-border bg-secondary text-muted-foreground hover:bg-secondary/80"
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
