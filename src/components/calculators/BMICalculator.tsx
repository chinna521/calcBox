"use client";

import { useState } from "react";

export default function BMICalculator() {
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");
    const [height, setHeight] = useState("");
    const [heightFt, setHeightFt] = useState("");
    const [heightIn, setHeightIn] = useState("");
    const [weight, setWeight] = useState("");
    const [result, setResult] = useState<{
        bmi: number;
        category: string;
        categoryColor: string;
        healthyWeightMin: number;
        healthyWeightMax: number;
    } | null>(null);

    const calculate = () => {
        let heightM: number;
        let weightKg: number;

        if (unit === "metric") {
            heightM = parseFloat(height) / 100;
            weightKg = parseFloat(weight);
        } else {
            const totalInches = parseFloat(heightFt) * 12 + parseFloat(heightIn);
            heightM = totalInches * 0.0254;
            weightKg = parseFloat(weight) * 0.453592;
        }

        if (!heightM || !weightKg || heightM <= 0 || weightKg <= 0) return;

        const bmi = weightKg / (heightM * heightM);

        let category: string;
        let categoryColor: string;

        if (bmi < 18.5) {
            category = "Underweight";
            categoryColor = "var(--warning-500)";
        } else if (bmi < 25) {
            category = "Normal weight";
            categoryColor = "var(--success-500)";
        } else if (bmi < 30) {
            category = "Overweight";
            categoryColor = "var(--warning-500)";
        } else {
            category = "Obese";
            categoryColor = "#ef4444";
        }

        // Calculate healthy weight range (BMI 18.5 - 24.9)
        const healthyWeightMin = 18.5 * heightM * heightM;
        const healthyWeightMax = 24.9 * heightM * heightM;

        setResult({
            bmi,
            category,
            categoryColor,
            healthyWeightMin: unit === "metric" ? healthyWeightMin : healthyWeightMin * 2.20462,
            healthyWeightMax: unit === "metric" ? healthyWeightMax : healthyWeightMax * 2.20462,
        });
    };

    const isValid = unit === "metric"
        ? height && weight
        : heightFt && heightIn && weight;

    return (
        <div className="space-y-6">
            {/* Unit Toggle */}
            <div className="flex rounded-lg bg-[var(--gray-100)] dark:bg-[var(--gray-800)] p-1">
                <button
                    onClick={() => setUnit("metric")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${unit === "metric"
                            ? "bg-white dark:bg-[var(--gray-700)] shadow-sm"
                            : "text-[var(--foreground-secondary)]"
                        }`}
                >
                    Metric (kg/cm)
                </button>
                <button
                    onClick={() => setUnit("imperial")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${unit === "imperial"
                            ? "bg-white dark:bg-[var(--gray-700)] shadow-sm"
                            : "text-[var(--foreground-secondary)]"
                        }`}
                >
                    Imperial (lb/ft)
                </button>
            </div>

            {/* Input Section */}
            <div className="space-y-4">
                {unit === "metric" ? (
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Height (cm)
                        </label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="e.g., 175"
                            className="input"
                            min="0"
                        />
                    </div>
                ) : (
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Height
                        </label>
                        <div className="flex gap-2">
                            <div className="flex-1">
                                <input
                                    type="number"
                                    value={heightFt}
                                    onChange={(e) => setHeightFt(e.target.value)}
                                    placeholder="Feet"
                                    className="input"
                                    min="0"
                                />
                            </div>
                            <div className="flex-1">
                                <input
                                    type="number"
                                    value={heightIn}
                                    onChange={(e) => setHeightIn(e.target.value)}
                                    placeholder="Inches"
                                    className="input"
                                    min="0"
                                    max="11"
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Weight ({unit === "metric" ? "kg" : "lbs"})
                    </label>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder={unit === "metric" ? "e.g., 70" : "e.g., 154"}
                        className="input"
                        min="0"
                    />
                </div>

                <button
                    onClick={calculate}
                    className="btn btn-primary w-full text-lg py-4"
                    disabled={!isValid}
                >
                    Calculate BMI
                </button>
            </div>

            {/* Results Section */}
            {result && (
                <div className="space-y-4 animate-fade-in">
                    <div className="h-px bg-[var(--border)]" />

                    {/* Main Result */}
                    <div className="text-center py-6">
                        <p className="text-sm text-[var(--foreground-secondary)] mb-2">
                            Your BMI
                        </p>
                        <p className="text-5xl font-bold mb-2" style={{ color: result.categoryColor }}>
                            {result.bmi.toFixed(1)}
                        </p>
                        <p
                            className="text-lg font-semibold px-4 py-1 rounded-full inline-block"
                            style={{
                                backgroundColor: `${result.categoryColor}20`,
                                color: result.categoryColor
                            }}
                        >
                            {result.category}
                        </p>
                    </div>

                    {/* BMI Scale */}
                    <div className="relative">
                        <div className="flex h-4 rounded-full overflow-hidden">
                            <div className="flex-1 bg-[var(--warning-400)]" title="Underweight" />
                            <div className="flex-[1.3] bg-[var(--success-400)]" title="Normal" />
                            <div className="flex-1 bg-[var(--warning-400)]" title="Overweight" />
                            <div className="flex-1 bg-red-400" title="Obese" />
                        </div>
                        <div
                            className="absolute top-0 w-1 h-6 bg-[var(--foreground)] rounded-full -translate-x-1/2 -translate-y-1"
                            style={{
                                left: `${Math.min(100, Math.max(0, ((result.bmi - 15) / 25) * 100))}%`
                            }}
                        />
                        <div className="flex justify-between text-xs text-[var(--foreground-secondary)] mt-2">
                            <span>15</span>
                            <span>18.5</span>
                            <span>25</span>
                            <span>30</span>
                            <span>40</span>
                        </div>
                    </div>

                    {/* Healthy Weight Range */}
                    <div className="card p-4">
                        <p className="text-sm text-[var(--foreground-secondary)] mb-1">
                            Healthy weight range for your height
                        </p>
                        <p className="text-lg font-semibold text-[var(--success-600)]">
                            {result.healthyWeightMin.toFixed(1)} - {result.healthyWeightMax.toFixed(1)} {unit === "metric" ? "kg" : "lbs"}
                        </p>
                    </div>

                    {/* Categories Info */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="p-2 rounded bg-[var(--warning-100)] dark:bg-[var(--warning-900)]/20">
                            <span className="font-medium">Underweight:</span> &lt;18.5
                        </div>
                        <div className="p-2 rounded bg-[var(--success-100)] dark:bg-[var(--success-900)]/20">
                            <span className="font-medium">Normal:</span> 18.5-24.9
                        </div>
                        <div className="p-2 rounded bg-[var(--warning-100)] dark:bg-[var(--warning-900)]/20">
                            <span className="font-medium">Overweight:</span> 25-29.9
                        </div>
                        <div className="p-2 rounded bg-red-100 dark:bg-red-900/20">
                            <span className="font-medium">Obese:</span> ≥30
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
