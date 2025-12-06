import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | CalcBox",
    description: "Privacy Policy for CalcBox. Learn how we collect, use, and protect your data.",
};

export default function PrivacyPolicy() {
    return (
        <div className="container py-12 animate-fade-in">
            <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h1>Privacy Policy</h1>
                <p className="text-[var(--foreground-secondary)]">Last updated: {new Date().toLocaleDateString()}</p>

                <h2>1. Introduction</h2>
                <p>
                    Welcome to CalcBox ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
                </p>

                <h2>2. Information We Collect</h2>
                <p>
                    We may collect information about you in a variety of ways. The information we may collect on the Site includes:
                </p>
                <ul>
                    <li>
                        <strong>Usage Data:</strong> We may automatically collect information about your activity on the Site, such as your IP address, browser type, operating system, referring URLs, access times, and pages viewed.
                    </li>
                    <li>
                        <strong>Cookies and Tracking Technologies:</strong> We use cookies, web beacons, and tracking pixels to access our Site. Specifically, we use Google Analytics to analyze traffic and Google AdSense to serve advertisements.
                    </li>
                </ul>

                <h2>3. Use of Your Information</h2>
                <p>
                    Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. We may use information collected about you via the Site to:
                </p>
                <ul>
                    <li>Compile anonymous statistical data and analysis for use internally or with third parties.</li>
                    <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
                    <li>Deliver targeted advertising, coupons, newsletters, and other information regarding promotions and the Site to you.</li>
                </ul>

                <h2>4. Third-Party Services</h2>
                <h3>Google Analytics</h3>
                <p>
                    We use Google Analytics to help us understand how our customers use the Site. You can read more about how Google uses your Personal Information here: <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noopener noreferrer">https://www.google.com/intl/en/policies/privacy/</a>. You can also opt-out of Google Analytics here: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout</a>.
                </p>

                <h3>Google AdSense</h3>
                <p>
                    We use Google AdSense to display ads on our website. Google uses cookies to serve ads based on your prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our sites and/or other sites on the Internet. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Ads Settings</a>.
                </p>

                <h2>5. Security of Your Information</h2>
                <p>
                    We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                </p>

                <h2>6. Contact Us</h2>
                <p>
                    If you have questions or comments about this Privacy Policy, please contact us at: support@calcbox.com
                </p>
            </div>
        </div>
    );
}
