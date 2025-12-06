"use client";

import { useState } from "react";

export default function LoanCalculator() {
    const [loanAmount, setLoanAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [loanTerm, setLoanTerm] = useState("");
    const [termType, setTermType] = useState<"years" | "months">("years");
    const [result, setResult] = useState<{
        monthlyPayment: number;
        totalPayment: number;
        totalInterest: number;
        schedule: Array<{
            month: number;
            payment: number;
            principal: number;
            interest: number;
            balance: number;
        }>;
    } | null>(null);

    const calculate = () => {
        const principal = parseFloat(loanAmount);
        const annualRate = parseFloat(interestRate) / 100;
        const months = termType === "years" ? parseFloat(loanTerm) * 12 : parseFloat(loanTerm);

        if (!principal || !annualRate || !months || principal <= 0 || annualRate <= 0 || months <= 0) return;

        const monthlyRate = annualRate / 12;

        // Monthly payment formula: M = P * [r(1+r)^n] / [(1+r)^n – 1]
        const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        const totalPayment = monthlyPayment * months;
        const totalInterest = totalPayment - principal;

        // Calculate amortization schedule (first 12 months)
        const schedule = [];
        let balance = principal;
        for (let i = 1; i <= Math.min(months, 12); i++) {
            const interest = balance * monthlyRate;
            const principalPart = monthlyPayment - interest;
            balance -= principalPart;
            schedule.push({
                month: i,
                payment: monthlyPayment,
                principal: principalPart,
                interest: interest,
                balance: Math.max(0, balance),
            });
        }

        setResult({
            monthlyPayment,
            totalPayment,
            totalInterest,
            schedule,
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(amount);
    };

    const isValid = loanAmount && interestRate && loanTerm;

    return (
        <div className="space-y-6">
            {/* Input Section */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Loan Amount ($)
                    </label>
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        placeholder="e.g., 250000"
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
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        placeholder="e.g., 6.5"
                        className="input"
                        min="0"
                        step="0.1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Loan Term
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            value={loanTerm}
                            onChange={(e) => setLoanTerm(e.target.value)}
                            placeholder={termType === "years" ? "e.g., 30" : "e.g., 360"}
                            className="input flex-1"
                            min="0"
                        />
                        <select
                            value={termType}
                            onChange={(e) => setTermType(e.target.value as "years" | "months")}
                            className="input w-32"
                        >
                            <option value="years">Years</option>
                            <option value="months">Months</option>
                        </select>
                    </div>
                </div>

                <button
                    onClick={calculate}
                    className="btn btn-primary w-full text-lg py-4"
                    disabled={!isValid}
                >
                    Calculate Loan
                </button>
            </div>

            {/* Results Section */}
            {result && (
                <div className="space-y-4 animate-fade-in">
                    <div className="h-px bg-[var(--border)]" />

                    {/* Main Result */}
                    <div className="text-center py-6 bg-gradient-to-r from-[var(--success-50)] to-[var(--primary-50)] dark:from-[var(--success-900)]/20 dark:to-[var(--primary-900)]/20 rounded-xl">
                        <p className="text-sm text-[var(--foreground-secondary)] mb-2">
                            Monthly Payment
                        </p>
                        <p className="text-4xl md:text-5xl font-bold text-[var(--success-600)] dark:text-[var(--success-400)]">
                            {formatCurrency(result.monthlyPayment)}
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="card p-4 text-center">
                            <p className="text-xl font-bold text-[var(--primary-500)]">
                                {formatCurrency(result.totalPayment)}
                            </p>
                            <p className="text-sm text-[var(--foreground-secondary)]">
                                Total Payment
                            </p>
                        </div>
                        <div className="card p-4 text-center">
                            <p className="text-xl font-bold text-[var(--warning-500)]">
                                {formatCurrency(result.totalInterest)}
                            </p>
                            <p className="text-sm text-[var(--foreground-secondary)]">
                                Total Interest
                            </p>
                        </div>
                    </div>

                    {/* Payment Breakdown Chart */}
                    <div className="card p-4">
                        <h4 className="font-semibold mb-3">Payment Breakdown</h4>
                        <div className="flex h-8 rounded-full overflow-hidden">
                            <div
                                className="bg-[var(--success-500)] flex items-center justify-center text-white text-xs font-medium"
                                style={{ width: `${(parseFloat(loanAmount) / result.totalPayment) * 100}%` }}
                            >
                                Principal
                            </div>
                            <div
                                className="bg-[var(--warning-500)] flex items-center justify-center text-white text-xs font-medium"
                                style={{ width: `${(result.totalInterest / result.totalPayment) * 100}%` }}
                            >
                                Interest
                            </div>
                        </div>
                        <div className="flex justify-between text-sm mt-2 text-[var(--foreground-secondary)]">
                            <span>{((parseFloat(loanAmount) / result.totalPayment) * 100).toFixed(1)}% Principal</span>
                            <span>{((result.totalInterest / result.totalPayment) * 100).toFixed(1)}% Interest</span>
                        </div>
                    </div>

                    {/* Amortization Schedule */}
                    <div className="card p-4">
                        <h4 className="font-semibold mb-3">Amortization Schedule (First 12 Months)</h4>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-[var(--border)]">
                                        <th className="text-left py-2 font-medium">Month</th>
                                        <th className="text-right py-2 font-medium">Payment</th>
                                        <th className="text-right py-2 font-medium">Principal</th>
                                        <th className="text-right py-2 font-medium">Interest</th>
                                        <th className="text-right py-2 font-medium">Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {result.schedule.map((row) => (
                                        <tr key={row.month} className="border-b border-[var(--border)]/50">
                                            <td className="py-2">{row.month}</td>
                                            <td className="text-right py-2">{formatCurrency(row.payment)}</td>
                                            <td className="text-right py-2 text-[var(--success-600)]">{formatCurrency(row.principal)}</td>
                                            <td className="text-right py-2 text-[var(--warning-600)]">{formatCurrency(row.interest)}</td>
                                            <td className="text-right py-2">{formatCurrency(row.balance)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
