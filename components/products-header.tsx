"use client"

import Link from "next/link"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MobileNav } from "@/components/mobile-nav"

interface ProductsHeaderProps {
  currency: string
  setCurrency: (currency: string) => void
  onChangelogClick: () => void
}

const currencies = ["EUR", "USD", "PLN", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR"]

export function ProductsHeader({ currency, setCurrency, onChangelogClick }: ProductsHeaderProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/80 border-b border-border">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <MobileNav />
          <Link href="/" className="flex items-center gap-3">
            <img src="/luminar-logo.png" alt="Luminar Logo" className="h-8 w-auto" />
            <span className="hidden md:inline text-sm text-muted-foreground">Luminar Services</span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={onChangelogClick}
            className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <Bell className="h-4 w-4" />
            Change log
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">{currency}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-popover border-border">
                {currencies.map((c) => (
                  <DropdownMenuItem key={c} onClick={() => setCurrency(c)}>
                    {c === "EUR" && "€ "} {c === "USD" && "$ "}
                    {c === "PLN" && "zł "}
                    {c === "GBP" && "£ "}
                    {c === "JPY" && "¥ "}
                    {c === "CAD" && "C$ "}
                    {c === "AUD" && "A$ "}
                    {c === "CHF" && "CHF "}
                    {c === "CNY" && "¥ "}
                    {c === "INR" && "₹ "}
                    {c}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button asChild variant="ghost" className="hidden md:inline-flex text-foreground hover:text-primary">
            <Link href="/refund-policy">Refund Policy</Link>
          </Button>

          <Button asChild>
            <Link href="/">Home</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
