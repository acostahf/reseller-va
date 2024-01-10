import StatsCard from "@/components/cards/StatsCard";
import AddFinds from "@/components/sections/addFinds";
import Inventory from "@/components/sections/inventory";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function DashboardPage() {
	const session = await getServerSession(authOptions);

	return (
		<div className="flex flex-col gap-4 w-full justify-center items-center">
			<StatsCard />
			<Inventory />
			<AddFinds />
		</div>
	);
}
