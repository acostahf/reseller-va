"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/react";
import { Card } from "@nextui-org/card";
import { useAppContext } from "@/app/context/AppContext";
import { Stats } from "@/types";

const StatsCard = () => {
	const { stats, isLoading } = useAppContext();
	const [data, setData] = useState<Stats>(stats);

	useEffect(() => {
		setData(stats);
	}, [stats]);

	if (isLoading)
		return (
			<Card className="w-full space-y-5 p-4" radius="lg">
				<Skeleton className="w-1/5 h-7 rounded-lg">
					<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
				</Skeleton>
				<div className="grid md:grid-cols-2">
					<div className="space-y-3">
						<Skeleton className="w-3/5 h-7 rounded-lg">
							<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
						</Skeleton>
						<Skeleton className="w-4/5 h-7 rounded-lg">
							<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
						</Skeleton>
					</div>
					<div className="space-y-3">
						<Skeleton className="w-3/5 h-7 rounded-lg">
							<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
						</Skeleton>
						<Skeleton className="w-4/5 h-7 rounded-lg">
							<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
						</Skeleton>
					</div>
				</div>
			</Card>
		);
	return (
		<Card className="w-full space-y-5 p-4" radius="lg">
			<h1 className="text-3xl font-bold text-left">Stats</h1>
			<div className="grid grid-cols-2">
				<div className="space-y-3 text-start">
					<p className="text-xl font-bold">Value: ${data.totalValue}</p>
					<p className="text-xl font-bold">Profit: ${data.totalProfit}</p>
				</div>
				<div className="space-y-3 text-start">
					<p className="text-xl font-bold">Cost: ${data.totalCost}</p>
					<p className="text-xl font-bold">Count: {data.totalCount}</p>
				</div>
			</div>
		</Card>
	);
};

export default StatsCard;
