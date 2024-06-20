"use client";
import StatsCard from "@/components/cards/StatsCard";
import AddFinds from "@/components/sections/addFinds";
import Inventory from "@/components/sections/inventory";
import useAppStore from "@/stores/appStore";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function DashboardPage() {
	const { setBundles, setStats, bundles, stats } = useAppStore();
	const { user } = useUser();

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch("/api/bundles", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"X-User-Email": user?.primaryEmailAddress
						?.emailAddress as string,
				},
			});

			const data = await res.json();
			setBundles(data.bundles);
			setStats(data.stats);
		};
		fetchData();
	}, [user, setBundles, setStats]);

	return (
		<div className="flex flex-col gap-4 w-full justify-center items-center">
			<StatsCard data={stats} />
			<Inventory data={bundles} />
			<AddFinds />
		</div>
	);
}
