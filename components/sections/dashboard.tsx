"use client";
import React from "react";
import StatsCard from "@/components/cards/StatsCard";
import AddFinds from "@/components/sections/addFinds";
import Inventory from "@/components/sections/inventory";
import { useEffect, useState } from "react";
import useAppStore from "@/stores/appStore";
import { useUser } from "@clerk/nextjs";

const Dashboard = () => {
	const user = useUser();
	const [data, setData] = useState({});
	const [bundles, setBundles] = useState([]);
	const { setStats } = useAppStore();

	useEffect(() => {
		const getData = async () => {
			const stats = await fetch("http://localhost:3000/api/stats", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"X-User-Email": user?.user?.primaryEmailAddress
						?.emailAddress as string,
				},
			});
			const bundleResp = await fetch("http://localhost:3000/api/bundles", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"X-User-Email": user?.user?.primaryEmailAddress
						?.emailAddress as string,
				},
			});

			const bundles = await bundleResp.json();
			const data = await stats.json();
			setStats(data);
			setBundles(bundles);
		};
		getData();
	}, [user, setStats]);

	return (
		<div className="flex flex-col gap-4 w-full justify-center items-center">
			<StatsCard />
			<Inventory data={bundles} />
			<AddFinds />
		</div>
	);
};

export default Dashboard;
