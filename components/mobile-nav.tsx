"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Instagram, Youtube, Twitter, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

const platformCategories = [
  {
    name: "Instagram",
    icon: Instagram,
    services: ["Followers", "Likes", "Views", "Story Views"],
  },
  {
    name: "TikTok",
    icon: MessageCircle,
    services: ["Followers", "Likes", "Views", "Comments", "Shares"],
  },
  {
    name: "YouTube",
    icon: Youtube,
    services: ["Subscribers", "Likes", "Views"],
  },
  {
    name: "Twitter/X",
    icon: Twitter,
    services: ["Views", "Followers", "Likes"],
  },
  {
    name: "Other Platforms",
    icon: MessageCircle,
    services: ["Telegram", "Facebook", "Twitch", "Spotify", "Reddit", "WhatsApp"],
  },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 bg-gray-950 border-gray-800">
        <SheetHeader>
          <SheetTitle className="text-left text-white">
            <div className="flex items-center gap-3">
              <img src="/luminar-logo.png" alt="Luminar Logo" className="h-6 w-auto" />
              Luminar Services
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md transition-colors"
          >
            Home
          </Link>

          <Link
            href="/products"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md transition-colors"
          >
            All Products
          </Link>

          <div className="space-y-2">
            <h3 className="px-3 text-sm font-semibold text-gray-400 uppercase tracking-wider">Services by Platform</h3>
            {platformCategories.map((category) => (
              <Collapsible key={category.name}>
                <CollapsibleTrigger className="flex w-full items-center justify-between px-3 py-2 text-white hover:bg-gray-800 rounded-md transition-colors">
                  <div className="flex items-center gap-2">
                    <category.icon className="h-4 w-4" />
                    {category.name}
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-6 space-y-1">
                  {category.services.map((service) => (
                    <Link
                      key={service}
                      href="/products"
                      onClick={() => setOpen(false)}
                      className="block px-3 py-1 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                    >
                      {service}
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-4 space-y-2">
            <Link
              href="/refund-policy"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md transition-colors"
            >
              Refund Policy
            </Link>

            <Link
              href="https://discord.gg/cc6k5bswbC"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-white hover:bg-gray-800 rounded-md transition-colors"
            >
              Discord Support
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
