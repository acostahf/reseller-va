export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Reselling Flow",
	description:
		"Reselling Flow is a platform for resellers to manage their inventory and see their progess over time.",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
		{
			label: "Dashboard",
			href: "/dashboard",
		},
	],
	navMenuItems: [
		// {
		// 	label: "Profile",
		// 	href: "/profile",
		// },
		{
			label: "Dashboard",
			href: "/dashboard",
		},
		// {
		// 	label: "Settings",
		// 	href: "/settings",
		// },
		// {
		// 	label: "Help & Feedback",
		// 	href: "/help-feedback",
		// },
		{
			label: "Logout",
			href: "/api/auth/signout",
		},
	],
	links: {
		// github: "https://github.com/nextui-org/nextui",
		twitter: "https://twitter.com/fabianhaco",
		// docs: "https://nextui.org",
		// discord: "https://discord.gg/9b6yyZKmH4",
		// sponsor: "https://patreon.com/jrgarciadev",
	},
};
