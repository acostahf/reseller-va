"use client";
import React from "react";
import { Skeleton } from "@nextui-org/skeleton";
import { Card } from "@nextui-org/card";

const Graph = () => {
	return (
		<Card className="w-full max-w-[800px] space-y-5 p-4" radius="2xl">
			<Skeleton className="rounded-lg">
				<div className="h-52 rounded-lg bg-default-300"></div>
			</Skeleton>
			<div className="space-y-3 text-start">
				<Skeleton className="w-3/5 rounded-lg">
					<div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
				</Skeleton>
				<Skeleton className="w-4/5 rounded-lg">
					<div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
				</Skeleton>
				<Skeleton className="w-2/5 rounded-lg">
					<div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
				</Skeleton>
			</div>
		</Card>
	);
};

export default Graph;
