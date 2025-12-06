"use client";

import { useState } from "react";

export default function TipCalculator() {
    const [billAmount, setBillAmount] = useState("");
    const [tipPercent, setTipPercent] = useState("15");
    const [customTip, setCustomTip] = useState("");
    const [splitCount, setSplitCount] = useState("1");
    const [result, setResult] = useState<{
        tipAmount: number;
        totalAmount: number;
        perPerson: number;
        tipPerPerson: number;
    } | null>(null);

    const presetTips = [10, 15, 18, 20, 25];

    const calculate = () => {
        const bill = parseFloat(billAmount);
        const tip = customTip ? parseFloat(customTip) : parseFloat(tipPercent);
        const people = parseInt(splitCount) || 1;

        if (!bill || bill <= 0) return;

        const tipAmount = bill * (tip / 100);
        const totalAmount = bill + tipAmount;
        const perPerson = totalAmount / people;
        const tipPerPerson = tipAmount / people;

        setResult({
            tipAmount,
            totalAmount,
            perPerson,
            tipPerPerson,
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(amount);
    };

    const handlePresetClick = (percent: number) => {
        setTipPercent(percent.toString());
        setCustomTip("");
    };

    return (
        <div className="space-y-6">
            {/* Input Section */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Bill Amount ($)
                    </label>
                    <input
                        type="number"
                        value={billAmount}
                        onChange={(e) => setBillAmount(e.target.value)}
                        placeholder="e.g., 85.50"
                        className="input text-2xl font-semibold h-14"
                        min="0"
                        step="0.01"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Tip Percentage
                    </label>
                    <div className="grid grid-cols-5 gap-2 mb-3">
                        {presetTips.map((percent) => (
                            <button
                                key={percent}
                                onClick={() => handlePresetClick(percent)}
                                className={`py-3 rounded-lg font-semibold transition-all ${tipPercent === percent.toString() && !customTip
                                        ? "bg-[var(--primary-500)] text-white shadow-md"
                                        : "bg-[var(--gray-100)] dark:bg-[var(--gray-800)] hover:bg-[var(--gray-200)] dark:hover:bg-[var(--gray-700)]"
                                    }`}
                            >
                                {percent}%
                            </button>
                        ))}
                    </div>
                    <div className="relative">
                        <input
                            type="number"
                            value={customTip}
                            onChange={(e) => {
                                setCustomTip(e.target.value);
                                setTipPercent("");
                            }}
                            placeholder="Custom tip %"
                            className="input pr-8"
                            min="0"
                            max="100"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--foreground-secondary)]">
                            %
                        </span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Split Between
                    </label>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSplitCount(Math.max(1, parseInt(splitCount) - 1).toString())}
                            className="w-12 h-12 rounded-full bg-[var(--gray-100)] dark:bg-[var(--gray-800)] flex items-center justify-center text-xl font-bold hover:bg-[var(--gray-200)] dark:hover:bg-[var(--gray-700)] transition-colors"
                        >
                            −
                        </button>
                        <div className="flex-1 text-center">
                            <span className="text-3xl font-bold">{splitCount}</span>
                            <span className="text-[var(--foreground-secondary)] ml-2">
                                {parseInt(splitCount) === 1 ? "person" : "people"}
                            </span>
                        </div>
                        <button
                            onClick={() => setSplitCount((parseInt(splitCount) + 1).toString())}
                            className="w-12 h-12 rounded-full bg-[var(--gray-100)] dark:bg-[var(--gray-800)] flex items-center justify-center text-xl font-bold hover:bg-[var(--gray-200)] dark:hover:bg-[var(--gray-700)] transition-colors"
                        >
                            +
                        </button>
                    </div>
                </div>

                <button
                    onClick={calculate}
                    className="btn btn-primary w-full text-lg py-4"
                    disabled={!billAmount}
                >
                    Calculate Tip
                </button>
            </div>

            {/* Results Section */}
            {result && (
                <div className="space-y-4 animate-fade-in">
                    <div className="h-px bg-[var(--border)]" />

                    {/* Main Results */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="card p-5 text-center bg-gradient-to-br from-[var(--success-50)] to-[var(--success-100)] dark:from-[var(--success-900)]/20 dark:to-[var(--success-800)]/20">
                            <p className="text-sm text-[var(--foreground-secondary)] mb-1">Tip Amount</p>
                            <p className="text-2xl font-bold text-[var(--success-600)] dark:text-[var(--success-400)]">
                                {formatCurrency(result.tipAmount)}
                            </p>
                        </div>
                        <div className="card p-5 text-center bg-gradient-to-br from-[var(--primary-50)] to-[var(--primary-100)] dark:from-[var(--primary-900)]/20 dark:to-[var(--primary-800)]/20">
                            <p className="text-sm text-[var(--foreground-secondary)] mb-1">Total</p>
                            <p className="text-2xl font-bold text-[var(--primary-600)] dark:text-[var(--primary-400)]">
                                {formatCurrency(result.totalAmount)}
                            </p>
                        </div>
                    </div>

                    {/* Per Person */}
                    {parseInt(splitCount) > 1 && (
                        <div className="card p-6 text-center bg-gradient-to-r from-[var(--warning-50)] to-[var(--secondary-50)] dark:from-[var(--warning-900)]/20 dark:to-[var(--secondary-900)]/20">
                            <p className="text-sm text-[var(--foreground-secondary)] mb-2">Per Person</p>
                            <p className="text-4xl font-bold text-[var(--warning-600)] dark:text-[var(--warning-400)]">
                                {formatCurrency(result.perPerson)}
                            </p>
                            <p className="text-sm text-[var(--foreground-secondary)] mt-2">
                                ({formatCurrency(result.tipPerPerson)} tip each)
                            </p>
                        </div>
                    )}

                    {/* Quick Reference */}
                    <div className="card p-4">
                        <h4 className="font-semibold mb-3">Quick Tip Reference</h4>
                        <div className="space-y-2">
                            {[10, 15, 18, 20, 25].map((percent) => {
                                const tipAmt = parseFloat(billAmount) * (percent / 100);
                                const totalAmt = parseFloat(billAmount) + tipAmt;
                                return (
                                    <div key={percent} className="flex justify-between text-sm py-1 border-b border-[var(--border)]/50 last:border-0">
                                        <span className="font-medium">{percent}%</span>
                                        <span className="text-[var(--foreground-secondary)]">
                                            Tip: {formatCurrency(tipAmt)} • Total: {formatCurrency(totalAmt)}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
