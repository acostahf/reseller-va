import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
	title: `Privacy Policy | ${config.appName}`,
	canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
	return (
		<main className="max-w-xl mx-auto">
			<div className="p-5">
				<Link href="/" className="btn btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="w-5 h-5"
					>
						<path
							fillRule="evenodd"
							d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
							clipRule="evenodd"
						/>
					</svg>{" "}
					Back
				</Link>
				<h1 className="text-3xl font-extrabold pb-6">
					Privacy Policy for {config.appName}
				</h1>

				<pre
					className="leading-relaxed whitespace-pre-wrap"
					style={{ fontFamily: "sans-serif" }}
				>
					{`Effective Date: June 18, 2024

At Resellingflow, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.

Information We Collect

Personal Information: We collect your name, email, and payment information for order processing.
Non-Personal Information: We use web cookies to enhance your experience on our website.
Purpose of Data Collection
The data we collect is used solely for processing your orders and improving our services.

Data Sharing
We do not share your personal data with any third parties.

Children’s Privacy
We do not knowingly collect any information from children.

Updates to the Privacy Policy
We may update this Privacy Policy from time to time. Users will be notified of any changes via email.

Contact Information
If you have any questions or concerns about our Privacy Policy, please contact us at acostahf4@gmail.com.

By using Resellingflow, you consent to the terms of this Privacy Policy.

Resellingflow
Email: acostahf4@gmail.com
Website: https://resellingflow.com`}
				</pre>
			</div>
		</main>
	);
};

export default PrivacyPolicy;
