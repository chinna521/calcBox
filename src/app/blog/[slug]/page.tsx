import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts, getBlogPostBySlug, getRecentPosts } from "@/data/blog-posts";
import AdBanner from "@/components/ads/AdBanner";

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        return { title: "Post Not Found - CalcBox" };
    }

    return {
        title: `${post.title} | CalcBox Blog`,
        description: post.excerpt,
        keywords: post.tags.join(", "),
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = getRecentPosts(3).filter((p) => p.id !== post.id);

    return (
        <div className="animate-fade-in">
            <div className="container py-8">
                {/* Breadcrumb */}
                <nav className="mb-6 text-sm">
                    <Link href="/" className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)]">
                        Home
                    </Link>
                    <span className="mx-2 text-[var(--gray-400)]">/</span>
                    <Link href="/blog" className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)]">
                        Blog
                    </Link>
                    <span className="mx-2 text-[var(--gray-400)]">/</span>
                    <span className="text-[var(--foreground)]">{post.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <article className="lg:col-span-2">
                        {/* Header */}
                        <header className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-[var(--primary-100)] dark:bg-[var(--primary-900)]/30 text-[var(--primary-600)] text-sm font-medium rounded">
                                    {post.category}
                                </span>
                                <span className="text-sm text-[var(--foreground-secondary)]">
                                    {post.readingTime} min read
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
                            <p className="text-lg text-[var(--foreground-secondary)] mb-4">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-[var(--foreground-secondary)]">
                                <span>By {post.author}</span>
                                <span>•</span>
                                <time dateTime={post.publishedAt}>
                                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </time>
                            </div>
                        </header>

                        {/* Content */}
                        <div className="card p-6 md:p-8 mb-8">
                            <div
                                className="prose prose-lg max-w-none
                  prose-headings:text-[var(--foreground)] prose-headings:font-semibold
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-[var(--foreground-secondary)] prose-p:leading-relaxed
                  prose-strong:text-[var(--foreground)]
                  prose-ul:text-[var(--foreground-secondary)]
                  prose-ol:text-[var(--foreground-secondary)]
                  prose-li:my-1
                  prose-table:text-[var(--foreground-secondary)]
                  prose-th:bg-[var(--gray-100)] dark:prose-th:bg-[var(--gray-800)]
                  prose-th:p-3 prose-td:p-3 prose-td:border-b prose-td:border-[var(--border)]
                "
                                dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
                            />
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-[var(--gray-100)] dark:bg-[var(--gray-800)] text-sm rounded-full"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        {/* Share */}
                        <div className="card p-6 mb-8">
                            <h3 className="font-semibold mb-3">Share this article</h3>
                            <div className="flex gap-3">
                                <button className="px-4 py-2 bg-[#1DA1F2] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                                    Twitter
                                </button>
                                <button className="px-4 py-2 bg-[#0A66C2] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                                    LinkedIn
                                </button>
                                <button className="px-4 py-2 bg-[#25D366] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                                    WhatsApp
                                </button>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        {/* Ad Placeholder */}
                        <div className="mb-6">
                            <AdBanner slot="blog-sidebar" format="rectangle" style={{ height: "250px" }} />
                        </div>

                        {/* Related Posts */}
                        {relatedPosts.length > 0 && (
                            <div className="card p-4 mb-6">
                                <h3 className="font-semibold mb-4">Related Articles</h3>
                                <div className="space-y-4">
                                    {relatedPosts.map((relatedPost) => (
                                        <Link
                                            key={relatedPost.id}
                                            href={`/blog/${relatedPost.slug}`}
                                            className="block group"
                                        >
                                            <p className="font-medium text-sm group-hover:text-[var(--primary-500)] transition-colors line-clamp-2">
                                                {relatedPost.title}
                                            </p>
                                            <p className="text-xs text-[var(--foreground-secondary)] mt-1">
                                                {relatedPost.readingTime} min read
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* CTA */}
                        <div className="card p-4 bg-gradient-to-br from-[var(--primary-50)] to-[var(--secondary-50)] dark:from-[var(--primary-900)]/20 dark:to-[var(--secondary-900)]/20">
                            <h3 className="font-semibold mb-2">Try Our Calculators</h3>
                            <p className="text-sm text-[var(--foreground-secondary)] mb-3">
                                Use our free online calculators to make quick calculations.
                            </p>
                            <Link href="/" className="btn btn-primary text-sm w-full">
                                Browse Calculators
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

function formatContent(content: string): string {
    // 1. Split into blocks by double newlines
    const blocks = content.split(/\n\n+/);

    const htmlBlocks = blocks.map((block) => {
        const trimmed = block.trim();
        if (!trimmed) return "";

        // Headers
        if (trimmed.startsWith("#")) {
            const level = trimmed.match(/^#+/)?.[0].length || 1;
            const text = trimmed.replace(/^#+\s*/, "");
            return `<h${level}>${parseInline(text)}</h${level}>`;
        }

        // Lists (Unordered)
        if (trimmed.match(/^-\s/m)) {
            const items = trimmed.split("\n").filter(line => line.trim().startsWith("-"));
            const listItems = items.map(item => `<li>${parseInline(item.replace(/^-\s*/, ""))}</li>`).join("");
            return `<ul>${listItems}</ul>`;
        }

        // Lists (Ordered)
        if (trimmed.match(/^\d+\.\s/m)) {
            const items = trimmed.split("\n").filter(line => line.trim().match(/^\d+\./));
            const listItems = items.map(item => `<li>${parseInline(item.replace(/^\d+\.\s*/, ""))}</li>`).join("");
            return `<ol>${listItems}</ol>`;
        }

        // Tables
        if (trimmed.includes("|") && trimmed.includes("---")) {
            const rows = trimmed.split("\n").filter(row => row.trim());
            const headerRow = rows[0];
            const bodyRows = rows.slice(2); // Skip separator row

            const parseRow = (row: string, isHeader: boolean) => {
                const cells = row.split("|").filter(c => c.trim() !== ""); // Basic split, assumes no escaped pipes
                const tag = isHeader ? "th" : "td";
                return `<tr>${cells.map(c => `<${tag}>${parseInline(c.trim())}</${tag}>`).join("")}</tr>`;
            };

            return `
                <div class="overflow-x-auto my-6">
                    <table class="w-full border-collapse text-sm">
                        <thead>${parseRow(headerRow, true)}</thead>
                        <tbody>${bodyRows.map(row => parseRow(row, false)).join("")}</tbody>
                    </table>
                </div>
            `;
        }

        // Paragraphs
        return `<p>${parseInline(trimmed.replace(/\n/g, "<br>"))}</p>`;
    });

    return htmlBlocks.join("");
}

function parseInline(text: string): string {
    return text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/`([^`]+)`/g, "<code class='bg-[var(--gray-100)] dark:bg-[var(--gray-800)] px-1 rounded'>$1</code>")
        .replace(/\[(.*?)\]\((.*?)\)/g, "<a href='$2' class='text-[var(--primary-600)] hover:underline'>$1</a>");
}
