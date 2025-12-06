"use client";

import { useState } from "react";

export default function OvulationCalculator() {
    const [lastPeriodDate, setLastPeriodDate] = useState("");
    const [cycleLength, setCycleLength] = useState("28");
    const [result, setResult] = useState<{
        ovulationDate: Date;
        fertileWindowStart: Date;
        fertileWindowEnd: Date;
        nextPeriodDate: Date;
        peakDays: Date[];
    } | null>(null);

    const calculate = () => {
        if (!lastPeriodDate) return;

        const lmp = new Date(lastPeriodDate);
        const cycle = parseInt(cycleLength);

        // Ovulation typically occurs 14 days before the next period
        const ovulationDay = cycle - 14;
        const ovulationDate = new Date(lmp);
        ovulationDate.setDate(ovulationDate.getDate() + ovulationDay);

        // Fertile window is typically 5 days before ovulation to 1 day after
        const fertileWindowStart = new Date(ovulationDate);
        fertileWindowStart.setDate(fertileWindowStart.getDate() - 5);

        const fertileWindowEnd = new Date(ovulationDate);
        fertileWindowEnd.setDate(fertileWindowEnd.getDate() + 1);

        // Next period
        const nextPeriodDate = new Date(lmp);
        nextPeriodDate.setDate(nextPeriodDate.getDate() + cycle);

        // Peak fertility days (2 days before ovulation + ovulation day)
        const peakDays = [
            new Date(ovulationDate.getTime() - 2 * 24 * 60 * 60 * 1000),
            new Date(ovulationDate.getTime() - 1 * 24 * 60 * 60 * 1000),
            ovulationDate,
        ];

        setResult({
            ovulationDate,
            fertileWindowStart,
            fertileWindowEnd,
            nextPeriodDate,
            peakDays,
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    };

    const formatFullDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    // Generate calendar view
    const generateCalendar = () => {
        if (!result) return null;

        const startDate = new Date(lastPeriodDate);
        const days = [];

        for (let i = 0; i < parseInt(cycleLength); i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(currentDate.getDate() + i);

            let type: "period" | "fertile" | "peak" | "ovulation" | "normal" = "normal";

            if (i < 5) {
                type = "period";
            } else if (currentDate.toDateString() === result.ovulationDate.toDateString()) {
                type = "ovulation";
            } else if (result.peakDays.some(d => d.toDateString() === currentDate.toDateString())) {
                type = "peak";
            } else if (currentDate >= result.fertileWindowStart && currentDate <= result.fertileWindowEnd) {
                type = "fertile";
            }

            days.push({ date: currentDate, type, day: i + 1 });
        }

        return days;
    };

    const calendar = result ? generateCalendar() : null;

    return (
        <div className="space-y-6">
            {/* Input Section */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        First Day of Last Period
                    </label>
                    <input
                        type="date"
                        value={lastPeriodDate}
                        onChange={(e) => setLastPeriodDate(e.target.value)}
                        className="input"
                        max={new Date().toISOString().split("T")[0]}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Average Cycle Length
                    </label>
                    <select
                        value={cycleLength}
                        onChange={(e) => setCycleLength(e.target.value)}
                        className="input"
                    >
                        {Array.from({ length: 16 }, (_, i) => i + 21).map((days) => (
                            <option key={days} value={days}>
                                {days} days {days === 28 ? "(average)" : ""}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={calculate}
                    className="btn btn-primary w-full text-lg py-4"
                    disabled={!lastPeriodDate}
                >
                    Calculate Fertile Days
                </button>
            </div>

            {/* Results */}
            {result && (
                <div className="space-y-4 animate-fade-in">
                    <div className="h-px bg-[var(--border)]" />

                    {/* Ovulation Date */}
                    <div className="text-center py-6 bg-gradient-to-r from-[var(--secondary-50)] to-[var(--primary-50)] dark:from-[var(--secondary-900)]/20 dark:to-[var(--primary-900)]/20 rounded-xl">
                        <p className="text-sm text-[var(--foreground-secondary)] mb-2">Estimated Ovulation Date</p>
                        <p className="text-3xl font-bold text-[var(--secondary-600)] dark:text-[var(--secondary-400)]">
                            🌸 {formatFullDate(result.ovulationDate)}
                        </p>
                    </div>

                    {/* Key Dates */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="card p-4">
                            <p className="text-sm text-[var(--foreground-secondary)] mb-1">Fertile Window</p>
                            <p className="font-semibold text-[var(--success-600)]">
                                {formatDate(result.fertileWindowStart)} - {formatDate(result.fertileWindowEnd)}
                            </p>
                        </div>
                        <div className="card p-4">
                            <p className="text-sm text-[var(--foreground-secondary)] mb-1">Next Period</p>
                            <p className="font-semibold text-[var(--primary-600)]">
                                {formatDate(result.nextPeriodDate)}
                            </p>
                        </div>
                    </div>

                    {/* Calendar View */}
                    <div className="card p-4">
                        <h4 className="font-semibold mb-3">Cycle Calendar</h4>
                        <div className="grid grid-cols-7 gap-1">
                            {calendar?.map((day, i) => (
                                <div
                                    key={i}
                                    className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs ${day.type === "period"
                                            ? "bg-red-100 dark:bg-red-900/30 text-red-600"
                                            : day.type === "ovulation"
                                                ? "bg-[var(--secondary-500)] text-white font-bold"
                                                : day.type === "peak"
                                                    ? "bg-[var(--secondary-200)] dark:bg-[var(--secondary-800)] text-[var(--secondary-700)]"
                                                    : day.type === "fertile"
                                                        ? "bg-[var(--success-100)] dark:bg-[var(--success-900)]/30 text-[var(--success-600)]"
                                                        : "bg-[var(--gray-100)] dark:bg-[var(--gray-800)]"
                                        }`}
                                    title={formatDate(day.date)}
                                >
                                    <span className="font-medium">{day.date.getDate()}</span>
                                </div>
                            ))}
                        </div>

                        {/* Legend */}
                        <div className="flex flex-wrap gap-3 mt-4 text-xs">
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded bg-red-100 dark:bg-red-900/30" />
                                <span>Period</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded bg-[var(--success-100)] dark:bg-[var(--success-900)]/30" />
                                <span>Fertile</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded bg-[var(--secondary-200)] dark:bg-[var(--secondary-800)]" />
                                <span>Peak</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded bg-[var(--secondary-500)]" />
                                <span>Ovulation</span>
                            </div>
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="card p-4 bg-[var(--gray-50)] dark:bg-[var(--gray-800)]">
                        <h4 className="font-semibold mb-2">💡 Tips</h4>
                        <ul className="text-sm text-[var(--foreground-secondary)] space-y-1">
                            <li>• The 2-3 days before ovulation are your most fertile days</li>
                            <li>• Sperm can survive up to 5 days in the reproductive tract</li>
                            <li>• An egg is viable for 12-24 hours after ovulation</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
