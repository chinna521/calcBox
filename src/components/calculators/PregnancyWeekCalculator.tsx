"use client";

import { useState } from "react";

export default function PregnancyWeekCalculator() {
    const [lmpDate, setLmpDate] = useState("");
    const [result, setResult] = useState<{
        weeks: number;
        days: number;
        totalDays: number;
        trimester: number;
        dueDate: Date;
        conception: Date;
        daysRemaining: number;
        percentComplete: number;
        babySize: string;
        babySizeEmoji: string;
        development: string;
    } | null>(null);

    // Baby size comparisons by week
    const babySizes: { [key: number]: { size: string; emoji: string; dev: string } } = {
        4: { size: "Poppy seed", emoji: "🌱", dev: "Embryo implanting in uterus" },
        5: { size: "Sesame seed", emoji: "🫘", dev: "Heart begins to form" },
        6: { size: "Lentil", emoji: "🟤", dev: "Brain and nervous system developing" },
        7: { size: "Blueberry", emoji: "🫐", dev: "Arms and legs forming" },
        8: { size: "Raspberry", emoji: "🍇", dev: "Fingers and toes developing" },
        9: { size: "Grape", emoji: "🍇", dev: "All major organs formed" },
        10: { size: "Kumquat", emoji: "🍊", dev: "Bones beginning to harden" },
        11: { size: "Fig", emoji: "🫐", dev: "Baby can open and close fists" },
        12: { size: "Lime", emoji: "🍋", dev: "Reflexes developing" },
        13: { size: "Peach", emoji: "🍑", dev: "Fingerprints forming" },
        14: { size: "Lemon", emoji: "🍋", dev: "Baby can make facial expressions" },
        15: { size: "Apple", emoji: "🍎", dev: "Bones becoming visible on ultrasound" },
        16: { size: "Avocado", emoji: "🥑", dev: "Baby can hear sounds" },
        17: { size: "Pear", emoji: "🍐", dev: "Fat stores developing" },
        18: { size: "Bell pepper", emoji: "🫑", dev: "Baby is yawning and hiccupping" },
        19: { size: "Mango", emoji: "🥭", dev: "Senses developing rapidly" },
        20: { size: "Banana", emoji: "🍌", dev: "Halfway there! Baby swallowing more" },
        21: { size: "Carrot", emoji: "🥕", dev: "Eyebrows and eyelids formed" },
        22: { size: "Papaya", emoji: "🍈", dev: "Sense of touch developing" },
        23: { size: "Grapefruit", emoji: "🍊", dev: "Baby can hear your voice" },
        24: { size: "Ear of corn", emoji: "🌽", dev: "Lungs developing surfactant" },
        25: { size: "Rutabaga", emoji: "🥔", dev: "Baby responds to sounds" },
        26: { size: "Zucchini", emoji: "🥒", dev: "Eyes can open" },
        27: { size: "Cauliflower", emoji: "🥦", dev: "Brain very active" },
        28: { size: "Eggplant", emoji: "🍆", dev: "Baby can blink and dream" },
        29: { size: "Butternut squash", emoji: "🎃", dev: "Bones fully developed" },
        30: { size: "Cabbage", emoji: "🥬", dev: "Baby practicing breathing" },
        31: { size: "Coconut", emoji: "🥥", dev: "All five senses working" },
        32: { size: "Jicama", emoji: "🥔", dev: "Toenails and fingernails complete" },
        33: { size: "Pineapple", emoji: "🍍", dev: "Bones hardening further" },
        34: { size: "Cantaloupe", emoji: "🍈", dev: "Central nervous system maturing" },
        35: { size: "Honeydew", emoji: "🍈", dev: "Most organs fully functional" },
        36: { size: "Romaine lettuce", emoji: "🥬", dev: "Baby dropping into pelvis" },
        37: { size: "Swiss chard", emoji: "🥬", dev: "Full term! Baby ready" },
        38: { size: "Leek", emoji: "🥬", dev: "Organs fully matured" },
        39: { size: "Watermelon", emoji: "🍉", dev: "Baby continues gaining weight" },
        40: { size: "Pumpkin", emoji: "🎃", dev: "Ready to be born!" },
    };

    const calculate = () => {
        if (!lmpDate) return;

        const lmp = new Date(lmpDate);
        const today = new Date();
        const daysSinceLMP = Math.floor((today.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24));

        const weeks = Math.floor(daysSinceLMP / 7);
        const days = daysSinceLMP % 7;

        // Due date (40 weeks from LMP)
        const dueDate = new Date(lmp);
        dueDate.setDate(dueDate.getDate() + 280);

        // Conception date (approximately 2 weeks after LMP)
        const conception = new Date(lmp);
        conception.setDate(conception.getDate() + 14);

        // Days remaining
        const daysRemaining = Math.max(0, Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

        // Trimester
        let trimester = 1;
        if (weeks >= 13 && weeks < 27) trimester = 2;
        else if (weeks >= 27) trimester = 3;

        // Percent complete
        const percentComplete = Math.min(100, (daysSinceLMP / 280) * 100);

        // Baby size for current week
        const weekData = babySizes[Math.min(40, Math.max(4, weeks))] || babySizes[4];

        setResult({
            weeks,
            days,
            totalDays: daysSinceLMP,
            trimester,
            dueDate,
            conception,
            daysRemaining,
            percentComplete,
            babySize: weekData.size,
            babySizeEmoji: weekData.emoji,
            development: weekData.dev,
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="space-y-6">
            {/* Input Section */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        First Day of Last Menstrual Period
                    </label>
                    <input
                        type="date"
                        value={lmpDate}
                        onChange={(e) => setLmpDate(e.target.value)}
                        className="input"
                        max={new Date().toISOString().split("T")[0]}
                    />
                </div>

                <button
                    onClick={calculate}
                    className="btn btn-primary w-full text-lg py-4"
                    disabled={!lmpDate}
                >
                    Calculate Pregnancy Week
                </button>
            </div>

            {/* Results */}
            {result && (
                <div className="space-y-4 animate-fade-in">
                    <div className="h-px bg-[var(--border)]" />

                    {/* Main Result */}
                    <div className="text-center py-6 bg-gradient-to-r from-[var(--secondary-50)] to-[var(--primary-50)] dark:from-[var(--secondary-900)]/20 dark:to-[var(--primary-900)]/20 rounded-xl">
                        <p className="text-sm text-[var(--foreground-secondary)] mb-2">You are currently</p>
                        <p className="text-5xl font-bold text-[var(--secondary-600)] dark:text-[var(--secondary-400)]">
                            {result.weeks} weeks, {result.days} days
                        </p>
                        <p className="text-lg text-[var(--foreground-secondary)] mt-2">
                            Trimester {result.trimester}
                        </p>
                    </div>

                    {/* Baby Size */}
                    <div className="card p-6 text-center bg-gradient-to-r from-[var(--warning-50)] to-[var(--success-50)] dark:from-[var(--warning-900)]/20 dark:to-[var(--success-900)]/20">
                        <p className="text-6xl mb-2">{result.babySizeEmoji}</p>
                        <p className="text-lg font-semibold">
                            Baby is the size of a {result.babySize}
                        </p>
                        <p className="text-sm text-[var(--foreground-secondary)] mt-2">
                            {result.development}
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="card p-4">
                        <div className="flex justify-between text-sm mb-2">
                            <span>Pregnancy Progress</span>
                            <span>{result.percentComplete.toFixed(1)}%</span>
                        </div>
                        <div className="h-4 bg-[var(--gray-200)] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[var(--secondary-400)] to-[var(--secondary-600)] rounded-full transition-all duration-500"
                                style={{ width: `${result.percentComplete}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-xs text-[var(--foreground-secondary)] mt-2">
                            <span>Week 1</span>
                            <span className="text-center">Week 13<br />2nd Tri</span>
                            <span className="text-center">Week 27<br />3rd Tri</span>
                            <span>Week 40</span>
                        </div>
                    </div>

                    {/* Key Dates */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="card p-4">
                            <p className="text-sm text-[var(--foreground-secondary)]">Estimated Due Date</p>
                            <p className="font-semibold text-[var(--primary-600)]">{formatDate(result.dueDate)}</p>
                        </div>
                        <div className="card p-4">
                            <p className="text-sm text-[var(--foreground-secondary)]">Days Remaining</p>
                            <p className="font-semibold text-[var(--warning-600)]">{result.daysRemaining} days</p>
                        </div>
                        <div className="card p-4">
                            <p className="text-sm text-[var(--foreground-secondary)]">Approximate Conception</p>
                            <p className="font-semibold">{formatDate(result.conception)}</p>
                        </div>
                        <div className="card p-4">
                            <p className="text-sm text-[var(--foreground-secondary)]">Total Days Pregnant</p>
                            <p className="font-semibold">{result.totalDays} days</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
