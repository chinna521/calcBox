"use client";

import { useState, useEffect } from "react";

type LengthUnit = "mm" | "cm" | "m" | "km" | "in" | "ft" | "yd" | "mi";

interface ConversionRate {
    [key: string]: number;
}

export default function LengthConverter() {
    const [value, setValue] = useState("");
    const [fromUnit, setFromUnit] = useState<LengthUnit>("cm");
    const [toUnit, setToUnit] = useState<LengthUnit>("in");
    const [results, setResults] = useState<{ [key: string]: number } | null>(null);

    // All values relative to meters
    const conversionRates: ConversionRate = {
        mm: 0.001,
        cm: 0.01,
        m: 1,
        km: 1000,
        in: 0.0254,
        ft: 0.3048,
        yd: 0.9144,
        mi: 1609.344,
    };

    const unitLabels: { [key: string]: string } = {
        mm: "Millimeters",
        cm: "Centimeters",
        m: "Meters",
        km: "Kilometers",
        in: "Inches",
        ft: "Feet",
        yd: "Yards",
        mi: "Miles",
    };

    const unitSymbols: { [key: string]: string } = {
        mm: "mm",
        cm: "cm",
        m: "m",
        km: "km",
        in: "in",
        ft: "ft",
        yd: "yd",
        mi: "mi",
    };

    const convert = () => {
        const inputValue = parseFloat(value);
        if (isNaN(inputValue)) {
            setResults(null);
            return;
        }

        // Convert input to meters first
        const meters = inputValue * conversionRates[fromUnit];

        // Convert meters to all units
        const allResults: { [key: string]: number } = {};
        for (const unit in conversionRates) {
            allResults[unit] = meters / conversionRates[unit];
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
                            onChange={(e) => setFromUnit(e.target.value as LengthUnit)}
                            className="input"
                        >
                            <optgroup label="Metric">
                                <option value="mm">Millimeters (mm)</option>
                                <option value="cm">Centimeters (cm)</option>
                                <option value="m">Meters (m)</option>
                                <option value="km">Kilometers (km)</option>
                            </optgroup>
                            <optgroup label="Imperial">
                                <option value="in">Inches (in)</option>
                                <option value="ft">Feet (ft)</option>
                                <option value="yd">Yards (yd)</option>
                                <option value="mi">Miles (mi)</option>
                            </optgroup>
                        </select>
                    </div>

                    <button
                        onClick={swapUnits}
                        className="w-10 h-10 rounded-full bg-[var(--primary-100)] dark:bg-[var(--primary-900)]/30 flex items-center justify-center text-[var(--primary-500)] hover:bg-[var(--primary-200)] transition-colors mb-1"
                    >
                        ⇄
                    </button>

                    <div>
                        <label className="block text-sm font-medium mb-2">To</label>
                        <select
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value as LengthUnit)}
                            className="input"
                        >
                            <optgroup label="Metric">
                                <option value="mm">Millimeters (mm)</option>
                                <option value="cm">Centimeters (cm)</option>
                                <option value="m">Meters (m)</option>
                                <option value="km">Kilometers (km)</option>
                            </optgroup>
                            <optgroup label="Imperial">
                                <option value="in">Inches (in)</option>
                                <option value="ft">Feet (ft)</option>
                                <option value="yd">Yards (yd)</option>
                                <option value="mi">Miles (mi)</option>
                            </optgroup>
                        </select>
                    </div>
                </div>
            </div>

            {/* Main Result */}
            {results && (
                <div className="space-y-4 animate-fade-in">
                    <div className="text-center py-6 bg-gradient-to-r from-[var(--primary-50)] to-[var(--success-50)] dark:from-[var(--primary-900)]/20 dark:to-[var(--success-900)]/20 rounded-xl">
                        <p className="text-sm text-[var(--foreground-secondary)] mb-2">
                            {value} {unitSymbols[fromUnit]} =
                        </p>
                        <p className="text-4xl font-bold text-[var(--primary-600)] dark:text-[var(--primary-400)]">
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
                                            ? "bg-[var(--primary-100)] dark:bg-[var(--primary-900)]/30"
                                            : "hover:bg-[var(--gray-50)] dark:hover:bg-[var(--gray-800)]"
                                        }`}
                                >
                                    <span className="text-sm text-[var(--foreground-secondary)]">
                                        {unitLabels[unit]}
                                    </span>
                                    <span className={`font-mono font-medium ${unit === toUnit ? "text-[var(--primary-600)]" : ""}`}>
                                        {formatNumber(results[unit])} {unitSymbols[unit]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Common Conversions Reference */}
                    <div className="card p-4 bg-[var(--gray-50)] dark:bg-[var(--gray-800)]">
                        <h4 className="font-semibold mb-2">📏 Quick Reference</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm text-[var(--foreground-secondary)]">
                            <span>1 inch = 2.54 cm</span>
                            <span>1 foot = 30.48 cm</span>
                            <span>1 meter = 3.28 feet</span>
                            <span>1 mile = 1.61 km</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
