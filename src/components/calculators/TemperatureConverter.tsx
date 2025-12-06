"use client";

import { useState, useEffect } from "react";

type TempUnit = "celsius" | "fahrenheit" | "kelvin";

export default function TemperatureConverter() {
    const [value, setValue] = useState("");
    const [fromUnit, setFromUnit] = useState<TempUnit>("celsius");
    const [results, setResults] = useState<{ [key: string]: number } | null>(null);

    const unitLabels: { [key: string]: string } = {
        celsius: "Celsius",
        fahrenheit: "Fahrenheit",
        kelvin: "Kelvin",
    };

    const unitSymbols: { [key: string]: string } = {
        celsius: "°C",
        fahrenheit: "°F",
        kelvin: "K",
    };

    const convert = () => {
        const inputValue = parseFloat(value);
        if (isNaN(inputValue)) {
            setResults(null);
            return;
        }

        let celsius: number;

        // Convert input to Celsius first
        switch (fromUnit) {
            case "celsius":
                celsius = inputValue;
                break;
            case "fahrenheit":
                celsius = (inputValue - 32) * (5 / 9);
                break;
            case "kelvin":
                celsius = inputValue - 273.15;
                break;
            default:
                celsius = inputValue;
        }

        // Convert Celsius to all units
        setResults({
            celsius: celsius,
            fahrenheit: celsius * (9 / 5) + 32,
            kelvin: celsius + 273.15,
        });
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
        return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
    };

    // Common temperature references
    const references = [
        { name: "Absolute Zero", celsius: -273.15, emoji: "❄️" },
        { name: "Water Freezes", celsius: 0, emoji: "🧊" },
        { name: "Room Temperature", celsius: 20, emoji: "🏠" },
        { name: "Body Temperature", celsius: 37, emoji: "🌡️" },
        { name: "Water Boils", celsius: 100, emoji: "♨️" },
    ];

    const getTemperatureColor = (celsius: number) => {
        if (celsius < 0) return "text-blue-500";
        if (celsius < 15) return "text-cyan-500";
        if (celsius < 25) return "text-green-500";
        if (celsius < 35) return "text-yellow-500";
        if (celsius < 45) return "text-orange-500";
        return "text-red-500";
    };

    const getTemperatureEmoji = (celsius: number) => {
        if (celsius < -20) return "🥶";
        if (celsius < 0) return "❄️";
        if (celsius < 15) return "🌬️";
        if (celsius < 25) return "🌤️";
        if (celsius < 35) return "☀️";
        if (celsius < 45) return "🔥";
        return "🌋";
    };

    return (
        <div className="space-y-6">
            {/* Input Section */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Temperature</label>
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter temperature"
                        className="input text-2xl font-semibold h-14"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">From</label>
                    <div className="grid grid-cols-3 gap-2">
                        {(["celsius", "fahrenheit", "kelvin"] as TempUnit[]).map((unit) => (
                            <button
                                key={unit}
                                onClick={() => setFromUnit(unit)}
                                className={`py-3 rounded-lg font-medium transition-all ${fromUnit === unit
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

                    {/* Temperature Visual */}
                    <div className="text-center py-6">
                        <span className="text-6xl">{getTemperatureEmoji(results.celsius)}</span>
                    </div>

                    {/* All Conversions */}
                    <div className="space-y-3">
                        {(["celsius", "fahrenheit", "kelvin"] as TempUnit[]).map((unit) => (
                            <div
                                key={unit}
                                className={`card p-4 ${fromUnit === unit ? "ring-2 ring-[var(--primary-500)]" : ""
                                    }`}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="text-[var(--foreground-secondary)]">{unitLabels[unit]}</span>
                                    <span className={`text-2xl font-bold ${unit === "celsius" ? getTemperatureColor(results.celsius) : ""}`}>
                                        {formatNumber(results[unit])} {unitSymbols[unit]}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Temperature Scale Visual */}
                    <div className="card p-4">
                        <h4 className="font-semibold mb-3">Temperature Scale</h4>
                        <div className="relative h-8 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500">
                            {results.celsius >= -50 && results.celsius <= 150 && (
                                <div
                                    className="absolute top-0 w-1 h-full bg-white shadow-lg"
                                    style={{
                                        left: `${((results.celsius + 50) / 200) * 100}%`,
                                    }}
                                />
                            )}
                        </div>
                        <div className="flex justify-between text-xs text-[var(--foreground-secondary)] mt-1">
                            <span>-50°C</span>
                            <span>0°C</span>
                            <span>50°C</span>
                            <span>100°C</span>
                            <span>150°C</span>
                        </div>
                    </div>

                    {/* Reference Points */}
                    <div className="card p-4">
                        <h4 className="font-semibold mb-3">Reference Points</h4>
                        <div className="space-y-2">
                            {references.map((ref) => (
                                <div key={ref.name} className="flex justify-between items-center text-sm">
                                    <span>
                                        {ref.emoji} {ref.name}
                                    </span>
                                    <span className="font-mono">
                                        {ref.celsius}°C / {(ref.celsius * 9 / 5 + 32).toFixed(0)}°F
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Formula */}
                    <div className="card p-4 bg-[var(--gray-50)] dark:bg-[var(--gray-800)]">
                        <h4 className="font-semibold mb-2">🔢 Conversion Formulas</h4>
                        <div className="text-sm text-[var(--foreground-secondary)] space-y-1 font-mono">
                            <p>°F = (°C × 9/5) + 32</p>
                            <p>°C = (°F - 32) × 5/9</p>
                            <p>K = °C + 273.15</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
