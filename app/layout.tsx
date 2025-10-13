import { SpeedInsights } from "@vercel/speed-insights/next"
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Luminar Services",
  description:
    "Luminar is one of the best SMM Service Botting Panel, with services for a lot of Social Media Platforms.",
  keywords: "SMM, social media marketing, Instagram followers, TikTok likes, YouTube views, social media services",
  icons: {
    icon: [
      { 
        url: 'https://media.discordapp.net/attachments/1091030774012186685/1417600581354389645/IQvHiQnv4ahXoYqFq8gS84ivFINDZB3qlceFTDSZBjLsfcgLHC.png?ex=68ecb12c&is=68eb5fac&hm=9478fdf6299c72670ff465269fa2c94d21d700685bafe4f52ed2055ed03f1059&=&format=png&quality=lossless',
        type: 'image/png'
      }
    ],
    apple: [
      { 
        url: 'https://media.discordapp.net/attachments/1091030774012186685/1417600581354389645/IQvHiQnv4ahXoYqFq8gS84ivFINDZB3qlceFTDSZBjLsfcgLHC.png?ex=68ecb12c&is=68eb5fac&hm=9478fdf6299c72670ff465269fa2c94d21d700685bafe4f52ed2055ed03f1059&=&format=png&quality=lossless',
        sizes: '180x180',
        type: 'image/png'
      }
    ]
  },
  openGraph: {
    title: "LS",
    description:
      "Luminar is one of the best SMM Service Botting Panel, with services for a lot of Social Media Platforms.",
    type: "website",
  },
  generator: 'Luminar SMM Panel v1.0'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link 
          rel="icon" 
          href="https://media.discordapp.net/attachments/1091030774012186685/1417600581354389645/IQvHiQnv4ahXoYqFq8gS84ivFINDZB3qlceFTDSZBjLsfcgLHC.png?ex=68ecb12c&is=68eb5fac&hm=9478fdf6299c72670ff465269fa2c94d21d700685bafe4f52ed2055ed03f1059&=&format=png&quality=lossless" 
          type="image/png" 
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
