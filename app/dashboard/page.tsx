"use client";
import StatsCard from "@/components/cards/StatsCard";
import AddFinds from "@/components/sections/addFinds";
import Inventory from "@/components/sections/inventory";
import useAppStore from "@/stores/appStore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function DashboardPage() {
	const { setBundles, setStats, bundles, stats } = useAppStore();

	const { data: session } = useSession();

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch("/api/bundles", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"X-User-Email": session?.user?.email as string,
				},
			});

			const data = await res.json();
			setBundles(data.bundles);
			setStats(data.stats);
		};
		fetchData();
	}, [session?.user?.email, setBundles, setStats]);

	return (
		<div className="flex flex-col gap-4 w-full justify-center items-center">
			<StatsCard data={stats} />
			<Inventory data={bundles} />
			<AddFinds />
		</div>
	);
}
