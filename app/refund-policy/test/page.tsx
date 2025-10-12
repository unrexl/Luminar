"use client"

import { useState } from "react"
import { OrderDialog } from "@/components/order-dialog"
import { Button } from "@/components/ui/button"
import { Service } from "@/lib/services-data"

// Mock service data for testing
const mockService: Service = {
    id: "test-service-001",
    network: "instagram",
    category: "followers",
    title: "Instagram Followers",
    price: 5.99,
    oldPrice: 9.99,
    discount: 40,
    icon: "/instagram-icon.png"
}

export default function TestPage() {
    const [selectedService, setSelectedService] = useState<Service | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    // Mock formatPrice function for testing
    const formatPrice = (price: number, currency: string) => {
        const symbols: Record<string, string> = {
            USD: "$",
            EUR: "€",
            GBP: "£",
            JPY: "¥",
            CAD: "C$",
            AUD: "A$",
            CHF: "Fr",
            CNY: "¥",
            INR: "₹",
            BRL: "R$"
        }

        const symbol = symbols[currency] || currency
        return `${symbol}${price.toFixed(2)}`
    }

    const handleTestOrder = () => {
        setIsLoading(true)
        // Simulate loading state
        setTimeout(() => {
            setIsLoading(false)
            setSelectedService(mockService)
        }, 1000)
    }

    const handleClose = () => {
        setSelectedService(null)
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">OrderDialog Test Page</h1>

                <div className="space-y-6">
                    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800/50">
                        <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
                        <div className="flex gap-4">
                            <Button
                                onClick={handleTestOrder}
                                className="bg-purple-600 hover:bg-purple-500"
                            >
                                Test Order Dialog
                            </Button>
                            <Button
                                onClick={() => {
                                    setIsLoading(true)
                                    setTimeout(() => setIsLoading(false), 2000)
                                }}
                                variant="outline"
                                className="border-gray-700 text-gray-300 hover:bg-gray-800"
                            >
                                Test Loading State
                            </Button>
                        </div>
                    </div>

                    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800/50">
                        <h2 className="text-xl font-semibold mb-4">Mock Service Data</h2>
                        <div className="space-y-2 text-sm">
                            <p><strong>ID:</strong> {mockService.id}</p>
                            <p><strong>Network:</strong> {mockService.network}</p>
                            <p><strong>Category:</strong> {mockService.category}</p>
                            <p><strong>Title:</strong> {mockService.title}</p>
                            <p><strong>Price:</strong> ${mockService.price}</p>
                            <p><strong>Old Price:</strong> ${mockService.oldPrice}</p>
                            <p><strong>Discount:</strong> {mockService.discount}%</p>
                        </div>
                    </div>

                    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800/50">
                        <h2 className="text-xl font-semibold mb-4">Current State</h2>
                        <div className="space-y-2 text-sm">
                            <p><strong>Selected Service:</strong> {selectedService ? "Yes" : "No"}</p>
                            <p><strong>Loading:</strong> {isLoading ? "Yes" : "No"}</p>
                            <p><strong>Service ID:</strong> {selectedService?.id || "N/A"}</p>
                        </div>
                    </div>

                    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800/50">
                        <h2 className="text-xl font-semibold mb-4">Instructions</h2>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>• Click "Test Order Dialog" to open the order dialog with the mock service</li>
                            <li>• Click "Test Loading State" to see the loading spinner</li>
                            <li>• Test the currency converter by selecting different currencies</li>
                            <li>• Test the quantity selector and preset buttons</li>
                            <li>• Test the PayPal flow and form submission</li>
                            <li>• Test the rate limiting functionality</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Order Dialog Component */}
            <OrderDialog
                selectedService={selectedService}
                isLoading={isLoading}
                onClose={handleClose}
                formatPrice={formatPrice}
                currency="USD"
            />
        </div>
    )
}