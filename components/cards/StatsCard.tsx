"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/skeleton";
import { Card } from "@nextui-org/card";

const StatsCard = () => {
	const [data, setData] = useState({
		totalValue: 0,
		totalProfit: 0,
		totalCost: 0,
		totalCount: 0,
	});

	useEffect(() => {
		const fetchStats = async () => {
			const res = await fetch("/api/stats");
			const data = await res.json();
			setData(data);
		};
		fetchStats();
	}, []);

	return (
		<div>
			<Card className="w-full space-y-5 p-4" radius="2xl">
				<div className="space-y-3 text-start">
					<h1 className="text-3xl font-bold">Stats</h1>
					<p className="text-xl font-bold">
						Total Inventory Value: ${data.totalValue}
					</p>
					<p className="text-xl font-bold">
						Total Inventory Profit: ${data.totalProfit}
					</p>
					<p className="text-xl font-bold">
						Total Inventory Cost: ${data.totalCost}
					</p>
					<p className="text-xl font-bold">
						Total Inventory Count: {data.totalCount}
					</p>
				</div>
			</Card>
		</div>
	);
};

export default StatsCard;
