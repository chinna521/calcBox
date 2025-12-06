import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | CalcBox",
    description: "Learn more about CalcBox, our mission, and the team behind the free online calculators.",
};

export default function AboutPage() {
    return (
        <div className="container py-12 animate-fade-in">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">About CalcBox</h1>
                    <p className="text-lg text-[var(--foreground-secondary)]">
                        Making complex calculations simple, fast, and free for everyone.
                    </p>
                </div>

                <div className="space-y-12">
                    <section className="card p-8">
                        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                        <p className="text-[var(--foreground-secondary)] leading-relaxed mb-4">
                            At CalcBox, we believe that everyone should have access to accurate and easy-to-use tools for their daily calculation needs. Whether you're planning a family, managing your finances, or just trying to convert units for a recipe, we're here to help.
                        </p>
                        <p className="text-[var(--foreground-secondary)] leading-relaxed">
                            Our mission is to build the most comprehensive collection of free online calculators on the web, designed with a focus on user experience, accuracy, and privacy.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section className="card p-8">
                            <h2 className="text-xl font-bold mb-4">Why Choose Us?</h2>
                            <ul className="space-y-3 text-[var(--foreground-secondary)]">
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--primary-500)]">✓</span>
                                    <span>100% Free to use, forever.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--primary-500)]">✓</span>
                                    <span>No registration required.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--primary-500)]">✓</span>
                                    <span>Privacy-focused: We don't store your input data.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[var(--primary-500)]">✓</span>
                                    <span>Mobile-friendly design for on-the-go use.</span>
                                </li>
                            </ul>
                        </section>

                        <section className="card p-8">
                            <h2 className="text-xl font-bold mb-4">Our Story</h2>
                            <p className="text-[var(--foreground-secondary)] leading-relaxed">
                                CalcBox started as a small project to help friends calculate loan payments. Realizing the need for a clean, ad-light, and modern calculator website, we expanded to cover health, fitness, and everyday utilities. Today, we serve thousands of users helping them make informed decisions.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
