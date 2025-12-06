import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | CalcBox",
    description: "Get in touch with the CalcBox team. We'd love to hear your feedback and suggestions.",
};

export default function ContactPage() {
    return (
        <div className="container py-12 animate-fade-in">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
                    <p className="text-lg text-[var(--foreground-secondary)]">
                        Have a suggestion, found a bug, or just want to say hi? We'd love to hear from you.
                    </p>
                </div>

                <div className="card p-8">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="input w-full"
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="input w-full"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                Subject
                            </label>
                            <select id="subject" className="input w-full">
                                <option>General Inquiry</option>
                                <option>Report a Bug</option>
                                <option>Suggest a Calculator</option>
                                <option>Advertising</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows={5}
                                className="input w-full resize-none"
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>

                        <button type="button" className="btn btn-primary w-full">
                            Send Message
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-[var(--border)] text-center text-[var(--foreground-secondary)] text-sm">
                        <p>Alternatively, you can email us directly at:</p>
                        <a
                            href="mailto:support@calcbox.com"
                            className="text-[var(--primary-600)] hover:underline font-medium"
                        >
                            support@calcbox.com
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
