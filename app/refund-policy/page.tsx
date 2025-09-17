"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Clock, AlertCircle, CheckCircle } from "lucide-react"

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/80 border-b border-border">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <img src="/luminar-logo.png" alt="Luminar Logo" className="h-8 w-auto" />
              <span className="hidden md:inline text-sm text-muted-foreground">Luminar Services</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/products">Products</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/faq">FAQ</Link>
            </Button>
            <Button asChild>
              <Link href="/">Home</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-4xl px-4 md:px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Refund & Guarantee Policy</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your satisfaction is our priority. Learn about our refund policy and service guarantees.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle className="h-5 w-5" />
                What We Guarantee
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Service delivery as described</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Refill guarantee (where applicable)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">High-quality accounts</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                <Clock className="h-5 w-5" />
                Refund Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Investigation period:</span>
                <span className="font-semibold">1-3 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Refund processing:</span>
                <span className="font-semibold">3-5 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Refill services:</span>
                <span className="font-semibold">Automatic</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Refund Policy Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Eligible for Full Refund
              </h3>
              <ul className="space-y-1 text-sm text-muted-foreground ml-6">
                <li>• Service not delivered within specified timeframe</li>
                <li>• Technical issues preventing service completion</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                Partial Refund Scenarios
              </h3>
              <ul className="space-y-1 text-sm text-muted-foreground ml-6">
                <li>• Service partially delivered (refund for undelivered portion)</li>
                <li>• Minor quality issues that don't affect overall service</li>
                <li>• Customer-requested service modifications mid-delivery</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                No Refund Policy
              </h3>
              <ul className="space-y-1 text-sm text-muted-foreground ml-6">
                <li>• Services completed as described</li>
                <li>• Customer provides incorrect account information</li>
                <li>• Natural engagement fluctuations</li>
                <li>• Services marked as "No Refill" experiencing normal drops</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
              <p className="text-muted-foreground mb-4">
                Have questions about our refund policy or need to report an issue?
              </p>
              <Button asChild className="bg-violet-600 hover:bg-violet-500">
                <Link href="https://discord.gg/7QTRtZvDXH" target="_blank" rel="noopener noreferrer">
                  Contact Support on Discord
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        <span className="opacity-80">Luminar Services - Last updated: January 2025</span>
      </footer>
    </div>
  )
}
