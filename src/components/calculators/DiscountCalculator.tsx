"use client";

import { useState } from "react";

export default function DiscountCalculator() {
    const [originalPrice, setOriginalPrice] = useState("");
    const [discountType, setDiscountType] = useState<"percent" | "amount">("percent");
    const [discountValue, setDiscountValue] = useState("");
    const [quantity, setQuantity] = useState("1");
    const [result, setResult] = useState<{
        discountAmount: number;
        finalPrice: number;
        totalSavings: number;
        totalPrice: number;
        percentOff: number;
    } | null>(null);

    const quickDiscounts = [10, 15, 20, 25, 30, 50];

    const calculate = () => {
        const price = parseFloat(originalPrice);
        const discount = parseFloat(discountValue);
        const qty = parseInt(quantity) || 1;

        if (!price || price <= 0 || !discount) return;

        let discountAmount: number;
        let percentOff: number;

        if (discountType === "percent") {
            percentOff = Math.min(100, discount);
            discountAmount = price * (percentOff / 100);
        } else {
            discountAmount = Math.min(price, discount);
            percentOff = (discountAmount / price) * 100;
        }

        const finalPrice = price - discountAmount;
        const totalSavings = discountAmount * qty;
        const totalPrice = finalPrice * qty;

        setResult({
            discountAmount,
            finalPrice,
            totalSavings,
            totalPrice,
            percentOff,
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(amount);
    };

    const handleQuickDiscount = (percent: number) => {
        setDiscountType("percent");
        setDiscountValue(percent.toString());
    };

    return (
        <div className="space-y-6">
            {/* Input Section */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Original Price ($)</label>
                    <input
                        type="number"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        placeholder="e.g., 99.99"
                        className="input text-xl font-semibold"
                        min="0"
                        step="0.01"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Discount</label>
                    <div className="flex gap-2 mb-3">
                        <button
                            onClick={() => setDiscountType("percent")}
                            className={`flex-1 py-2 rounded-lg font-medium transition-all ${discountType === "percent"
                                    ? "bg-[var(--primary-500)] text-white"
                                    : "bg-[var(--gray-100)] dark:bg-[var(--gray-800)]"
                                }`}
                        >
                            Percentage (%)
                        </button>
                        <button
                            onClick={() => setDiscountType("amount")}
                            className={`flex-1 py-2 rounded-lg font-medium transition-all ${discountType === "amount"
                                    ? "bg-[var(--primary-500)] text-white"
                                    : "bg-[var(--gray-100)] dark:bg-[var(--gray-800)]"
                                }`}
                        >
                            Fixed Amount ($)
                        </button>
                    </div>

                    {discountType === "percent" && (
                        <div className="grid grid-cols-6 gap-2 mb-3">
                            {quickDiscounts.map((percent) => (
                                <button
                                    key={percent}
                                    onClick={() => handleQuickDiscount(percent)}
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${discountValue === percent.toString() && discountType === "percent"
                                            ? "bg-[var(--success-500)] text-white"
                                            : "bg-[var(--gray-100)] dark:bg-[var(--gray-800)] hover:bg-[var(--gray-200)]"
                                        }`}
                                >
                                    {percent}%
                                </button>
                            ))}
                        </div>
                    )}

                    <input
                        type="number"
                        value={discountValue}
                        onChange={(e) => setDiscountValue(e.target.value)}
                        placeholder={discountType === "percent" ? "Enter %" : "Enter $"}
                        className="input"
                        min="0"
                        max={discountType === "percent" ? "100" : undefined}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Quantity</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="input"
                        min="1"
                    />
                </div>

                <button
                    onClick={calculate}
                    className="btn btn-primary w-full text-lg py-4"
                    disabled={!originalPrice || !discountValue}
                >
                    Calculate Discount
                </button>
            </div>

            {/* Results */}
            {result && (
                <div className="space-y-4 animate-fade-in">
                    <div className="h-px bg-[var(--border)]" />

                    {/* Price Comparison */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="card p-4 text-center">
                            <p className="text-sm text-[var(--foreground-secondary)] mb-1">Original Price</p>
                            <p className="text-xl font-medium line-through text-[var(--gray-400)]">
                                {formatCurrency(parseFloat(originalPrice))}
                            </p>
                        </div>
                        <div className="card p-4 text-center bg-gradient-to-br from-[var(--success-50)] to-[var(--success-100)] dark:from-[var(--success-900)]/20 dark:to-[var(--success-800)]/20">
                            <p className="text-sm text-[var(--foreground-secondary)] mb-1">Final Price</p>
                            <p className="text-2xl font-bold text-[var(--success-600)] dark:text-[var(--success-400)]">
                                {formatCurrency(result.finalPrice)}
                            </p>
                        </div>
                    </div>

                    {/* Savings Badge */}
                    <div className="text-center py-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl">
                        <span className="inline-block px-4 py-2 bg-red-500 text-white text-lg font-bold rounded-full">
                            🏷️ {result.percentOff.toFixed(0)}% OFF
                        </span>
                        <p className="mt-2 text-[var(--foreground-secondary)]">
                            You save {formatCurrency(result.discountAmount)} per item
                        </p>
                    </div>

                    {/* Total for Quantity */}
                    {parseInt(quantity) > 1 && (
                        <div className="card p-4">
                            <h4 className="font-semibold mb-3">For {quantity} items:</h4>
                            <div className="flex justify-between items-center">
                                <span>Total Price:</span>
                                <span className="text-xl font-bold text-[var(--success-600)]">
                                    {formatCurrency(result.totalPrice)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center mt-2 text-[var(--foreground-secondary)]">
                                <span>Total Savings:</span>
                                <span className="font-medium text-red-500">
                                    -{formatCurrency(result.totalSavings)}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Price Breakdown */}
                    <div className="card p-4">
                        <h4 className="font-semibold mb-3">Price Breakdown</h4>
                        <div className="flex h-6 rounded-full overflow-hidden">
                            <div
                                className="bg-[var(--success-500)] flex items-center justify-center text-white text-xs"
                                style={{ width: `${100 - result.percentOff}%` }}
                            >
                                You Pay
                            </div>
                            <div
                                className="bg-red-500 flex items-center justify-center text-white text-xs"
                                style={{ width: `${result.percentOff}%` }}
                            >
                                Saved
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
