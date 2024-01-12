"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/skeleton";
import { Card } from "@nextui-org/card";
import { useAppContext } from "@/app/context/AppContext";
import { Stats } from "@/types";

const StatsCard = () => {
	const { stats } = useAppContext();
	const [data, setData] = useState<Stats>(stats);

	useEffect(() => {
		setData(stats);
	}, [stats]);
	return (
		<Card className="w-full space-y-5 p-4" radius="2xl">
			<h1 className="text-3xl font-bold text-left">Stats</h1>
			<div className="grid md:grid-cols-2">
				<div className="space-y-3 text-start">
					<p className="text-xl font-bold">
						Total Inventory Value: ${data.totalValue}
					</p>
					<p className="text-xl font-bold">
						Total Inventory Profit: ${data.totalProfit}
					</p>
				</div>
				<div className="space-y-3 text-start">
					<p className="text-xl font-bold">
						Total Inventory Cost: ${data.totalCost}
					</p>
					<p className="text-xl font-bold">
						Total Inventory Count: {data.totalCount}
					</p>
				</div>
			</div>
		</Card>
	);
};

export default StatsCard;
