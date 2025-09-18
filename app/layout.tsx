import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LS",
  description:
    "Luminar is one of the best SMM Service Botting Panel, with services for a lot of Social Media Platforms.",
  keywords: "SMM, social media marketing, Instagram followers, TikTok likes, YouTube views, social media services",
  openGraph: {
    title: "LS",
    description:
      "Luminar is one of the best SMM Service Botting Panel, with services for a lot of Social Media Platforms.",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/x-icon" href="/puplic/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/puplic/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/puplic/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/puplic/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
