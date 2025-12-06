"use client";

import { useState, useEffect } from "react";

type SpeedUnit = "ms" | "kmh" | "mph" | "knots" | "fts" | "mach";

interface ConversionRate {
    [key: string]: number;
}

export default function SpeedConverter() {
    const [value, setValue] = useState("");
    const [fromUnit, setFromUnit] = useState<SpeedUnit>("kmh");
    const [results, setResults] = useState<{ [key: string]: number } | null>(null);

    // All values relative to meters per second
    const conversionRates: ConversionRate = {
        ms: 1,
        kmh: 0.277778,
        mph: 0.44704,
        knots: 0.514444,
        fts: 0.3048,
        mach: 343,
    };

    const unitLabels: { [key: string]: string } = {
        ms: "Meters per second",
        kmh: "Kilometers per hour",
        mph: "Miles per hour",
        knots: "Knots",
        fts: "Feet per second",
        mach: "Mach",
    };

    const unitSymbols: { [key: string]: string } = {
        ms: "m/s",
        kmh: "km/h",
        mph: "mph",
        knots: "kn",
        fts: "ft/s",
        mach: "Mach",
    };

    const convert = () => {
        const inputValue = parseFloat(value);
        if (isNaN(inputValue)) {
            setResults(null);
            return;
        }

        // Convert input to m/s first
        const ms = inputValue * conversionRates[fromUnit];

        // Convert m/s to all units
        const allResults: { [key: string]: number } = {};
        for (const unit in conversionRates) {
            allResults[unit] = ms / conversionRates[unit];
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
        return num.toLocaleString(undefined, { maximumFractionDigits: 4 });
    };

    // Speed references
    const references = [
        { name: "Walking", speed: 5, unit: "kmh", emoji: "🚶" },
        { name: "Cycling", speed: 20, unit: "kmh", emoji: "🚴" },
        { name: "City driving", speed: 50, unit: "kmh", emoji: "🚗" },
        { name: "Highway", speed: 120, unit: "kmh", emoji: "🛣️" },
        { name: "Bullet train", speed: 320, unit: "kmh", emoji: "🚄" },
        { name: "Commercial jet", speed: 900, unit: "kmh", emoji: "✈️" },
        { name: "Speed of sound", speed: 1235, unit: "kmh", emoji: "💨" },
    ];

    return (
        <div className="space-y-6">
            {/* Input Section */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Speed</label>
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter speed"
                        className="input text-xl font-semibold"
                        min="0"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">From</label>
                    <div className="grid grid-cols-3 gap-2">
                        {(["kmh", "mph", "ms", "knots", "fts", "mach"] as SpeedUnit[]).map((unit) => (
                            <button
                                key={unit}
                                onClick={() => setFromUnit(unit)}
                                className={`py-2 px-2 rounded-lg text-sm font-medium transition-all ${fromUnit === unit
                                        ? "bg-[var(--primary-500)] text-white shadow-md"
                                        : "bg-[var(--gray-100)] dark:bg-[var(--gray-800)] hover:bg-[var(--gray-200)]"
                                    }`}
                            >
                                {unitSymbols[unit]}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results */}
            {results && (
                <div className="space-y-4 animate-fade-in">
                    <div className="h-px bg-[var(--border)]" />

                    {/* Speed Indicator */}
                    <div className="text-center py-4">
                        <span className="text-5xl">
                            {results.kmh < 10 ? "🚶" : results.kmh < 30 ? "🚴" : results.kmh < 80 ? "🚗" : results.kmh < 300 ? "🚄" : results.kmh < 1200 ? "✈️" : "🚀"}
                        </span>
                    </div>

                    {/* All Conversions */}
                    <div className="card p-4">
                        <h4 className="font-semibold mb-3">All Conversions</h4>
                        <div className="space-y-2">
                            {Object.keys(conversionRates).map((unit) => (
                                <div
                                    key={unit}
                                    className={`flex justify-between items-center p-2 rounded-lg ${unit === fromUnit
                                            ? "bg-[var(--primary-100)] dark:bg-[var(--primary-900)]/30"
                                            : "hover:bg-[var(--gray-50)] dark:hover:bg-[var(--gray-800)]"
                                        }`}
                                >
                                    <span className="text-sm text-[var(--foreground-secondary)]">
                                        {unitLabels[unit]}
                                    </span>
                                    <span className={`font-mono font-medium ${unit === fromUnit ? "text-[var(--primary-600)]" : ""}`}>
                                        {formatNumber(results[unit])} {unitSymbols[unit]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Speed Comparison */}
                    <div className="card p-4">
                        <h4 className="font-semibold mb-3">Speed Comparison</h4>
                        <div className="space-y-2">
                            {references.map((ref) => {
                                const refInKmh = ref.unit === "kmh" ? ref.speed : ref.speed;
                                const currentKmh = results.kmh;
                                const isFaster = currentKmh >= refInKmh;

                                return (
                                    <div key={ref.name} className="flex items-center gap-2 text-sm">
                                        <span className="w-8">{ref.emoji}</span>
                                        <span className="flex-1">{ref.name} ({ref.speed} {unitSymbols[ref.unit]})</span>
                                        <span className={isFaster ? "text-[var(--success-500)]" : "text-[var(--gray-400)]"}>
                                            {isFaster ? "✓" : "—"}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Reference */}
                    <div className="card p-4 bg-[var(--gray-50)] dark:bg-[var(--gray-800)]">
                        <h4 className="font-semibold mb-2">🏎️ Quick Reference</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm text-[var(--foreground-secondary)]">
                            <span>1 km/h = 0.621 mph</span>
                            <span>1 mph = 1.609 km/h</span>
                            <span>1 knot = 1.852 km/h</span>
                            <span>Mach 1 ≈ 1,235 km/h</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
