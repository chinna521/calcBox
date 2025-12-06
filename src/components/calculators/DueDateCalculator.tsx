"use client";

import { useState } from "react";

export default function DueDateCalculator() {
    const [lmpDate, setLmpDate] = useState("");
    const [cycleLength, setCycleLength] = useState("28");
    const [result, setResult] = useState<{
        dueDate: Date;
        currentWeeks: number;
        currentDays: number;
        trimester: number;
        daysRemaining: number;
    } | null>(null);

    const calculate = () => {
        if (!lmpDate) return;

        const lmp = new Date(lmpDate);
        const cycleDiff = parseInt(cycleLength) - 28;

        // Naegele's Rule: Add 280 days (40 weeks) to LMP, adjust for cycle length
        const dueDate = new Date(lmp);
        dueDate.setDate(dueDate.getDate() + 280 + cycleDiff);

        // Calculate current pregnancy progress
        const today = new Date();
        const daysSinceLMP = Math.floor((today.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24));
        const currentWeeks = Math.floor(daysSinceLMP / 7);
        const currentDays = daysSinceLMP % 7;

        // Determine trimester
        let trimester = 1;
        if (currentWeeks >= 13 && currentWeeks < 27) trimester = 2;
        else if (currentWeeks >= 27) trimester = 3;

        // Days remaining
        const daysRemaining = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        setResult({
            dueDate,
            currentWeeks,
            currentDays,
            trimester,
            daysRemaining: Math.max(0, daysRemaining),
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="space-y-6">
            {/* Input Section */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        First Day of Last Menstrual Period (LMP)
                    </label>
                    <input
                        type="date"
                        value={lmpDate}
                        onChange={(e) => setLmpDate(e.target.value)}
                        className="input"
                        max={new Date().toISOString().split("T")[0]}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Average Cycle Length (days)
                    </label>
                    <select
                        value={cycleLength}
                        onChange={(e) => setCycleLength(e.target.value)}
                        className="input"
                    >
                        {Array.from({ length: 15 }, (_, i) => i + 21).map((days) => (
                            <option key={days} value={days}>
                                {days} days {days === 28 ? "(average)" : ""}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={calculate}
                    className="btn btn-primary w-full text-lg py-4"
                    disabled={!lmpDate}
                >
                    Calculate Due Date
                </button>
            </div>

            {/* Results Section */}
            {result && (
                <div className="space-y-4 animate-fade-in">
                    <div className="h-px bg-[var(--border)]" />

                    {/* Main Result */}
                    <div className="text-center py-6 bg-gradient-to-r from-[var(--secondary-50)] to-[var(--primary-50)] dark:from-[var(--secondary-900)]/20 dark:to-[var(--primary-900)]/20 rounded-xl">
                        <p className="text-sm text-[var(--foreground-secondary)] mb-2">
                            Your Estimated Due Date
                        </p>
                        <p className="text-3xl md:text-4xl font-bold text-[var(--secondary-600)] dark:text-[var(--secondary-400)]">
                            🎉 {formatDate(result.dueDate)}
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="card p-4 text-center">
                            <p className="text-2xl font-bold text-[var(--primary-500)]">
                                {result.currentWeeks}w {result.currentDays}d
                            </p>
                            <p className="text-sm text-[var(--foreground-secondary)]">
                                Current Progress
                            </p>
                        </div>
                        <div className="card p-4 text-center">
                            <p className="text-2xl font-bold text-[var(--success-500)]">
                                Trimester {result.trimester}
                            </p>
                            <p className="text-sm text-[var(--foreground-secondary)]">
                                Current Stage
                            </p>
                        </div>
                        <div className="card p-4 text-center col-span-2">
                            <p className="text-2xl font-bold text-[var(--warning-500)]">
                                {result.daysRemaining} days
                            </p>
                            <p className="text-sm text-[var(--foreground-secondary)]">
                                Until Due Date
                            </p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span>Pregnancy Progress</span>
                            <span>{Math.min(100, Math.round((result.currentWeeks / 40) * 100))}%</span>
                        </div>
                        <div className="h-3 bg-[var(--gray-200)] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[var(--secondary-400)] to-[var(--secondary-600)] rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(100, (result.currentWeeks / 40) * 100)}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-xs text-[var(--foreground-secondary)] mt-1">
                            <span>Week 0</span>
                            <span>Week 13</span>
                            <span>Week 27</span>
                            <span>Week 40</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
