"use client";

import { useState, useEffect } from "react";

type WeightUnit = "mg" | "g" | "kg" | "oz" | "lb" | "st" | "t";

interface ConversionRate {
    [key: string]: number;
}

export default function WeightConverter() {
    const [value, setValue] = useState("");
    const [fromUnit, setFromUnit] = useState<WeightUnit>("kg");
    const [toUnit, setToUnit] = useState<WeightUnit>("lb");
    const [results, setResults] = useState<{ [key: string]: number } | null>(null);

    // All values relative to kilograms
    const conversionRates: ConversionRate = {
        mg: 0.000001,
        g: 0.001,
        kg: 1,
        oz: 0.0283495,
        lb: 0.453592,
        st: 6.35029,
        t: 1000,
    };

    const unitLabels: { [key: string]: string } = {
        mg: "Milligrams",
        g: "Grams",
        kg: "Kilograms",
        oz: "Ounces",
        lb: "Pounds",
        st: "Stone",
        t: "Metric Tons",
    };

    const unitSymbols: { [key: string]: string } = {
        mg: "mg",
        g: "g",
        kg: "kg",
        oz: "oz",
        lb: "lb",
        st: "st",
        t: "t",
    };

    const convert = () => {
        const inputValue = parseFloat(value);
        if (isNaN(inputValue)) {
            setResults(null);
            return;
        }

        // Convert input to kilograms first
        const kilograms = inputValue * conversionRates[fromUnit];

        // Convert kilograms to all units
        const allResults: { [key: string]: number } = {};
        for (const unit in conversionRates) {
            allResults[unit] = kilograms / conversionRates[unit];
        }

        setResults(allResults);
    };

    useEffect(() => {
        if (value) {
            convert();
        } else {
            setResults(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, fromUnit]);

    const formatNumber = (num: number) => {
        if (Math.abs(num) < 0.001 && num !== 0) {
            return num.toExponential(4);
        }
        if (Math.abs(num) >= 1000000) {
            return num.toExponential(4);
        }
        return num.toLocaleString(undefined, { maximumFractionDigits: 6 });
    };

    const swapUnits = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };

    return (
        <div className="space-y-6">
            {/* Input Section */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Value</label>
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter a value"
                        className="input text-xl font-semibold"
                    />
                </div>

                <div className="grid grid-cols-[1fr,auto,1fr] gap-3 items-end">
                    <div>
                        <label className="block text-sm font-medium mb-2">From</label>
                        <select
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value as WeightUnit)}
                            className="input"
                        >
                            <optgroup label="Metric">
                                <option value="mg">Milligrams (mg)</option>
                                <option value="g">Grams (g)</option>
                                <option value="kg">Kilograms (kg)</option>
                                <option value="t">Metric Tons (t)</option>
                            </optgroup>
                            <optgroup label="Imperial">
                                <option value="oz">Ounces (oz)</option>
                                <option value="lb">Pounds (lb)</option>
                                <option value="st">Stone (st)</option>
                            </optgroup>
                        </select>
                    </div>

                    <button
                        onClick={swapUnits}
                        className="w-10 h-10 rounded-full bg-[var(--success-100)] dark:bg-[var(--success-900)]/30 flex items-center justify-center text-[var(--success-500)] hover:bg-[var(--success-200)] transition-colors mb-1"
                    >
                        ⇄
                    </button>

                    <div>
                        <label className="block text-sm font-medium mb-2">To</label>
                        <select
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value as WeightUnit)}
                            className="input"
                        >
                            <optgroup label="Metric">
                                <option value="mg">Milligrams (mg)</option>
                                <option value="g">Grams (g)</option>
                                <option value="kg">Kilograms (kg)</option>
                                <option value="t">Metric Tons (t)</option>
                            </optgroup>
                            <optgroup label="Imperial">
                                <option value="oz">Ounces (oz)</option>
                                <option value="lb">Pounds (lb)</option>
                                <option value="st">Stone (st)</option>
                            </optgroup>
                        </select>
                    </div>
                </div>
            </div>

            {/* Main Result */}
            {results && (
                <div className="space-y-4 animate-fade-in">
                    <div className="text-center py-6 bg-gradient-to-r from-[var(--success-50)] to-[var(--warning-50)] dark:from-[var(--success-900)]/20 dark:to-[var(--warning-900)]/20 rounded-xl">
                        <p className="text-sm text-[var(--foreground-secondary)] mb-2">
                            {value} {unitSymbols[fromUnit]} =
                        </p>
                        <p className="text-4xl font-bold text-[var(--success-600)] dark:text-[var(--success-400)]">
                            {formatNumber(results[toUnit])} {unitSymbols[toUnit]}
                        </p>
                        <p className="text-[var(--foreground-secondary)]">{unitLabels[toUnit]}</p>
                    </div>

                    {/* All Conversions */}
                    <div className="card p-4">
                        <h4 className="font-semibold mb-3">All Conversions</h4>
                        <div className="space-y-2">
                            {Object.keys(conversionRates).map((unit) => (
                                <div
                                    key={unit}
                                    className={`flex justify-between items-center p-2 rounded-lg ${unit === toUnit
                                            ? "bg-[var(--success-100)] dark:bg-[var(--success-900)]/30"
                                            : "hover:bg-[var(--gray-50)] dark:hover:bg-[var(--gray-800)]"
                                        }`}
                                >
                                    <span className="text-sm text-[var(--foreground-secondary)]">
                                        {unitLabels[unit]}
                                    </span>
                                    <span className={`font-mono font-medium ${unit === toUnit ? "text-[var(--success-600)]" : ""}`}>
                                        {formatNumber(results[unit])} {unitSymbols[unit]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Common Conversions Reference */}
                    <div className="card p-4 bg-[var(--gray-50)] dark:bg-[var(--gray-800)]">
                        <h4 className="font-semibold mb-2">🏋️ Quick Reference</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm text-[var(--foreground-secondary)]">
                            <span>1 kg = 2.205 lb</span>
                            <span>1 lb = 16 oz</span>
                            <span>1 stone = 14 lb</span>
                            <span>1 oz = 28.35 g</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
