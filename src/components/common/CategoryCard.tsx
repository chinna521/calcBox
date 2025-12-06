import Link from "next/link";
import { Category } from "@/data/tools";

interface CategoryCardProps {
    category: Category;
    toolCount: number;
}

export default function CategoryCard({ category, toolCount }: CategoryCardProps) {
    return (
        <Link
            href={`/${category.slug}`}
            className="group block"
        >
            <div
                className="card p-6 h-full"
                style={{ "--category-color": category.color } as React.CSSProperties}
            >
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                    style={{ backgroundColor: `${category.color}20` }}
                >
                    {category.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--primary-500)] transition-colors">
                    {category.name}
                </h3>
                <p className="text-sm text-[var(--foreground-secondary)] mb-3">
                    {category.description}
                </p>
                <span
                    className="text-xs font-medium px-2 py-1 rounded-full"
                    style={{
                        backgroundColor: `${category.color}20`,
                        color: category.color,
                    }}
                >
                    {toolCount} tools
                </span>
            </div>
        </Link>
    );
}
