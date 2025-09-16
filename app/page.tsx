"use client"

import Link from "next/link"
import DarkVeil from "@/components/dark-veil"
import { Button } from "@/components/ui/button"
import StarBorder from "@/components/StarBorder"
import { MobileNav } from "@/components/mobile-nav"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/80 border-b border-border">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <MobileNav />
            <img src="/luminar-logo.png" alt="Luminar Services Logo" className="h-8 w-auto" />
            <span className="hidden sm:inline text-sm text-muted-foreground">Luminar Services</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="https://discord.gg/7QTRtZvDXH"
              className="hidden md:inline text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Discord
            </Link>
            <Button asChild variant="ghost" className="hidden md:inline-flex text-white hover:text-violet-200">
              <Link href="/refund-policy">Refund Policy</Link>
            </Button>
            <Button asChild className="bg-violet-600 hover:bg-violet-500">
              <Link href="/products">See products</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero with DarkVeil */}
      <section className="relative">
        <div style={{ width: "100%", height: "600px", position: "relative" }}>
          <DarkVeil
            hueShift={40}
            noiseIntensity={0.05}
            scanlineIntensity={0.1}
            scanlineFrequency={9}
            speed={0.65}
            warpAmount={0.3}
            resolutionScale={1}
          />
          {/* Gradient overlays for readability */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_60%,rgba(0,0,0,0.7)_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
          {/* Centered content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="px-6 text-center max-w-4xl animate-fadeIn">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Grow your social presence with confidence
              </h1>
              <p className="mt-4 text-gray-300 text-base md:text-lg">
                Professional SMM services for Instagram, TikTok, YouTube, Telegram, Twitter (X), Facebook, Reddit and
                more.
              </p>
              <div className="mt-8 flex items-center justify-center gap-6">
                {/* Rex Profile */}
                <StarBorder
                  as="div"
                  color="red"
                  speed="4s"
                  className="hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center gap-4">
                    <img src="Luminar/puplic/rex-avatar.png" alt="Rex avatar" className="w-14 h-14 rounded-full object-cover" />
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-lg">Rex</span>
                      <span className="text-red-400 font-semibold text-sm mb-1">Owner</span>
                      <span className="text-gray-400 text-sm">@unreal030</span>
                    </div>
                  </div>
                </StarBorder>

                {/* Fox Profile */}
                <StarBorder
                  as="div"
                  color="orange"
                  speed="4s"
                  className="hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex items-center gap-4">
                    <img src="Luminar/puplic/fox-avatar.png" alt="Fox avatar" className="w-14 h-14 rounded-full object-cover" />
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-lg">Fox</span>
                      <span className="text-orange-400 font-semibold text-sm mb-1">Co-Owner</span>
                      <span className="text-gray-400 text-sm">@encryptedfox</span>
                    </div>
                  </div>
                </StarBorder>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section id="highlights" className="py-4 md:py-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex flex-col items-center justify-center gap-4">
            <Button
              asChild
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl hover:shadow-violet-500/25 transform hover:scale-105 transition-all duration-300 ease-out border border-violet-500/20"
            >
              <Link href="/products" className="flex items-center gap-2">
                See products
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-violet-500/50 text-violet-900 bg-violet-100/90 hover:bg-violet-200 hover:border-violet-400 hover:text-violet-800 px-6 py-2 rounded-lg shadow-md hover:shadow-lg hover:shadow-violet-500/20 transform hover:scale-105 transition-all duration-300 ease-out text-sm"
            >
              <Link href="/valued-customers" className="flex items-center gap-2">
                Valued Customers
                <svg
                  className="w-3 h-3 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:bg-accent hover:border-accent-foreground/20 hover:scale-105 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-violet-500/10 animate-fadeIn">
              <h3 className="text-lg font-semibold">Instant start</h3>
              <p className="mt-2 text-muted-foreground text-sm">
                Many services begin processing within minutes so you see results fast.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:bg-accent hover:border-accent-foreground/20 hover:scale-105 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-violet-500/10 animate-fadeIn">
              <h3 className="text-lg font-semibold">Clear pricing</h3>
              <p className="mt-2 text-muted-foreground text-sm">
                Prices are per 1000 units with automatic currency conversion.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:bg-accent hover:border-accent-foreground/20 hover:scale-105 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-violet-500/10 animate-fadeIn">
              <h3 className="text-lg font-semibold">Wide coverage</h3>
              <p className="mt-2 text-muted-foreground text-sm">
                From followers and likes to views and members across top platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        <span className="opacity-80">Luminar Services</span>
      </footer>
    </main>
  )
}
