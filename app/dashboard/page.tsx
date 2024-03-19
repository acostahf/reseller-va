import StatsCard from "@/components/cards/StatsCard";
import AddFinds from "@/components/sections/addFinds";
import Inventory from "@/components/sections/inventory";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const getData = async () => {
	const session = await getServerSession(authOptions);

	const statsResp = await fetch("http://localhost:3000/api/stats", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"X-User-Email": session?.user?.email as string,
		},
	});
	const bundleResp = await fetch("http://localhost:3000/api/bundles", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"X-User-Email": session?.user?.email as string,
		},
	});

	const bundles = await bundleResp.json();
	const stats = await statsResp.json();

	return { stats, bundles };
};

export default async function DashboardPage() {
	const { stats, bundles } = await getData();

	return (
		<div className="flex flex-col gap-4 w-full justify-center items-center">
			<StatsCard data={stats} />
			<Inventory data={bundles} />
			<AddFinds />
		</div>
	);
}
