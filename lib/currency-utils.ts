import { currencyRates } from "./services-data"

export async function fetchRealTimeCurrencyRates(): Promise<Record<string, number>> {
  try {
    // Using a free API for real-time exchange rates
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/EUR")
    const data = await response.json()

    if (data && data.rates) {
      return {
        EUR: 1,
        USD: data.rates.USD || 1.08,
        PLN: data.rates.PLN || 4.35,
        GBP: data.rates.GBP || 0.85,
        JPY: data.rates.JPY || 169.0,
        CAD: data.rates.CAD || 1.48,
        AUD: data.rates.AUD || 1.64,
        CHF: data.rates.CHF || 0.97,
        CNY: data.rates.CNY || 7.83,
        INR: data.rates.INR || 90.0,
      }
    }
  } catch (error) {
    console.error("Failed to fetch real-time currency rates:", error)
  }

  // Fallback to static rates if API fails
  return currencyRates
}

export function formatPrice(price: number, currentCurrency: string, rates?: Record<string, number>): string {
  const ratesToUse = rates || currencyRates
  const convertedPrice = price * (ratesToUse[currentCurrency] || 1)
  let symbol = "€"

  switch (currentCurrency) {
    case "USD":
      symbol = "$"
      break
    case "PLN":
      symbol = "zł"
      break
    case "GBP":
      symbol = "£"
      break
    case "JPY":
      symbol = "¥"
      break
    case "CAD":
      symbol = "C$"
      break
    case "AUD":
      symbol = "A$"
      break
    case "CHF":
      symbol = "CHF"
      break
    case "CNY":
      symbol = "¥"
      break
    case "INR":
      symbol = "₹"
      break
    default:
      symbol = "€"
  }

  return `${convertedPrice < 1 ? convertedPrice.toFixed(4) : convertedPrice.toFixed(2)}${symbol}`
}
