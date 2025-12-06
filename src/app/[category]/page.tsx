import { notFound } from "next/navigation";
import { categories, getToolsByCategory, getCategoryBySlug } from "@/data/tools";
import ToolCard from "@/components/common/ToolCard";
import AdBanner from "@/components/ads/AdBanner";
import type { Metadata } from "next";

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

export async function generateStaticParams() {
    return categories.map((category) => ({
        category: category.slug,
    }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { category: categorySlug } = await params;
    const category = getCategoryBySlug(categorySlug);

    if (!category) {
        return {
            title: "Category Not Found - CalcBox",
        };
    }

    return {
        title: `${category.name} Calculators - CalcBox`,
        description: category.description,
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category: categorySlug } = await params;
    const category = getCategoryBySlug(categorySlug);

    if (!category) {
        notFound();
    }

    const tools = getToolsByCategory(category.id);

    return (
        <div className="animate-fade-in">
            {/* Hero */}
            <section
                className="py-12 md:py-16"
                style={{
                    background: `linear-gradient(to bottom, ${category.color}10, var(--background))`
                }}
            >
                <div className="container">
                    {/* Breadcrumb */}
                    <nav className="mb-6 text-sm">
                        <a href="/" className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)]">
                            Home
                        </a>
                        <span className="mx-2 text-[var(--gray-400)]">/</span>
                        <span className="text-[var(--foreground)]">{category.name}</span>
                    </nav>

                    <div className="flex items-center gap-4 mb-4">
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                            style={{ backgroundColor: `${category.color}20` }}
                        >
                            {category.icon}
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold">{category.name}</h1>
                            <p className="text-[var(--foreground-secondary)]">{tools.length} calculators available</p>
                        </div>
                    </div>
                    <p className="text-lg text-[var(--foreground-secondary)] max-w-2xl">
                        {category.description}
                    </p>
                </div>
            </section>

            {/* Tools Grid */}
            <section className="py-12">
                <div className="container">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {tools.map((tool) => (
                            <ToolCard key={tool.id} tool={tool} />
                        ))}
                    </div>

                    {tools.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-[var(--foreground-secondary)]">
                                No calculators in this category yet. Check back soon!
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Ad Banner */}
            <section className="py-4">
                <div className="container">
                    <AdBanner slot="category-bottom" />
                </div>
            </section>
        </div>
    );
}
