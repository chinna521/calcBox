"use client";

import { useState } from "react";

type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "veryActive";
type Goal = "lose" | "maintain" | "gain";

export default function CalorieCalculator() {
    const [gender, setGender] = useState<"male" | "female">("male");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");
    const [activity, setActivity] = useState<ActivityLevel>("moderate");
    const [goal, setGoal] = useState<Goal>("maintain");
    const [result, setResult] = useState<{
        bmr: number;
        tdee: number;
        goalCalories: number;
        protein: number;
        carbs: number;
        fat: number;
    } | null>(null);

    const activityLevels = [
        { value: "sedentary", label: "Sedentary", desc: "Little or no exercise", multiplier: 1.2 },
        { value: "light", label: "Light", desc: "Exercise 1-3 days/week", multiplier: 1.375 },
        { value: "moderate", label: "Moderate", desc: "Exercise 3-5 days/week", multiplier: 1.55 },
        { value: "active", label: "Active", desc: "Exercise 6-7 days/week", multiplier: 1.725 },
        { value: "veryActive", label: "Very Active", desc: "Hard exercise daily", multiplier: 1.9 },
    ];

    const calculate = () => {
        let weightKg = parseFloat(weight);
        let heightCm = parseFloat(height);

        if (unit === "imperial") {
            weightKg = weightKg * 0.453592;
            heightCm = heightCm * 2.54;
        }

        const ageNum = parseFloat(age);
        if (!weightKg || !heightCm || !ageNum) return;

        // Mifflin-St Jeor Equation
        let bmr: number;
        if (gender === "male") {
            bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5;
        } else {
            bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
        }

        const activityMultiplier = activityLevels.find(a => a.value === activity)?.multiplier || 1.55;
        const tdee = bmr * activityMultiplier;

        let goalCalories: number;
        switch (goal) {
            case "lose":
                goalCalories = tdee - 500; // 0.5kg per week deficit
                break;
            case "gain":
                goalCalories = tdee + 500; // 0.5kg per week surplus
                break;
            default:
                goalCalories = tdee;
        }

        // Macro breakdown (moderate: 30% protein, 40% carbs, 30% fat)
        const protein = (goalCalories * 0.30) / 4; // 4 calories per gram
        const carbs = (goalCalories * 0.40) / 4;
        const fat = (goalCalories * 0.30) / 9; // 9 calories per gram

        setResult({
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            goalCalories: Math.round(goalCalories),
            protein: Math.round(protein),
            carbs: Math.round(carbs),
            fat: Math.round(fat),
        });
    };

    const isValid = age && weight && height;

    return (
        <div className="space-y-6">
            {/* Unit Toggle */}
            <div className="flex rounded-lg bg-[var(--gray-100)] dark:bg-[var(--gray-800)] p-1">
                <button
                    onClick={() => setUnit("metric")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${unit === "metric" ? "bg-white dark:bg-[var(--gray-700)] shadow-sm" : "text-[var(--foreground-secondary)]"
                        }`}
                >
                    Metric (kg/cm)
                </button>
                <button
                    onClick={() => setUnit("imperial")}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${unit === "imperial" ? "bg-white dark:bg-[var(--gray-700)] shadow-sm" : "text-[var(--foreground-secondary)]"
                        }`}
                >
                    Imperial (lb/in)
                </button>
            </div>

            {/* Input Section */}
            <div className="space-y-4">
                {/* Gender */}
                <div>
                    <label className="block text-sm font-medium mb-2">Gender</label>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => setGender("male")}
                            className={`py-3 rounded-lg font-medium transition-all ${gender === "male"
                                    ? "bg-[var(--primary-500)] text-white"
                                    : "bg-[var(--gray-100)] dark:bg-[var(--gray-800)]"
                                }`}
                        >
                            👨 Male
                        </button>
                        <button
                            onClick={() => setGender("female")}
                            className={`py-3 rounded-lg font-medium transition-all ${gender === "female"
                                    ? "bg-[var(--secondary-500)] text-white"
                                    : "bg-[var(--gray-100)] dark:bg-[var(--gray-800)]"
                                }`}
                        >
                            👩 Female
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <label className="block text-sm font-medium mb-2">Age</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="25"
                            className="input"
                            min="0"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Weight ({unit === "metric" ? "kg" : "lb"})
                        </label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder={unit === "metric" ? "70" : "154"}
                            className="input"
                            min="0"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Height ({unit === "metric" ? "cm" : "in"})
                        </label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder={unit === "metric" ? "175" : "69"}
                            className="input"
                            min="0"
                        />
                    </div>
                </div>

                {/* Activity Level */}
                <div>
                    <label className="block text-sm font-medium mb-2">Activity Level</label>
                    <div className="space-y-2">
                        {activityLevels.map((level) => (
                            <button
                                key={level.value}
                                onClick={() => setActivity(level.value as ActivityLevel)}
                                className={`w-full p-3 rounded-lg text-left transition-all ${activity === level.value
                                        ? "bg-[var(--primary-500)] text-white"
                                        : "bg-[var(--gray-100)] dark:bg-[var(--gray-800)] hover:bg-[var(--gray-200)]"
                                    }`}
                            >
                                <span className="font-medium">{level.label}</span>
                                <span className={`ml-2 text-sm ${activity === level.value ? "text-white/80" : "text-[var(--foreground-secondary)]"}`}>
                                    - {level.desc}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Goal */}
                <div>
                    <label className="block text-sm font-medium mb-2">Goal</label>
                    <div className="grid grid-cols-3 gap-2">
                        <button
                            onClick={() => setGoal("lose")}
                            className={`py-3 rounded-lg font-medium transition-all ${goal === "lose" ? "bg-red-500 text-white" : "bg-[var(--gray-100)] dark:bg-[var(--gray-800)]"
                                }`}
                        >
                            📉 Lose
                        </button>
                        <button
                            onClick={() => setGoal("maintain")}
                            className={`py-3 rounded-lg font-medium transition-all ${goal === "maintain" ? "bg-[var(--success-500)] text-white" : "bg-[var(--gray-100)] dark:bg-[var(--gray-800)]"
                                }`}
                        >
                            ⚖️ Maintain
                        </button>
                        <button
                            onClick={() => setGoal("gain")}
                            className={`py-3 rounded-lg font-medium transition-all ${goal === "gain" ? "bg-[var(--primary-500)] text-white" : "bg-[var(--gray-100)] dark:bg-[var(--gray-800)]"
                                }`}
                        >
                            📈 Gain
                        </button>
                    </div>
                </div>

                <button
                    onClick={calculate}
                    className="btn btn-primary w-full text-lg py-4"
                    disabled={!isValid}
                >
                    Calculate Calories
                </button>
            </div>

            {/* Results */}
            {result && (
                <div className="space-y-4 animate-fade-in">
                    <div className="h-px bg-[var(--border)]" />

                    {/* Main Result */}
                    <div className="text-center py-6 bg-gradient-to-r from-[var(--success-50)] to-[var(--primary-50)] dark:from-[var(--success-900)]/20 dark:to-[var(--primary-900)]/20 rounded-xl">
                        <p className="text-sm text-[var(--foreground-secondary)] mb-2">Daily Calorie Target</p>
                        <p className="text-5xl font-bold text-[var(--success-600)] dark:text-[var(--success-400)]">
                            {result.goalCalories.toLocaleString()}
                        </p>
                        <p className="text-[var(--foreground-secondary)]">calories/day</p>
                    </div>

                    {/* BMR & TDEE */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="card p-4 text-center">
                            <p className="text-xl font-bold text-[var(--primary-500)]">{result.bmr.toLocaleString()}</p>
                            <p className="text-sm text-[var(--foreground-secondary)]">BMR (Base)</p>
                        </div>
                        <div className="card p-4 text-center">
                            <p className="text-xl font-bold text-[var(--warning-500)]">{result.tdee.toLocaleString()}</p>
                            <p className="text-sm text-[var(--foreground-secondary)]">TDEE (Maintenance)</p>
                        </div>
                    </div>

                    {/* Macros */}
                    <div className="card p-4">
                        <h4 className="font-semibold mb-3">Suggested Macros</h4>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="w-full h-2 bg-[var(--gray-200)] rounded-full overflow-hidden mb-2">
                                    <div className="h-full bg-red-500 w-[30%]" />
                                </div>
                                <p className="text-lg font-bold text-red-500">{result.protein}g</p>
                                <p className="text-xs text-[var(--foreground-secondary)]">Protein</p>
                            </div>
                            <div>
                                <div className="w-full h-2 bg-[var(--gray-200)] rounded-full overflow-hidden mb-2">
                                    <div className="h-full bg-[var(--warning-500)] w-[40%]" />
                                </div>
                                <p className="text-lg font-bold text-[var(--warning-500)]">{result.carbs}g</p>
                                <p className="text-xs text-[var(--foreground-secondary)]">Carbs</p>
                            </div>
                            <div>
                                <div className="w-full h-2 bg-[var(--gray-200)] rounded-full overflow-hidden mb-2">
                                    <div className="h-full bg-[var(--primary-500)] w-[30%]" />
                                </div>
                                <p className="text-lg font-bold text-[var(--primary-500)]">{result.fat}g</p>
                                <p className="text-xs text-[var(--foreground-secondary)]">Fat</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
