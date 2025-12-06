"use client";

import Link from "next/link";
import { useState } from "react";
import { categories } from "@/data/tools";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-lg">
            <div className="container">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl">🧮</span>
                        <span className="text-xl font-bold gradient-text">CalcBox</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {categories.slice(0, 4).map((category) => (
                            <Link
                                key={category.id}
                                href={`/${category.slug}`}
                                className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors text-sm font-medium"
                            >
                                <span className="mr-1">{category.icon}</span>
                                {category.name}
                            </Link>
                        ))}
                        <Link
                            href="/blog"
                            className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors text-sm font-medium"
                        >
                            Blog
                        </Link>
                    </nav>

                    {/* Search & Mobile Menu */}
                    <div className="flex items-center gap-3">
                        <button
                            className="p-2 rounded-lg hover:bg-[var(--gray-100)] transition-colors"
                            aria-label="Search"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-[var(--gray-100)] transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Menu"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                {isMenuOpen ? (
                                    <>
                                        <path d="M18 6 6 18" />
                                        <path d="m6 6 12 12" />
                                    </>
                                ) : (
                                    <>
                                        <line x1="4" x2="20" y1="12" y2="12" />
                                        <line x1="4" x2="20" y1="6" y2="6" />
                                        <line x1="4" x2="20" y1="18" y2="18" />
                                    </>
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <nav className="md:hidden py-4 border-t border-[var(--border)]">
                        <div className="flex flex-col gap-2">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/${category.slug}`}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--gray-100)] transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <span>{category.icon}</span>
                                    <span>{category.name}</span>
                                </Link>
                            ))}
                            <Link
                                href="/blog"
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--gray-100)] transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span>📝</span>
                                <span>Blog</span>
                            </Link>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}
