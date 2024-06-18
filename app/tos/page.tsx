import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
	title: `Terms and Conditions | ${config.appName}`,
	canonicalUrlRelative: "/tos",
});

const TOS = () => {
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
					</svg>
					Back
				</Link>
				<h1 className="text-3xl font-extrabold pb-6">
					Terms and Conditions for {config.appName}
				</h1>

				<pre
					className="leading-relaxed whitespace-pre-wrap"
					style={{ fontFamily: "sans-serif" }}
				>
					{`Terms & Services

Effective Date: June 18, 2024

Welcome to Resellingflow (the “Website”). By accessing or using our Website, you agree to be bound by these Terms & Services (the “Terms”).

Acceptance of Terms
By using Resellingflow, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, please do not use the Website.

Description of Service
Resellingflow is an application to help resellers begin the listing process sooner and keep track of their inventory.

Ownership and Access
When purchasing a package, users gain access to content necessary to use the application.

User Data Collection
We collect personal information including name, email, and payment information. Non-personal data, such as web cookies, are also collected to improve user experience. For more details, please refer to our Privacy Policy available at https://resellingflow/privacy-policy.

User Responsibilities
Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.

Governing Law
These Terms are governed by and construed in accordance with the laws of the United States.

Changes to Terms
We reserve the right to update these Terms at any time. Users will be notified of any changes by email.

Contact Information
For any questions regarding these Terms, please contact us at acostahf4@gmail.com.

By using Resellingflow, you acknowledge that you have read, understood, and agree to be bound by these Terms & Services.

Resellingflow
Email: acostahf4@gmail.com
Website: https://resellingflow.com

Thank you for using Resellingflow!`}
				</pre>
			</div>
		</main>
	);
};

export default TOS;
