"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/react";
import { Card } from "@nextui-org/card";
import useAppStore from "@/app/context/stores/appStore";

const StatsCard = () => {
	const { stats } = useAppStore();
	const { totalValue, totalProfit, totalCost, totalCount } = stats;

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
