"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button.tsx"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion.tsx"
import { MobileNav } from "@/components/mobile-nav.tsx"

const faqData = [
  {
    id: "1",
    question: "Will botting get me banned?",
    answer: "No, it won't. If it did, anyone could simply bot someone else's account to get them banned.",
  },
  {
    id: "2",
    question: 'What does "Refill" mean?',
    answer: "It means that if a bot unfollows you, you will automatically receive a new one within the refill period.",
  },
  {
    id: "3",
    question: 'What do "UHQ" and "HQ" stand for?',
    answer: "UHQ means Ultra High Quality, and HQ means High Quality—referring to the quality of the accounts.",
  },
  {
    id: "4",
    question: "Why do I need to vouch after purchasing a service?",
    answer: "Vouching helps show others that we are legitimate sellers and do not scam.",
  },
  {
    id: "5",
    question: "Am I eligible for a refund if followers unfollow?",
    answer:
      "If a service does not work as intended—meaning no followers are delivered—you can open a support ticket, and we'll investigate the issue.",
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/80 border-b border-border">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <MobileNav />
            <Link href="/" className="flex items-center gap-3">
              <img src="/luminar-logo.png" alt="Luminar Logo" className="h-8 w-auto" />
              <span className="hidden md:inline text-sm text-muted-foreground animate-pulse hover:animate-bounce transition-all duration-300 hover:text-violet-400">
                Luminar Services
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/products">Products</Link>
            </Button>
            <Button asChild variant="ghost" className="hidden md:inline-flex">
              <Link href="/refund-policy">Refund Policy</Link>
            </Button>
            <Button asChild>
              <Link href="/">Home</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-4xl px-4 md:px-6 py-12 animate-fadeIn">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our SMM services, policies, and how everything works.
          </p>
        </div>

        <Card className="bg-gray-950/60 border-gray-900">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Common Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id} className="mb-3">
                  <AccordionTrigger className="text-left hover:text-violet-400 transition-colors py-4 px-6 bg-gray-900/30 hover:bg-gray-900/50 rounded-lg border border-gray-800 hover:border-violet-500/50 font-medium text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 leading-relaxed px-6 py-4 bg-gray-950/40 rounded-b-lg border-l border-r border-b border-gray-800 -mt-1">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <Card className="bg-gray-950/60 border-gray-900">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
              <p className="text-gray-400 mb-6">
                Can't find what you're looking for? Join our Discord community for support.
              </p>
              <Button asChild className="bg-violet-600 hover:bg-violet-500">
                <Link href="https://discord.gg/7QTRtZvDXH" target="_blank" rel="noopener noreferrer">
                  Join Discord
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        <span className="opacity-80">Luminar Services</span>
      </footer>
    </div>
  )
}
