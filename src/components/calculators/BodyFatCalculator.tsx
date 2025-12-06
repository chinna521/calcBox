"use client";

import { useState } from "react";

export default function BodyFatCalculator() {
    const [gender, setGender] = useState<"male" | "female">("female");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [neck, setNeck] = useState("");
    const [waist, setWaist] = useState("");
    const [hip, setHip] = useState(""); // Only for females
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");
    const [result, setResult] = useState<number | null>(null);
    const [category, setCategory] = useState<string | null>(null);

    const calculateBodyFat = () => {
        if (!age || !weight || !height || !neck || !waist || (gender === "female" && !hip)) return;

        let bodyFatPercentage = 0;

        // U.S. Navy Method
        if (unit === "metric") {
            // Metric: height, neck, waist, hip in cm
            const h = parseFloat(height);
            const n = parseFloat(neck);
            const w = parseFloat(waist);
            const hi = parseFloat(hip);

            if (gender === "male") {
                bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
            } else {
                bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(w + hi - n) + 0.22100 * Math.log10(h)) - 450;
            }
        } else {
            // Imperial: height in inches, neck, waist, hip in inches
            const h = parseFloat(height);
            const n = parseFloat(neck);
            const w = parseFloat(waist);
            const hi = parseFloat(hip);

            if (gender === "male") {
                bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
            } else {
                bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(w + hi - n) + 0.22100 * Math.log10(h)) - 450;
            }
        }

        setResult(parseFloat(bodyFatPercentage.toFixed(1)));
        determineCategory(bodyFatPercentage, gender);
    };

    const determineCategory = (bf: number, sex: "male" | "female") => {
        if (sex === "female") {
            if (bf < 10) setCategory("Essential Fat");
            else if (bf < 14) setCategory("Athletes");
            else if (bf < 21) setCategory("Fitness");
            else if (bf < 25) setCategory("Average");
            else setCategory("Obese");
        } else {
            if (bf < 2) setCategory("Essential Fat");
            else if (bf < 6) setCategory("Athletes");
            else if (bf < 14) setCategory("Fitness");
            else if (bf < 18) setCategory("Average");
            else setCategory("Obese");
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                {/* Unit Selection */}
                <div className="flex gap-4 p-1 bg-[var(--gray-100)] rounded-lg">
                    <button
                        className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${unit === "metric"
                                ? "bg-white shadow-sm text-[var(--primary-600)]"
                                : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)]"
                            }`}
                        onClick={() => setUnit("metric")}
                    >
                        Metric (cm, kg)
                    </button>
                    <button
                        className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${unit === "imperial"
                                ? "bg-white shadow-sm text-[var(--primary-600)]"
                                : "text-[var(--foreground-secondary)] hover:text-[var(--foreground)]"
                            }`}
                        onClick={() => setUnit("imperial")}
                    >
                        Imperial (in, lbs)
                    </button>
                </div>

                {/* Gender Selection */}
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="gender"
                            checked={gender === "male"}
                            onChange={() => setGender("male")}
                            className="w-4 h-4 text-[var(--primary-500)]"
                        />
                        <span>Male</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="gender"
                            checked={gender === "female"}
                            onChange={() => setGender("female")}
                            className="w-4 h-4 text-[var(--primary-500)]"
                        />
                        <span>Female</span>
                    </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Age</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="e.g. 30"
                            className="input w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Weight ({unit === "metric" ? "kg" : "lbs"})</label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder={unit === "metric" ? "70" : "154"}
                            className="input w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Height ({unit === "metric" ? "cm" : "in"})</label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder={unit === "metric" ? "175" : "69"}
                            className="input w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Neck ({unit === "metric" ? "cm" : "in"})</label>
                        <input
                            type="number"
                            value={neck}
                            onChange={(e) => setNeck(e.target.value)}
                            placeholder={unit === "metric" ? "38" : "15"}
                            className="input w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Waist ({unit === "metric" ? "cm" : "in"})</label>
                        <input
                            type="number"
                            value={waist}
                            onChange={(e) => setWaist(e.target.value)}
                            placeholder={unit === "metric" ? "80" : "31"}
                            className="input w-full"
                        />
                    </div>
                    {gender === "female" && (
                        <div>
                            <label className="block text-sm font-medium mb-2">Hip ({unit === "metric" ? "cm" : "in"})</label>
                            <input
                                type="number"
                                value={hip}
                                onChange={(e) => setHip(e.target.value)}
                                placeholder={unit === "metric" ? "95" : "37"}
                                className="input w-full"
                            />
                        </div>
                    )}
                </div>

                <button
                    onClick={calculateBodyFat}
                    className="btn btn-primary w-full text-lg py-4"
                >
                    Calculate Body Fat
                </button>
            </div>

            {result !== null && (
                <div className="animate-fade-in space-y-4">
                    <div className="h-px bg-[var(--border)]" />

                    <div className="text-center py-6 bg-gradient-to-r from-[var(--secondary-50)] to-[var(--primary-50)] dark:from-[var(--secondary-900)]/20 dark:to-[var(--primary-900)]/20 rounded-xl">
                        <p className="text-sm text-[var(--foreground-secondary)] mb-2">
                            Your Body Fat Percentage
                        </p>
                        <p className="text-3xl md:text-4xl font-bold text-[var(--secondary-600)] dark:text-[var(--secondary-400)]">
                            {result}%
                        </p>
                        <p className="text-lg font-medium text-[var(--primary-600)] mt-2">
                            {category}
                        </p>
                    </div>

                    <div className="mt-4">
                        <div className="h-4 bg-[var(--gray-200)] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 transition-all duration-1000"
                                style={{ width: `${Math.min(result * 2, 100)}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-xs text-[var(--foreground-secondary)] mt-1">
                            <span>Essential</span>
                            <span>Athletes</span>
                            <span>Fitness</span>
                            <span>Average</span>
                            <span>Obese</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
