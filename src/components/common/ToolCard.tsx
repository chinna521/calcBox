import Link from "next/link";
import { Tool, getCategoryBySlug } from "@/data/tools";

interface ToolCardProps {
    tool: Tool;
    showCategory?: boolean;
}

export default function ToolCard({ tool, showCategory = false }: ToolCardProps) {
    const category = getCategoryBySlug(tool.categoryId);

    return (
        <Link
            href={`/${tool.categoryId}/${tool.slug}`}
            className="group block"
        >
            <div className="card p-5 h-full flex flex-col">
                <div className="flex items-start gap-4 mb-3">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{ backgroundColor: category ? `${category.color}20` : "#f3f4f6" }}
                    >
                        {tool.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base group-hover:text-[var(--primary-500)] transition-colors truncate">
                            {tool.name}
                        </h3>
                        {showCategory && category && (
                            <span
                                className="text-xs font-medium"
                                style={{ color: category.color }}
                            >
                                {category.name}
                            </span>
                        )}
                    </div>
                </div>
                <p className="text-sm text-[var(--foreground-secondary)] flex-1">
                    {tool.shortDescription}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-[var(--primary-500)]">
                    <span>Use Calculator</span>
                    <svg
                        className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </div>
            </div>
        </Link>
    );
}
