"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
    slot: string;
    format?: "auto" | "fluid" | "rectangle";
    responsive?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export default function AdBanner({
    slot,
    format = "auto",
    responsive = true,
    className = "",
    style = {},
}: AdBannerProps) {
    const adRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error("AdSense error:", err);
        }
    }, []);

    // Development placeholder
    if (process.env.NODE_ENV === "development") {
        return (
            <div
                className={`bg-[var(--gray-100)] dark:bg-[var(--gray-800)] border border-[var(--border)] border-dashed rounded-lg flex items-center justify-center text-[var(--gray-400)] text-sm p-4 ${className}`}
                style={{ minHeight: "100px", ...style }}
            >
                <span>AdSense Placeholder (Slot: {slot})</span>
            </div>
        );
    }

    return (
        <div className={`ad-container ${className}`} style={style}>
            <ins
                className="adsbygoogle"
                style={{ display: "block", ...style }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with actual Publisher ID
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive ? "true" : "false"}
                ref={adRef}
            />
        </div>
    );
}
