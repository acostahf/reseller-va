import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import clsx from "clsx";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

// export async function getData() {
// 	try {
// 		const bundlesRes = await fetch("http://localhost:3000/api/bundles", {
// 			method: "GET",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		});
// 		const bundles = await bundlesRes.json();
// 		const userRes = await fetch("http://localhost:3000/api/user", {
// 			method: "GET",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		});
// 		const user = await userRes.json();

// 		const statsRes = await fetch("http://localhost:3000/api/stats", {
// 			method: "GET",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		});
// 		const stats = await statsRes.json();
// 		return { props: { bundles, user, stats } };
// 	} catch (error) {
// 		console.error(error);
// 	}
// }

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Providers
					themeProps={{ attribute: "class", defaultTheme: "dark" }}
				>
					<div className="relative flex flex-col h-screen">
						<Navbar />
						<main className="container mx-auto max-w-4xl pt-16 px-6 flex-grow">
							{children}
						</main>
						<footer className="w-full flex items-center justify-center py-3">
							{/* <Link
								isExternal
								className="flex items-center gap-1 text-current"
								href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
								title="nextui.org homepage"
							>
								<span className="text-default-600">Powered by</span>
								<p className="text-primary">NextUI</p>
							</Link> */}
						</footer>
					</div>
				</Providers>
			</body>
		</html>
	);
}
