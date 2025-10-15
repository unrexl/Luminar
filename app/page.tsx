"use client"

import Link from "next/link"
import { useState } from "react"
import DarkVeil from "@/components/dark-veil"
import { Button } from "@/components/ui/button"
import StarBorder from "@/components/StarBorder"
import { MobileNav } from "@/components/mobile-nav"

// Profile Modal Component
function ProfileModal({ isOpen, onClose }) {
  return (
    <>
      {/* Backdrop with smooth transition */}
      <div 
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-md transition-all duration-700 ease-out ${
          isOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className={`fixed inset-0 z-[101] flex items-center justify-center p-4 transition-all duration-700 ease-out ${
        isOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
      }`}>
        <div className={`relative w-full max-w-sm transform transition-all duration-700 ease-out ${
          isOpen 
            ? 'scale-100 translate-y-0 opacity-100' 
            : 'scale-75 translate-y-8 opacity-0'
        }`}>
          
          {/* Glass Card */}
          <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-8 shadow-2xl overflow-hidden">
            
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-500/10 rounded-3xl" />
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 text-white/60 hover:text-white transition-all duration-300 rounded-full p-1.5 sm:p-2 hover:bg-white/10 hover:scale-110 active:scale-95"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <div className="relative flex flex-col items-center text-center">
              
              {/* Profile Picture with smooth scale animation */}
              <div className={`mb-4 sm:mb-6 transform transition-all duration-700 delay-100 ease-out ${
                isOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
              }`}>
                <div className="relative">
                  <StarBorder
                    as="div"
                    color="red"
                    speed="3s"
                    className="p-1"
                  >
                    <img
                      src="/icons/rex.png"
                      alt="unrexl avatar"
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover"
                    />
                  </StarBorder>
                  {/* Online indicator */}
                  <div className="absolute bottom-2 right-2 w-4 h-4 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-black/40 animate-pulse" />
                </div>
              </div>

              {/* Profile Info with staggered animations */}
              <div className={`mb-6 sm:mb-8 transform transition-all duration-700 delay-200 ease-out ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">rex</h2>
                <p className="text-red-400/90 font-medium mb-2 sm:mb-4 text-sm sm:text-base">@unreal030</p>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">
                  &gt;_&lt;
                </p>
              </div>

              {/* Socials */}
              <div className={`mb-6 sm:mb-8 space-y-3 w-full transform transition-all duration-700 delay-300 ease-out ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.120.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white font-medium text-sm">Discord</p>
                    <p className="text-white/60 text-xs">unreal030</p>
                  </div>
                  <button 
                    onClick={() => navigator.clipboard.writeText('1027964226544869507')}
                    className="text-white/40 hover:text-white/80 transition-colors text-xs px-1.5 py-0.5 rounded hover:bg-white/10"
                  >
                    Copy ID
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <div className={`w-full transform transition-all duration-700 delay-400 ease-out ${
                isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                <Button 
                  asChild 
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-medium py-2.5 sm:py-3 rounded-xl shadow-lg hover:shadow-xl hover:shadow-red-500/20 transform hover:scale-105 active:scale-95 transition-all duration-300 border-0 text-sm sm:text-base"
                >
                  <Link href="https://guns.lol/unrexl" target="_blank" rel="noopener noreferrer">
                    Visit Profile
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function HomePage() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/80 border-b border-border">
        <div className="mx-auto flex h-14 sm:h-16 w-full max-w-7xl items-center justify-between px-2 sm:px-3 md:px-6 gap-1 sm:gap-2 md:gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 min-w-0">
            <MobileNav />
            <img src="/luminar-logo.png" alt="Luminar Services Logo" className="h-5 sm:h-6 md:h-8 w-auto flex-shrink-0" />
            <span className="hidden sm:inline text-xs sm:text-sm text-muted-foreground whitespace-nowrap">Luminar Services</span>
          </div>
          <nav className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
            <a
              href="https://discord.gg/7QTRtZvDXH"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-violet-500/25 hover:scale-105 border border-violet-500/20 whitespace-nowrap"
            >
              Discord
            </a>
            <a
              href="/refund-policy"
              className="px-1.5 sm:px-2 md:px-3 py-1.5 text-xs font-medium text-white bg-gray-800/80 rounded-lg hover:bg-gray-700 transition-all duration-300 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600 hover:scale-105 shadow-sm whitespace-nowrap"
            >
              <span className="hidden sm:inline">Refund Policy</span>
              <span className="sm:hidden">Refund</span>
            </a>
          </nav>
        </div>
      </header>

      {/* Hero with DarkVeil */}
      <section className="relative">
        <div style={{ width: "100%", height: "500px", position: "relative" }}>
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
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="px-4 sm:px-6 text-center max-w-4xl animate-fadeIn">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Grow your social presence with confidence
              </h1>
              <p className="mt-3 sm:mt-4 text-gray-300 text-sm sm:text-base md:text-lg">
                Professional SMM services for Instagram, TikTok, YouTube, Telegram, Twitter (X), Facebook, Reddit and
                more.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                {/* Rex Profile - Now Clickable */}
                <StarBorder
                  as="button"
                  color="red"
                  speed="4s"
                  className="hover:scale-105 transition-transform duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-background w-full sm:w-auto max-w-[200px] sm:max-w-none"
                  onClick={() => setIsProfileModalOpen(true)}
                >
                  <div className="flex items-center gap-2 sm:gap-4">
                    <img src="/icons/rex.png" alt="unrexl avatar" className="w-14 h-14 sm:w-14 sm:h-14 rounded-full object-cover" />
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-base sm:text-lg">rex</span>
                      <span className="text-red-400 font-semibold text-xs sm:text-sm mb-1">Owner</span>
                      <span className="text-gray-400 text-xs sm:text-sm">@unreal030</span>
                    </div>
                  </div>
                </StarBorder>

                {/* Fox Profile */}
                <StarBorder
                  as="div"
                  color="orange"
                  speed="4s"
                  className="hover:scale-105 transition-transform duration-300 w-full sm:w-auto max-w-[200px] sm:max-w-none"
                >
                  <div className="flex items-center gap-2 sm:gap-4">
                    <img src="/fox-avatar.png" alt="Fox avatar" className="w-14 h-14 sm:w-14 sm:h-14 rounded-full object-cover" />
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-base sm:text-lg">Fox</span>
                      <span className="text-orange-400 font-semibold text-xs sm:text-sm mb-1">Co-Owner</span>
                      <span className="text-gray-400 text-xs sm:text-sm">@encryptedfox</span>
                    </div>
                  </div>
                </StarBorder>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section id="highlights" className="py-3 sm:py-4 md:py-6">
        <div className="mx-auto max-w-7xl px-3 sm:px-4">
          <div className="mb-8 sm:mb-10 flex flex-col items-center justify-center gap-3 sm:gap-4">
            <a
              href="/products"
              className="inline-flex items-center gap-1.5 sm:gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg shadow-lg hover:shadow-xl hover:shadow-violet-500/25 transform hover:scale-105 transition-all duration-300 ease-out border border-violet-500/20 text-sm sm:text-base"
            >
              See products
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm hover:bg-accent hover:border-accent-foreground/20 hover:scale-105 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-violet-500/10 animate-fadeIn">
              <h3 className="text-base sm:text-lg font-semibold">Instant start</h3>
              <p className="mt-2 text-muted-foreground text-sm">
                Many services begin processing within minutes so you see results fast.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm hover:bg-accent hover:border-accent-foreground/20 hover:scale-105 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-violet-500/10 animate-fadeIn">
              <h3 className="text-base sm:text-lg font-semibold">Clear pricing</h3>
              <p className="mt-2 text-muted-foreground text-sm">
                Prices are per 1000 units with automatic currency conversion.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-sm hover:bg-accent hover:border-accent-foreground/20 hover:scale-105 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-violet-500/10 animate-fadeIn">
              <h3 className="text-base sm:text-lg font-semibold">Wide coverage</h3>
              <p className="mt-2 text-muted-foreground text-sm">
                From followers and likes to views and members across top platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
      />

      {/* Footer */}
      <footer className="border-t border-border py-4 sm:py-6 text-center text-xs sm:text-sm text-muted-foreground">
        <span className="opacity-80">Luminar Services</span>
      </footer>
    </main>
  )
}
