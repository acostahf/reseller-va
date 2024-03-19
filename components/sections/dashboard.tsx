"use client";
import React from "react";
import StatsCard from "@/components/cards/StatsCard";
import AddFinds from "@/components/sections/addFinds";
import Inventory from "@/components/sections/inventory";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useAppStore from "@/app/context/stores/appStore";

const Dashboard = () => {
	const { data: session } = useSession();
	const [data, setData] = useState({});
	const [bundles, setBundles] = useState([]);
	const { setStats } = useAppStore();

	useEffect(() => {
		const getData = async () => {
			const user = session?.user?.email as string;
			const stats = await fetch("http://localhost:3000/api/stats", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"X-User-Email": user,
				},
			});
			const bundleResp = await fetch("http://localhost:3000/api/bundles", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"X-User-Email": user,
				},
			});

			const bundles = await bundleResp.json();
			const data = await stats.json();
			setStats(data);
			setBundles(bundles);
		};
		getData();
	}, [session?.user?.email, setStats]);

	return (
		<div className="flex flex-col gap-4 w-full justify-center items-center">
			<StatsCard />
			<Inventory data={bundles} />
			<AddFinds />
		</div>
	);
};

export default Dashboard;
