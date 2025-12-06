"use client";

import { useState } from "react";

type CalculationType = "whatIs" | "isWhatPercent" | "percentChange";

export default function PercentageCalculator() {
    const [calcType, setCalcType] = useState<CalculationType>("whatIs");

    // What is X% of Y?
    const [percent1, setPercent1] = useState("");
    const [value1, setValue1] = useState("");

    // X is what % of Y?
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");

    // % change from X to Y
    const [oldValue, setOldValue] = useState("");
    const [newValue, setNewValue] = useState("");

    const [result, setResult] = useState<string | null>(null);

    const calculate = () => {
        let res: number;

        switch (calcType) {
            case "whatIs":
                const p = parseFloat(percent1);
                const v = parseFloat(value1);
                if (isNaN(p) || isNaN(v)) return;
                res = (p / 100) * v;
                setResult(`${p}% of ${v} = ${res.toLocaleString(undefined, { maximumFractionDigits: 4 })}`);
                break;

            case "isWhatPercent":
                const x = parseFloat(value2);
                const y = parseFloat(value3);
                if (isNaN(x) || isNaN(y) || y === 0) return;
                res = (x / y) * 100;
                setResult(`${x} is ${res.toLocaleString(undefined, { maximumFractionDigits: 2 })}% of ${y}`);
                break;

            case "percentChange":
                const old = parseFloat(oldValue);
                const newV = parseFloat(newValue);
                if (isNaN(old) || isNaN(newV) || old === 0) return;
                res = ((newV - old) / Math.abs(old)) * 100;
                const direction = res >= 0 ? "increase" : "decrease";
                setResult(`${Math.abs(res).toLocaleString(undefined, { maximumFractionDigits: 2 })}% ${direction} from ${old} to ${newV}`);
                break;
        }
    };

    return (
        <div className="space-y-6">
            {/* Calculator Type Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                    onClick={() => { setCalcType("whatIs"); setResult(null); }}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${calcType === "whatIs"
                            ? "bg-[var(--primary-500)] text-white shadow-md"
                            : "bg-[var(--gray-100)] dark:bg-[var(--gray-800)] hover:bg-[var(--gray-200)]"
                        }`}
                >
                    What is X% of Y?
                </button>
                <button
                    onClick={() => { setCalcType("isWhatPercent"); setResult(null); }}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${calcType === "isWhatPercent"
                            ? "bg-[var(--primary-500)] text-white shadow-md"
                            : "bg-[var(--gray-100)] dark:bg-[var(--gray-800)] hover:bg-[var(--gray-200)]"
                        }`}
                >
                    X is what % of Y?
                </button>
                <button
                    onClick={() => { setCalcType("percentChange"); setResult(null); }}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${calcType === "percentChange"
                            ? "bg-[var(--primary-500)] text-white shadow-md"
                            : "bg-[var(--gray-100)] dark:bg-[var(--gray-800)] hover:bg-[var(--gray-200)]"
                        }`}
                >
                    % Change
                </button>
            </div>

            {/* Input Section - What is X% of Y? */}
            {calcType === "whatIs" && (
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="text-lg font-medium">What is</span>
                        <input
                            type="number"
                            value={percent1}
                            onChange={(e) => setPercent1(e.target.value)}
                            placeholder="X"
                            className="input w-24 text-center text-lg font-semibold"
                        />
                        <span className="text-lg font-medium">% of</span>
                        <input
                            type="number"
                            value={value1}
                            onChange={(e) => setValue1(e.target.value)}
                            placeholder="Y"
                            className="input flex-1 text-center text-lg font-semibold"
                        />
                        <span className="text-lg font-medium">?</span>
                    </div>
                    <button
                        onClick={calculate}
                        className="btn btn-primary w-full text-lg py-4"
                        disabled={!percent1 || !value1}
                    >
                        Calculate
                    </button>
                </div>
            )}

            {/* Input Section - X is what % of Y? */}
            {calcType === "isWhatPercent" && (
                <div className="space-y-4">
                    <div className="flex items-center gap-3 flex-wrap">
                        <input
                            type="number"
                            value={value2}
                            onChange={(e) => setValue2(e.target.value)}
                            placeholder="X"
                            className="input w-28 text-center text-lg font-semibold"
                        />
                        <span className="text-lg font-medium">is what % of</span>
                        <input
                            type="number"
                            value={value3}
                            onChange={(e) => setValue3(e.target.value)}
                            placeholder="Y"
                            className="input w-28 text-center text-lg font-semibold"
                        />
                        <span className="text-lg font-medium">?</span>
                    </div>
                    <button
                        onClick={calculate}
                        className="btn btn-primary w-full text-lg py-4"
                        disabled={!value2 || !value3}
                    >
                        Calculate
                    </button>
                </div>
            )}

            {/* Input Section - Percent Change */}
            {calcType === "percentChange" && (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Original Value</label>
                        <input
                            type="number"
                            value={oldValue}
                            onChange={(e) => setOldValue(e.target.value)}
                            placeholder="e.g., 100"
                            className="input text-lg font-semibold"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">New Value</label>
                        <input
                            type="number"
                            value={newValue}
                            onChange={(e) => setNewValue(e.target.value)}
                            placeholder="e.g., 125"
                            className="input text-lg font-semibold"
                        />
                    </div>
                    <button
                        onClick={calculate}
                        className="btn btn-primary w-full text-lg py-4"
                        disabled={!oldValue || !newValue}
                    >
                        Calculate Change
                    </button>
                </div>
            )}

            {/* Result */}
            {result && (
                <div className="animate-fade-in">
                    <div className="h-px bg-[var(--border)] mb-4" />
                    <div className="text-center py-6 bg-gradient-to-r from-[var(--primary-50)] to-[var(--success-50)] dark:from-[var(--primary-900)]/20 dark:to-[var(--success-900)]/20 rounded-xl">
                        <p className="text-sm text-[var(--foreground-secondary)] mb-2">Result</p>
                        <p className="text-2xl md:text-3xl font-bold text-[var(--primary-600)] dark:text-[var(--primary-400)]">
                            {result}
                        </p>
                    </div>
                </div>
            )}

            {/* Common Percentages Reference */}
            <div className="card p-4">
                <h4 className="font-semibold mb-3">Common Percentages</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    <div className="p-2 bg-[var(--gray-50)] dark:bg-[var(--gray-800)] rounded text-center">
                        <span className="font-semibold">10%</span> = 1/10
                    </div>
                    <div className="p-2 bg-[var(--gray-50)] dark:bg-[var(--gray-800)] rounded text-center">
                        <span className="font-semibold">25%</span> = 1/4
                    </div>
                    <div className="p-2 bg-[var(--gray-50)] dark:bg-[var(--gray-800)] rounded text-center">
                        <span className="font-semibold">33.3%</span> = 1/3
                    </div>
                    <div className="p-2 bg-[var(--gray-50)] dark:bg-[var(--gray-800)] rounded text-center">
                        <span className="font-semibold">50%</span> = 1/2
                    </div>
                    <div className="p-2 bg-[var(--gray-50)] dark:bg-[var(--gray-800)] rounded text-center">
                        <span className="font-semibold">66.7%</span> = 2/3
                    </div>
                    <div className="p-2 bg-[var(--gray-50)] dark:bg-[var(--gray-800)] rounded text-center">
                        <span className="font-semibold">75%</span> = 3/4
                    </div>
                    <div className="p-2 bg-[var(--gray-50)] dark:bg-[var(--gray-800)] rounded text-center">
                        <span className="font-semibold">80%</span> = 4/5
                    </div>
                    <div className="p-2 bg-[var(--gray-50)] dark:bg-[var(--gray-800)] rounded text-center">
                        <span className="font-semibold">100%</span> = 1
                    </div>
                </div>
            </div>
        </div>
    );
}
