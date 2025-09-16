"use client"
import { Home } from "lucide-react"
import type React from "react"

import { Button } from "@/components/ui/button"
import StarBorder from "@/components/StarBorder"
import DarkVeil from "@/components/dark-veil"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"

interface Position {
  x: number
  y: number
}

export default function ValuedCustomersPage() {
  const router = useRouter()

  // Position states for each profile with much larger distances from sendyouabove
  const [sendyouabovePos, setSendyouabovePos] = useState<Position>({ x: 0, y: 0 })
  const [dwchotshotPos, setDwchotshotPos] = useState<Position>({ x: 0, y: -350 })
  const [tastyPos, setTastyPos] = useState<Position>({ x: -480, y: 280 })
  const [luisPos, setLuisPos] = useState<Position>({ x: 380, y: 320 })

  // Drag states
  const [isDragging, setIsDragging] = useState<string | null>(null)
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 })
  const [initialPos, setInitialPos] = useState<Position>({ x: 0, y: 0 })

  const sendyouaboveRef = useRef<HTMLDivElement>(null)
  const dwchotshotRef = useRef<HTMLDivElement>(null)
  const tastyRef = useRef<HTMLDivElement>(null)
  const luisRef = useRef<HTMLDivElement>(null)

  // Mouse down handler
  const handleMouseDown = (e: React.MouseEvent, profileType: "sendyouabove" | "dwchotshot" | "tasty" | "luis") => {
    e.preventDefault()

    setIsDragging(profileType)
    setDragStart({ x: e.clientX, y: e.clientY })

    if (profileType === "sendyouabove") {
      setInitialPos(sendyouabovePos)
    } else if (profileType === "dwchotshot") {
      setInitialPos(dwchotshotPos)
    } else if (profileType === "tasty") {
      setInitialPos(tastyPos)
    } else if (profileType === "luis") {
      setInitialPos(luisPos)
    }
  }

  // Global mouse events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const deltaX = e.clientX - dragStart.x
      const deltaY = e.clientY - dragStart.y

      const newPos = {
        x: initialPos.x + deltaX,
        y: initialPos.y + deltaY,
      }

      if (isDragging === "sendyouabove") {
        setSendyouabovePos(newPos)
      } else if (isDragging === "dwchotshot") {
        setDwchotshotPos(newPos)
      } else if (isDragging === "tasty") {
        setTastyPos(newPos)
      } else if (isDragging === "luis") {
        setLuisPos(newPos)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(null)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.userSelect = "none"
      document.body.style.cursor = "grabbing"

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        document.body.style.userSelect = ""
        document.body.style.cursor = ""
      }
    }
  }, [isDragging, dragStart, initialPos])

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Subtle Background Animation - Full Coverage */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="w-full h-full scale-110">
          <DarkVeil
            hueShift={280}
            noiseIntensity={0.02}
            scanlineIntensity={0.03}
            scanlineFrequency={2}
            speed={0.2}
            warpAmount={0.1}
            resolutionScale={1}
          />
        </div>
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* "Rest will come soon" sign */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-lg px-4 py-2 pointer-events-none">
          <span className="text-gray-300 text-sm font-medium">The rest will be added soon!</span>
        </div>
      </div>

      {/* Home Button */}
      <div className="absolute top-6 right-6 z-50">
        <Button
          variant="ghost"
          size="default"
          onClick={() => {
            console.log("Button clicked!")
            router.push("/")
          }}
          className="bg-gray-900/80 hover:bg-gray-800/90 border border-gray-700/50 backdrop-blur-sm text-gray-300 hover:text-white transition-all duration-300 cursor-pointer pointer-events-auto px-4 py-2"
        >
          <Home className="h-4 w-4 mr-2" />
          Home
        </Button>
      </div>

      {/* Centered Profiles Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center pointer-events-none">
        {/* Main Profile - sendyouabove (draggable) */}
        <div
          ref={sendyouaboveRef}
          className={`absolute pointer-events-auto select-none ${
            isDragging === "sendyouabove"
              ? "cursor-grabbing scale-105 z-50"
              : "cursor-grab z-10 hover:scale-105 transition-transform duration-200"
          }`}
          style={{
            transform: `translate(${sendyouabovePos.x}px, ${sendyouabovePos.y}px)`,
          }}
          onMouseDown={(e) => handleMouseDown(e, "sendyouabove")}
        >
          <StarBorder as="div" color="pink" speed="6s">
            <div className="flex items-center gap-6 p-2">
              <img
                src="/sendyouabove-avatar.png"
                alt="sendyouabove avatar"
                className="w-20 h-20 rounded-full object-contain pointer-events-none"
                draggable={false}
              />
              <div className="flex flex-col pointer-events-none">
                <span
                  className="text-white font-bold text-2xl relative"
                  style={{
                    textShadow:
                      "0 0 10px rgba(255, 192, 203, 0.6), 0 0 20px rgba(255, 192, 203, 0.4), 0 0 30px rgba(255, 192, 203, 0.2)",
                    filter: "drop-shadow(0 0 8px rgba(255, 192, 203, 0.5))",
                  }}
                >
                  ݁　 ˖ ?
                </span>
                <span className="text-pink-400 font-semibold text-base mb-2">first ever Customer ♡</span>
                <span
                  className="text-gray-300 text-base relative"
                  style={{
                    textShadow: "0 0 8px rgba(255, 192, 203, 0.4), 0 0 16px rgba(255, 192, 203, 0.2)",
                    filter: "drop-shadow(0 0 6px rgba(255, 192, 203, 0.3))",
                  }}
                >
                  @sendyouabove
                </span>
              </div>
            </div>
          </StarBorder>
        </div>

        {/* Secondary Profile - dwchotshot (draggable) */}
        <div
          ref={dwchotshotRef}
          className={`absolute pointer-events-auto select-none ${
            isDragging === "dwchotshot"
              ? "cursor-grabbing scale-105 z-50"
              : "cursor-grab z-10 hover:scale-105 transition-transform duration-200"
          }`}
          style={{
            transform: `translate(${dwchotshotPos.x}px, ${dwchotshotPos.y}px)`,
          }}
          onMouseDown={(e) => handleMouseDown(e, "dwchotshot")}
        >
          <StarBorder as="div" color="blue" speed="5s">
            <div className="flex items-center gap-4 p-1.5">
              <img
                src="/dwchotshot-avatar.png"
                alt="dwchotshot avatar"
                className="w-12 h-12 rounded-full object-cover pointer-events-none"
                draggable={false}
              />
              <div className="flex flex-col pointer-events-none">
                <span className="text-white font-bold text-base">Dwchotshot789 †</span>
                <span className="text-blue-400 font-semibold text-sm mb-1">OG Customer</span>
                <span className="text-gray-300 text-sm">@dwchotshot</span>
              </div>
            </div>
          </StarBorder>
        </div>

        {/* Third Profile - tasty (draggable) */}
        <div
          ref={tastyRef}
          className={`absolute pointer-events-auto select-none ${
            isDragging === "tasty"
              ? "cursor-grabbing scale-105 z-50"
              : "cursor-grab z-10 hover:scale-105 transition-transform duration-200"
          }`}
          style={{
            transform: `translate(${tastyPos.x}px, ${tastyPos.y}px)`,
          }}
          onMouseDown={(e) => handleMouseDown(e, "tasty")}
        >
          <StarBorder as="div" color="blue" speed="4s">
            <div className="flex items-center gap-4 p-1.5">
              <img
                src="/tasty-avatar.png"
                alt="tasty avatar"
                className="w-12 h-12 rounded-full object-cover pointer-events-none"
                draggable={false}
              />
              <div className="flex flex-col pointer-events-none">
                <span className="text-white font-bold text-base">Tasty</span>
                <span className="text-blue-400 font-semibold text-sm mb-1">OG Customer</span>
                <span className="text-gray-300 text-sm">@tasty9727</span>
              </div>
            </div>
          </StarBorder>
        </div>

        {/* Fourth Profile - luis (draggable) */}
        <div
          ref={luisRef}
          className={`absolute pointer-events-auto select-none ${
            isDragging === "luis"
              ? "cursor-grabbing scale-105 z-50"
              : "cursor-grab z-10 hover:scale-105 transition-transform duration-200"
          }`}
          style={{
            transform: `translate(${luisPos.x}px, ${luisPos.y}px)`,
          }}
          onMouseDown={(e) => handleMouseDown(e, "luis")}
        >
          <StarBorder as="div" color="blue" speed="7s">
            <div className="flex items-center gap-4 p-1.5">
              <img
                src="/luis-avatar.png"
                alt="luis avatar"
                className="w-12 h-12 rounded-full object-cover pointer-events-none"
                draggable={false}
              />
              <div className="flex flex-col pointer-events-none">
                <span className="text-white font-bold text-base">Luis</span>
                <span className="text-blue-400 font-semibold text-sm mb-1">OG Customer</span>
                <span className="text-gray-300 text-sm">@_luis_gaming_</span>
              </div>
            </div>
          </StarBorder>
        </div>
      </div>
    </div>
  )
}
