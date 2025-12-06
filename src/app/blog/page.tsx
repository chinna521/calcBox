import Link from "next/link";
import type { Metadata } from "next";
import { getRecentPosts, getFeaturedPosts, blogPosts } from "@/data/blog-posts";
import AdBanner from "@/components/ads/AdBanner";

export const metadata: Metadata = {
    title: "Blog - Calculator Tips & Guides | CalcBox",
    description: "Learn how to use calculators effectively with our guides, tips, and educational articles on pregnancy, health, finance, and more.",
};

export default function BlogPage() {
    const featuredPosts = getFeaturedPosts();
    const recentPosts = getRecentPosts(6);

    return (
        <div className="animate-fade-in">
            <div className="container py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        CalcBox <span className="gradient-text">Blog</span>
                    </h1>
                    <p className="text-lg text-[var(--foreground-secondary)] max-w-2xl mx-auto">
                        Tips, guides, and insights to help you make the most of our calculators and improve your understanding of health, finance, and more.
                    </p>
                </div>

                {/* Featured Posts */}
                {featuredPosts.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {featuredPosts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="card p-6 hover:shadow-lg transition-all group"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-2 py-1 bg-[var(--primary-100)] dark:bg-[var(--primary-900)]/30 text-[var(--primary-600)] text-xs font-medium rounded">
                                            {post.category}
                                        </span>
                                        <span className="text-xs text-[var(--foreground-secondary)]">
                                            {post.readingTime} min read
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2 group-hover:text-[var(--primary-500)] transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-[var(--foreground-secondary)] line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-4 text-sm text-[var(--foreground-secondary)]">
                                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Ad Banner */}
                <section className="mb-12">
                    <AdBanner slot="blog-list-middle" />
                </section>

                {/* All Posts */}
                <section>
                    <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
                    <div className="space-y-6">
                        {recentPosts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="card p-6 flex flex-col md:flex-row gap-6 hover:shadow-lg transition-all group"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-2 py-1 bg-[var(--primary-100)] dark:bg-[var(--primary-900)]/30 text-[var(--primary-600)] text-xs font-medium rounded">
                                            {post.category}
                                        </span>
                                        <span className="text-xs text-[var(--foreground-secondary)]">
                                            {post.readingTime} min read
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-xl mb-2 group-hover:text-[var(--primary-500)] transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-[var(--foreground-secondary)] mb-4">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-[var(--foreground-secondary)]">
                                        <span>{post.author}</span>
                                        <span>•</span>
                                        <span>
                                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 md:self-center">
                                    {post.tags.slice(0, 3).map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 bg-[var(--gray-100)] dark:bg-[var(--gray-800)] text-xs rounded"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <div className="card p-8 bg-gradient-to-r from-[var(--primary-50)] to-[var(--secondary-50)] dark:from-[var(--primary-900)]/20 dark:to-[var(--secondary-900)]/20">
                        <h2 className="text-2xl font-bold mb-2">Need to Make a Calculation?</h2>
                        <p className="text-[var(--foreground-secondary)] mb-4">
                            Explore our free online calculators for health, finance, and more.
                        </p>
                        <Link href="/" className="btn btn-primary">
                            Browse All Calculators
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
