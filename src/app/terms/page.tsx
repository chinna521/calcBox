import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | CalcBox",
    description: "Terms of Service for CalcBox. Please read these terms carefully before using our website.",
};

export default function TermsOfService() {
    return (
        <div className="container py-12 animate-fade-in">
            <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h1>Terms of Service</h1>
                <p className="text-[var(--foreground-secondary)]">Last updated: {new Date().toLocaleDateString()}</p>

                <h2>1. Agreement to Terms</h2>
                <p>
                    These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and CalcBox ("we," "us" or "our"), concerning your access to and use of the CalcBox website. By accessing the Site, you read, understood, and agree to be bound by all of these Terms of Service.
                </p>

                <h2>2. Intellectual Property Rights</h2>
                <p>
                    Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                </p>

                <h2>3. User Representations</h2>
                <p>
                    By using the Site, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms of Service; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Site through automated or non-human means, whether through a bot, script or otherwise; (4) you will not use the Site for any illegal or unauthorized purpose; and (5) your use of the Site will not violate any applicable law or regulation.
                </p>

                <h2>4. Disclaimer</h2>
                <p>
                    The Site is provided on an as-is and as-available basis. You agree that your use of the Site and our services will be at your sole risk. To the fullest extent permitted by law, we disclaim all warranties, express or implied, in connection with the site and your use thereof, including, without limitation, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                </p>
                <p>
                    **Important:** The calculators and tools provided on this website are for informational and educational purposes only. They are not intended to provide professional advice, whether medical, financial, legal, or otherwise. You should always consult with a qualified professional before making any decisions based on the results provided by these tools.
                </p>

                <h2>5. Limitation of Liability</h2>
                <p>
                    In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site, even if we have been advised of the possibility of such damages.
                </p>

                <h2>6. Contact Us</h2>
                <p>
                    In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at: support@calcbox.com
                </p>
            </div>
        </div>
    );
}
