"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[var(--background)] border-t border-[var(--border)] p-4 shadow-lg z-50 animate-fade-in">
            <div className="container max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm text-[var(--foreground-secondary)]">
                    <p>
                        We use cookies to improve your experience and analyze site traffic. By continuing to use this site, you agree to our use of cookies.
                        <Link href="/privacy" className="text-[var(--primary-600)] hover:underline ml-1">
                            Learn more
                        </Link>
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={acceptCookies}
                        className="px-4 py-2 bg-[var(--primary-600)] text-white text-sm font-medium rounded-lg hover:bg-[var(--primary-700)] transition-colors"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
}
