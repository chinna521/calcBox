"use client";

import { useState } from "react";

export default function DaysBetweenDatesCalculator() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [includeEndDate, setIncludeEndDate] = useState(false);
    const [result, setResult] = useState<{
        days: number;
        weeks: number;
        months: number;
        years: number;
        weekdays: number;
        weekends: number;
        isNegative: boolean;
    } | null>(null);

    const calculate = () => {
        if (!startDate || !endDate) return;

        const start = new Date(startDate);
        const end = new Date(endDate);

        let diffMs = end.getTime() - start.getTime();
        const isNegative = diffMs < 0;
        diffMs = Math.abs(diffMs);

        let days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (includeEndDate) days += 1;

        const weeks = Math.floor(days / 7);
        const years = days / 365.25;
        const months = days / 30.44;

        // Count weekdays and weekends
        let weekdays = 0;
        let weekends = 0;
        const current = new Date(isNegative ? end : start);
        const endLoop = new Date(isNegative ? start : end);

        while (current <= endLoop) {
            const dayOfWeek = current.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                weekends++;
            } else {
                weekdays++;
            }
            current.setDate(current.getDate() + 1);
        }

        setResult({
            days,
            weeks,
            months,
            years,
            weekdays,
            weekends,
            isNegative,
        });
    };

    const setQuickDate = (type: "today" | "tomorrow" | "week" | "month" | "year", field: "start" | "end") => {
        const date = new Date();
        switch (type) {
            case "today":
                break;
            case "tomorrow":
                date.setDate(date.getDate() + 1);
                break;
            case "week":
                date.setDate(date.getDate() + 7);
                break;
            case "month":
                date.setMonth(date.getMonth() + 1);
                break;
            case "year":
                date.setFullYear(date.getFullYear() + 1);
                break;
        }
        const dateStr = date.toISOString().split("T")[0];
        if (field === "start") {
            setStartDate(dateStr);
        } else {
            setEndDate(dateStr);
        }
    };

    return (
        <div className="space-y-6">
            {/* Input Section */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Start Date
                    </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="input"
                    />
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={() => setQuickDate("today", "start")}
                            className="text-xs px-2 py-1 rounded bg-[var(--gray-100)] dark:bg-[var(--gray-800)] hover:bg-[var(--gray-200)]"
                        >
                            Today
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        End Date
                    </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="input"
                    />
                    <div className="flex gap-2 mt-2 flex-wrap">
                        <button
                            onClick={() => setQuickDate("today", "end")}
                            className="text-xs px-2 py-1 rounded bg-[var(--gray-100)] dark:bg-[var(--gray-800)] hover:bg-[var(--gray-200)]"
                        >
                            Today
                        </button>
                        <button
                            onClick={() => setQuickDate("week", "end")}
                            className="text-xs px-2 py-1 rounded bg-[var(--gray-100)] dark:bg-[var(--gray-800)] hover:bg-[var(--gray-200)]"
                        >
                            +1 Week
                        </button>
                        <button
                            onClick={() => setQuickDate("month", "end")}
                            className="text-xs px-2 py-1 rounded bg-[var(--gray-100)] dark:bg-[var(--gray-800)] hover:bg-[var(--gray-200)]"
                        >
                            +1 Month
                        </button>
                        <button
                            onClick={() => setQuickDate("year", "end")}
                            className="text-xs px-2 py-1 rounded bg-[var(--gray-100)] dark:bg-[var(--gray-800)] hover:bg-[var(--gray-200)]"
                        >
                            +1 Year
                        </button>
                    </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={includeEndDate}
                        onChange={(e) => setIncludeEndDate(e.target.checked)}
                        className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary-500)] focus:ring-[var(--primary-500)]"
                    />
                    <span className="text-sm">Include end date in calculation</span>
                </label>

                <button
                    onClick={calculate}
                    className="btn btn-primary w-full text-lg py-4"
                    disabled={!startDate || !endDate}
                >
                    Calculate Days
                </button>
            </div>

            {/* Results Section */}
            {result && (
                <div className="space-y-4 animate-fade-in">
                    <div className="h-px bg-[var(--border)]" />

                    {/* Main Result */}
                    <div className="text-center py-6 bg-gradient-to-r from-[var(--warning-50)] to-[var(--primary-50)] dark:from-[var(--warning-900)]/20 dark:to-[var(--primary-900)]/20 rounded-xl">
                        {result.isNegative && (
                            <p className="text-xs text-[var(--warning-600)] mb-2">
                                ⚠️ End date is before start date
                            </p>
                        )}
                        <p className="text-sm text-[var(--foreground-secondary)] mb-2">
                            Total Days
                        </p>
                        <p className="text-5xl md:text-6xl font-bold text-[var(--warning-600)] dark:text-[var(--warning-400)]">
                            {result.isNegative && "-"}{result.days.toLocaleString()}
                        </p>
                        <p className="text-[var(--foreground-secondary)] mt-2">days</p>
                    </div>

                    {/* Time Breakdown */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="card p-4 text-center">
                            <p className="text-2xl font-bold text-[var(--primary-500)]">
                                {result.years.toFixed(1)}
                            </p>
                            <p className="text-xs text-[var(--foreground-secondary)]">Years</p>
                        </div>
                        <div className="card p-4 text-center">
                            <p className="text-2xl font-bold text-[var(--success-500)]">
                                {result.months.toFixed(1)}
                            </p>
                            <p className="text-xs text-[var(--foreground-secondary)]">Months</p>
                        </div>
                        <div className="card p-4 text-center">
                            <p className="text-2xl font-bold text-[var(--warning-500)]">
                                {result.weeks.toLocaleString()}
                            </p>
                            <p className="text-xs text-[var(--foreground-secondary)]">Weeks</p>
                        </div>
                        <div className="card p-4 text-center">
                            <p className="text-2xl font-bold text-[var(--secondary-500)]">
                                {Math.floor(result.days * 24).toLocaleString()}
                            </p>
                            <p className="text-xs text-[var(--foreground-secondary)]">Hours</p>
                        </div>
                    </div>

                    {/* Weekdays vs Weekends */}
                    <div className="card p-4">
                        <h4 className="font-semibold mb-3">Day Breakdown</h4>
                        <div className="flex h-8 rounded-full overflow-hidden mb-2">
                            <div
                                className="bg-[var(--primary-500)] flex items-center justify-center text-white text-xs font-medium"
                                style={{ width: `${(result.weekdays / result.days) * 100}%` }}
                            >
                                Weekdays
                            </div>
                            <div
                                className="bg-[var(--success-500)] flex items-center justify-center text-white text-xs font-medium"
                                style={{ width: `${(result.weekends / result.days) * 100}%` }}
                            >
                                Weekends
                            </div>
                        </div>
                        <div className="flex justify-between text-sm text-[var(--foreground-secondary)]">
                            <span>📅 {result.weekdays} weekdays</span>
                            <span>🎉 {result.weekends} weekend days</span>
                        </div>
                    </div>

                    {/* Fun Facts */}
                    <div className="card p-4 bg-[var(--gray-50)] dark:bg-[var(--gray-800)]">
                        <h4 className="font-semibold mb-3">⏰ In This Time Period</h4>
                        <ul className="space-y-2 text-sm text-[var(--foreground-secondary)]">
                            <li>• {(result.days * 24 * 60).toLocaleString()} minutes</li>
                            <li>• {(result.days * 24 * 60 * 60).toLocaleString()} seconds</li>
                            <li>• Approximately {Math.floor(result.days / 7)} full weeks</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
