"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/react";
import { Card } from "@nextui-org/card";
import { useAppContext } from "@/app/context/AppContext";
import { Stats } from "@/types";
import useAppStore from "@/app/context/stores/appStore";

const StatsCard = ({ statsData }: any) => {
	const {
		setStats,
		stats: { totalValue, totalProfit, totalCost, totalCount },
		isLoading,
	} = useAppStore();
	useEffect(() => {
		setStats(statsData);
	}, [statsData, setStats]);

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
					<p className="text-xl font-bold">Value: ${totalValue}</p>
					<p className="text-xl font-bold">Profit: ${totalProfit}</p>
				</div>
				<div className="space-y-3 text-start">
					<p className="text-xl font-bold">Cost: ${totalCost}</p>
					<p className="text-xl font-bold">Count: {totalCount}</p>
				</div>
			</div>
		</Card>
	);
};

export default StatsCard;
