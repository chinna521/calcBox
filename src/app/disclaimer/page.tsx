import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Disclaimer | CalcBox",
    description: "Disclaimer for CalcBox. Important information regarding the use of our calculators and tools.",
};

export default function Disclaimer() {
    return (
        <div className="container py-12 animate-fade-in">
            <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h1>Disclaimer</h1>
                <p className="text-[var(--foreground-secondary)]">Last updated: {new Date().toLocaleDateString()}</p>

                <h2>General Disclaimer</h2>
                <p>
                    The information provided by CalcBox ("we," "us," or "our") on our website is for general informational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
                </p>

                <h2>Professional Advice Disclaimer</h2>
                <p>
                    The Site cannot and does not contain medical, financial, legal, or other professional advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of medical, financial, or legal advice.
                </p>
                <p>
                    THE USE OR RELIANCE OF ANY INFORMATION CONTAINED ON THE SITE IS SOLELY AT YOUR OWN RISK.
                </p>

                <h2>Calculators and Tools Disclaimer</h2>
                <p>
                    The calculators and tools on this website are provided "as is" and are intended for estimation purposes only. While we strive to ensure the accuracy of our calculators, we cannot guarantee that the results are error-free or suitable for your specific situation.
                </p>
                <ul>
                    <li>**Financial Calculators:** Results should not be considered financial advice. Actual loan terms, interest rates, and investment returns may vary.</li>
                    <li>**Health Calculators:** Results are not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</li>
                </ul>

                <h2>External Links Disclaimer</h2>
                <p>
                    The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
                </p>
            </div>
        </div>
    );
}
