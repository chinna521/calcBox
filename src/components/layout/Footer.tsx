import Link from "next/link";
import { categories } from "@/data/tools";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-[var(--border)] bg-[var(--background-secondary)] mt-16">
            <div className="container py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <span className="text-2xl">🧮</span>
                            <span className="text-xl font-bold gradient-text">CalcBox</span>
                        </Link>
                        <p className="text-[var(--foreground-secondary)] text-sm">
                            Free online calculators and tools for everyday use. Fast, accurate, and easy to use.
                        </p>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="font-semibold mb-4">Categories</h3>
                        <ul className="space-y-2">
                            {categories.slice(0, 5).map((category) => (
                                <li key={category.id}>
                                    <Link
                                        href={`/${category.slug}`}
                                        className="text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                                    >
                                        {category.icon} {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/disclaimer"
                                    className="text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors"
                                >
                                    Disclaimer
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-[var(--border)] text-center">
                    <p className="text-sm text-[var(--foreground-secondary)]">
                        © {currentYear} CalcBox. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
