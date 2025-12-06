"use client";

import { useState } from "react";

export default function AgeCalculator() {
    const [birthDate, setBirthDate] = useState("");
    const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
    const [result, setResult] = useState<{
        years: number;
        months: number;
        days: number;
        totalDays: number;
        totalWeeks: number;
        totalMonths: number;
        nextBirthday: Date;
        daysUntilBirthday: number;
    } | null>(null);

    const calculate = () => {
        if (!birthDate) return;

        const birth = new Date(birthDate);
        const target = new Date(toDate);

        if (birth > target) return;

        // Calculate age
        let years = target.getFullYear() - birth.getFullYear();
        let months = target.getMonth() - birth.getMonth();
        let days = target.getDate() - birth.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        // Total calculations
        const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
        const totalWeeks = Math.floor(totalDays / 7);
        const totalMonths = years * 12 + months;

        // Next birthday
        const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
        if (nextBirthday <= target) {
            nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
        }
        const daysUntilBirthday = Math.floor((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

        setResult({
            years,
            months,
            days,
            totalDays,
            totalWeeks,
            totalMonths,
            nextBirthday,
            daysUntilBirthday,
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
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="input"
                        max={new Date().toISOString().split("T")[0]}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Calculate Age At (optional)
                    </label>
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="input"
                    />
                </div>

                <button
                    onClick={calculate}
                    className="btn btn-primary w-full text-lg py-4"
                    disabled={!birthDate}
                >
                    Calculate Age
                </button>
            </div>

            {/* Results Section */}
            {result && (
                <div className="space-y-4 animate-fade-in">
                    <div className="h-px bg-[var(--border)]" />

                    {/* Main Result */}
                    <div className="text-center py-6 bg-gradient-to-r from-[var(--warning-50)] to-[var(--primary-50)] dark:from-[var(--warning-900)]/20 dark:to-[var(--primary-900)]/20 rounded-xl">
                        <p className="text-sm text-[var(--foreground-secondary)] mb-2">
                            Your Age
                        </p>
                        <p className="text-3xl md:text-4xl font-bold">
                            <span className="text-[var(--warning-600)] dark:text-[var(--warning-400)]">{result.years}</span>
                            <span className="text-lg font-normal text-[var(--foreground-secondary)]"> years </span>
                            <span className="text-[var(--primary-600)] dark:text-[var(--primary-400)]">{result.months}</span>
                            <span className="text-lg font-normal text-[var(--foreground-secondary)]"> months </span>
                            <span className="text-[var(--success-600)] dark:text-[var(--success-400)]">{result.days}</span>
                            <span className="text-lg font-normal text-[var(--foreground-secondary)]"> days</span>
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="card p-4 text-center">
                            <p className="text-2xl font-bold text-[var(--primary-500)]">
                                {result.totalDays.toLocaleString()}
                            </p>
                            <p className="text-xs text-[var(--foreground-secondary)]">
                                Total Days
                            </p>
                        </div>
                        <div className="card p-4 text-center">
                            <p className="text-2xl font-bold text-[var(--success-500)]">
                                {result.totalWeeks.toLocaleString()}
                            </p>
                            <p className="text-xs text-[var(--foreground-secondary)]">
                                Total Weeks
                            </p>
                        </div>
                        <div className="card p-4 text-center">
                            <p className="text-2xl font-bold text-[var(--warning-500)]">
                                {result.totalMonths.toLocaleString()}
                            </p>
                            <p className="text-xs text-[var(--foreground-secondary)]">
                                Total Months
                            </p>
                        </div>
                    </div>

                    {/* Next Birthday */}
                    <div className="card p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-[var(--secondary-100)] dark:bg-[var(--secondary-900)]/20 flex items-center justify-center text-2xl">
                                🎂
                            </div>
                            <div>
                                <p className="text-sm text-[var(--foreground-secondary)]">
                                    Next Birthday
                                </p>
                                <p className="font-semibold">
                                    {formatDate(result.nextBirthday)}
                                </p>
                                <p className="text-sm text-[var(--secondary-500)]">
                                    {result.daysUntilBirthday} days away
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Fun Facts */}
                    <div className="card p-4 bg-[var(--gray-50)] dark:bg-[var(--gray-800)]">
                        <h4 className="font-semibold mb-3">✨ Fun Facts</h4>
                        <ul className="space-y-2 text-sm text-[var(--foreground-secondary)]">
                            <li>• You&apos;ve lived through approximately {Math.floor(result.totalDays * 24).toLocaleString()} hours</li>
                            <li>• That&apos;s about {Math.floor(result.totalDays * 24 * 60).toLocaleString()} minutes</li>
                            <li>• Your heart has beaten roughly {Math.floor(result.totalDays * 100000).toLocaleString()} times</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
