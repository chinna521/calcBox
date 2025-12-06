"use client";

import { useState } from "react";

export default function CompoundInterestCalculator() {
    const [principal, setPrincipal] = useState("");
    const [rate, setRate] = useState("");
    const [time, setTime] = useState("");
    const [timeUnit, setTimeUnit] = useState<"years" | "months">("years");
    const [compound, setCompound] = useState("12"); // Monthly by default
    const [monthlyDeposit, setMonthlyDeposit] = useState("");
    const [result, setResult] = useState<{
        futureValue: number;
        totalDeposits: number;
        totalInterest: number;
        yearlyBreakdown: Array<{
            year: number;
            balance: number;
            deposits: number;
            interest: number;
        }>;
    } | null>(null);

    const compoundOptions = [
        { value: "1", label: "Annually" },
        { value: "2", label: "Semi-annually" },
        { value: "4", label: "Quarterly" },
        { value: "12", label: "Monthly" },
        { value: "52", label: "Weekly" },
        { value: "365", label: "Daily" },
    ];

    const calculate = () => {
        const P = parseFloat(principal);
        const r = parseFloat(rate) / 100;
        const n = parseInt(compound);
        const years = timeUnit === "years" ? parseFloat(time) : parseFloat(time) / 12;
        const monthly = parseFloat(monthlyDeposit) || 0;

        if (!P || !r || !years || P < 0 || r < 0 || years <= 0) return;

        // Compound interest formula with monthly deposits
        // A = P(1 + r/n)^(nt) + PMT × (((1 + r/n)^(nt) - 1) / (r/n))
        const nt = n * years;
        const rn = r / n;

        let futureValue = P * Math.pow(1 + rn, nt);

        // Add monthly deposits compound interest
        if (monthly > 0) {
            // Convert monthly to per-compound-period
            const depositPerPeriod = monthly * 12 / n;
            futureValue += depositPerPeriod * ((Math.pow(1 + rn, nt) - 1) / rn);
        }

        const totalDeposits = P + (monthly * 12 * years);
        const totalInterest = futureValue - totalDeposits;

        // Calculate yearly breakdown
        const yearlyBreakdown = [];
        for (let year = 1; year <= Math.ceil(years); year++) {
            const t = Math.min(year, years);
            const ntYear = n * t;
            let balance = P * Math.pow(1 + rn, ntYear);
            if (monthly > 0) {
                const depositPerPeriod = monthly * 12 / n;
                balance += depositPerPeriod * ((Math.pow(1 + rn, ntYear) - 1) / rn);
            }
            const deposits = P + (monthly * 12 * t);
            yearlyBreakdown.push({
                year,
                balance,
                deposits,
                interest: balance - deposits,
            });
        }

        setResult({
            futureValue,
            totalDeposits,
            totalInterest,
            yearlyBreakdown: yearlyBreakdown.slice(0, 10), // Show max 10 years
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const isValid = principal && rate && time;

    return (
        <div className="space-y-6">
            {/* Input Section */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Initial Investment ($)
                    </label>
                    <input
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                        placeholder="e.g., 10000"
                        className="input"
                        min="0"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Annual Interest Rate (%)
                    </label>
                    <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        placeholder="e.g., 7"
                        className="input"
                        min="0"
                        step="0.1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Investment Period
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            placeholder={timeUnit === "years" ? "e.g., 10" : "e.g., 120"}
                            className="input flex-1"
                            min="0"
                        />
                        <select
                            value={timeUnit}
                            onChange={(e) => setTimeUnit(e.target.value as "years" | "months")}
                            className="input w-32"
                        >
                            <option value="years">Years</option>
                            <option value="months">Months</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Compound Frequency
                    </label>
                    <select
                        value={compound}
                        onChange={(e) => setCompound(e.target.value)}
                        className="input"
                    >
                        {compoundOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Monthly Deposit (optional)
                    </label>
                    <input
                        type="number"
                        value={monthlyDeposit}
                        onChange={(e) => setMonthlyDeposit(e.target.value)}
                        placeholder="e.g., 500"
                        className="input"
                        min="0"
                    />
                </div>

                <button
                    onClick={calculate}
                    className="btn btn-primary w-full text-lg py-4"
                    disabled={!isValid}
                >
                    Calculate Growth
                </button>
            </div>

            {/* Results Section */}
            {result && (
                <div className="space-y-4 animate-fade-in">
                    <div className="h-px bg-[var(--border)]" />

                    {/* Main Result */}
                    <div className="text-center py-6 bg-gradient-to-r from-[var(--success-50)] to-[var(--primary-50)] dark:from-[var(--success-900)]/20 dark:to-[var(--primary-900)]/20 rounded-xl">
                        <p className="text-sm text-[var(--foreground-secondary)] mb-2">
                            Future Value
                        </p>
                        <p className="text-4xl md:text-5xl font-bold text-[var(--success-600)] dark:text-[var(--success-400)]">
                            {formatCurrency(result.futureValue)}
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="card p-4 text-center">
                            <p className="text-xl font-bold text-[var(--primary-500)]">
                                {formatCurrency(result.totalDeposits)}
                            </p>
                            <p className="text-sm text-[var(--foreground-secondary)]">
                                Total Deposits
                            </p>
                        </div>
                        <div className="card p-4 text-center">
                            <p className="text-xl font-bold text-[var(--success-500)]">
                                {formatCurrency(result.totalInterest)}
                            </p>
                            <p className="text-sm text-[var(--foreground-secondary)]">
                                Total Interest
                            </p>
                        </div>
                    </div>

                    {/* Growth Chart */}
                    <div className="card p-4">
                        <h4 className="font-semibold mb-3">Investment Growth</h4>
                        <div className="flex h-8 rounded-full overflow-hidden">
                            <div
                                className="bg-[var(--primary-500)] flex items-center justify-center text-white text-xs font-medium"
                                style={{ width: `${(result.totalDeposits / result.futureValue) * 100}%` }}
                            >
                                Deposits
                            </div>
                            <div
                                className="bg-[var(--success-500)] flex items-center justify-center text-white text-xs font-medium"
                                style={{ width: `${(result.totalInterest / result.futureValue) * 100}%` }}
                            >
                                Interest
                            </div>
                        </div>
                        <div className="flex justify-between text-sm mt-2 text-[var(--foreground-secondary)]">
                            <span>{((result.totalDeposits / result.futureValue) * 100).toFixed(0)}% Deposits</span>
                            <span>{((result.totalInterest / result.futureValue) * 100).toFixed(0)}% Interest</span>
                        </div>
                    </div>

                    {/* Yearly Breakdown */}
                    <div className="card p-4">
                        <h4 className="font-semibold mb-3">Year by Year</h4>
                        <div className="space-y-2">
                            {result.yearlyBreakdown.map((row) => (
                                <div key={row.year} className="flex items-center gap-2">
                                    <span className="w-16 text-sm font-medium">Year {row.year}</span>
                                    <div className="flex-1 h-6 bg-[var(--gray-100)] dark:bg-[var(--gray-800)] rounded-full overflow-hidden relative">
                                        <div
                                            className="absolute h-full bg-[var(--primary-300)]"
                                            style={{ width: `${(row.deposits / result.futureValue) * 100}%` }}
                                        />
                                        <div
                                            className="absolute h-full bg-[var(--success-400)]"
                                            style={{
                                                width: `${(row.balance / result.futureValue) * 100}%`,
                                                opacity: 0.5
                                            }}
                                        />
                                    </div>
                                    <span className="w-24 text-sm text-right font-medium">
                                        {formatCurrency(row.balance)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
