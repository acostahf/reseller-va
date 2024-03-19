import StatsCard from "@/components/cards/StatsCard";
import AddFinds from "@/components/sections/addFinds";
import Inventory from "@/components/sections/inventory";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type D = {
	data: any;
	bundles: any;
};

const getData = async () => {
	let d: D;
	const session = await getServerSession(authOptions);
	const userEmail = session?.user?.email;
	const stats = await fetch("http://localhost:3000/api/stats", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"X-User-Email": userEmail as string,
		},
	});
	const bundleResp = await fetch("http://localhost:3000/api/bundles", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"X-User-Email": userEmail as string,
		},
	});

	const bundles = await bundleResp.json();
	const data = await stats.json();

	d = { data, bundles };
	return d;
};

// const getUsers = async () => {
// 	const userResp = await fetch("http://localhost:3000/api/user", {
// 		method: "GET",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	});
// 	const user = await userResp.json();
// 	return user;
// };

export default async function DashboardPage() {
	const { data, bundles } = await getData();

	return (
		<div className="flex flex-col gap-4 w-full justify-center items-center">
			<StatsCard statsData={data} />
			<Inventory data={bundles} />
			<AddFinds />
		</div>
	);
}
