import { currencyRates } from "./services-data"

export function formatPrice(price: number, currentCurrency: string): string {
  const convertedPrice = price * (currencyRates[currentCurrency] || 1)
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
