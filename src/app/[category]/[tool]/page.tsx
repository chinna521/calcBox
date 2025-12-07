import { notFound } from "next/navigation";
import { categories, tools, getCategoryBySlug, getToolBySlug, getToolsByCategory } from "@/data/tools";
import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "@/components/ads/AdBanner";

// Import calculators
import DueDateCalculator from "@/components/calculators/DueDateCalculator";
import BMICalculator from "@/components/calculators/BMICalculator";
import AgeCalculator from "@/components/calculators/AgeCalculator";
import LoanCalculator from "@/components/calculators/LoanCalculator";
import TipCalculator from "@/components/calculators/TipCalculator";
import PercentageCalculator from "@/components/calculators/PercentageCalculator";
import CompoundInterestCalculator from "@/components/calculators/CompoundInterestCalculator";
import DaysBetweenDatesCalculator from "@/components/calculators/DaysBetweenDatesCalculator";
import CalorieCalculator from "@/components/calculators/CalorieCalculator";
import OvulationCalculator from "@/components/calculators/OvulationCalculator";
import LengthConverter from "@/components/calculators/LengthConverter";
import WeightConverter from "@/components/calculators/WeightConverter";
import PregnancyWeekCalculator from "@/components/calculators/PregnancyWeekCalculator";
import TemperatureConverter from "@/components/calculators/TemperatureConverter";
import SpeedConverter from "@/components/calculators/SpeedConverter";
import DiscountCalculator from "@/components/calculators/DiscountCalculator";
import BodyFatCalculator from "@/components/calculators/BodyFatCalculator";

interface ToolPageProps {
    params: Promise<{
        category: string;
        tool: string;
    }>;
}

// Map tool slugs to components
const calculatorComponents: { [key: string]: React.ComponentType } = {
    "due-date-calculator": DueDateCalculator,
    "bmi-calculator": BMICalculator,
    "age-calculator": AgeCalculator,
    "loan-calculator": LoanCalculator,
    "tip-calculator": TipCalculator,
    "percentage-calculator": PercentageCalculator,
    "compound-interest-calculator": CompoundInterestCalculator,
    "days-between-dates": DaysBetweenDatesCalculator,
    "calorie-calculator": CalorieCalculator,
    "ovulation-calculator": OvulationCalculator,
    "length-converter": LengthConverter,
    "weight-converter": WeightConverter,
    "pregnancy-week-calculator": PregnancyWeekCalculator,
    "temperature-converter": TemperatureConverter,
    "speed-converter": SpeedConverter,
    "discount-calculator": DiscountCalculator,
    "body-fat-calculator": BodyFatCalculator,
};

export async function generateStaticParams() {
    return tools.map((tool) => ({
        category: tool.categoryId,
        tool: tool.slug,
    }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
    const { tool: toolSlug } = await params;
    const tool = getToolBySlug(toolSlug);

    if (!tool) {
        return { title: "Tool Not Found - CalcBox" };
    }

    return {
        title: tool.metaTitle || `${tool.name} - Free Online Calculator | CalcBox`,
        description: tool.metaDescription || tool.shortDescription,
    };
}

import { toolDetails } from "@/data/tool-details";

// ... (imports remain the same)

export default async function ToolPage({ params }: ToolPageProps) {
    const { category: categorySlug, tool: toolSlug } = await params;

    const category = getCategoryBySlug(categorySlug);
    const tool = getToolBySlug(toolSlug);

    if (!category || !tool || tool.categoryId !== category.id) {
        notFound();
    }

    const CalculatorComponent = calculatorComponents[tool.slug];
    const relatedTools = getToolsByCategory(category.id).filter((t) => t.id !== tool.id).slice(0, 3);
    const details = toolDetails[tool.slug];

    return (
        <div className="animate-fade-in">
            <div className="container py-8">
                {/* Breadcrumb */}
                <nav className="mb-6 text-sm">
                    <Link href="/" className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)]">
                        Home
                    </Link>
                    <span className="mx-2 text-[var(--gray-400)]">/</span>
                    <Link href={`/${category.slug}`} className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)]">
                        {category.name}
                    </Link>
                    <span className="mx-2 text-[var(--gray-400)]">/</span>
                    <span className="text-[var(--foreground)]">{tool.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Tool Header */}
                        <div className="mb-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                                    style={{ backgroundColor: `${category.color}20` }}
                                >
                                    {tool.icon}
                                </div>
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold">{tool.h1Title || tool.name}</h1>
                                    <p className="text-[var(--foreground-secondary)]">{tool.shortDescription}</p>
                                </div>
                            </div>
                        </div>

                        {/* Calculator Card */}
                        <div className="card p-6 md:p-8 mb-8">
                            {CalculatorComponent ? (
                                <CalculatorComponent />
                            ) : (
                                <div className="text-center py-12 text-[var(--foreground-secondary)]">
                                    <p className="text-4xl mb-4">🚧</p>
                                    <p>This calculator is coming soon!</p>
                                </div>
                            )}
                        </div>

                        {/* Ad Banner */}
                        <div className="mb-8">
                            <AdBanner slot="tool-content-middle" />
                        </div>

                        {/* How to Use */}
                        {details?.howToUse && (
                            <div className="card p-6 mb-8">
                                <h2 className="text-xl font-bold mb-4">How to Use This Calculator</h2>
                                <div className="prose prose-sm text-[var(--foreground-secondary)]">
                                    <ol className="list-decimal list-inside space-y-2">
                                        {details.howToUse.map((step, index) => (
                                            <li key={index}>{step}</li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        )}

                        {/* FAQ */}
                        {details?.faqs && (
                            <div className="card p-6">
                                <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
                                <div className="space-y-6">
                                    {details.faqs.map((faq, index) => (
                                        <div key={index}>
                                            <h3 className="font-semibold mb-2">{faq.question}</h3>
                                            <p className="text-sm text-[var(--foreground-secondary)] leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Ad Sidebar */}
                        <div className="bg-[var(--gray-100)] dark:bg-[var(--gray-800)] rounded-lg h-64 flex items-center justify-center text-[var(--gray-400)] mb-6">
                            <span className="text-sm">Advertisement</span>
                        </div>

                        {/* Related Tools */}
                        {relatedTools.length > 0 && (
                            <div className="card p-4">
                                <h3 className="font-semibold mb-4">Related Calculators</h3>
                                <div className="space-y-3">
                                    {relatedTools.map((relatedTool) => (
                                        <Link
                                            key={relatedTool.id}
                                            href={`/${relatedTool.categoryId}/${relatedTool.slug}`}
                                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--gray-50)] dark:hover:bg-[var(--gray-800)] transition-colors"
                                        >
                                            <span className="text-xl">{relatedTool.icon}</span>
                                            <div>
                                                <p className="font-medium text-sm">{relatedTool.name}</p>
                                                <p className="text-xs text-[var(--foreground-secondary)] line-clamp-1">
                                                    {relatedTool.shortDescription}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
