"use client";
import { Card } from "@nextui-org/card";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Bundle } from "@/types";
import useAppStore from "@/stores/appStore";

const Inventory = ({ data }: any) => {
	const { bundles, setBundles } = useAppStore();
	const [localBundles, setLocalBundles] = useState(data);

	useEffect(() => {
		setBundles(data);
	}, [data, setBundles]);

	useEffect(() => {
		// Function to update local state if the store's stats update
		const updateLocalBundlesFromStore = () => {
			setLocalBundles(bundles);
		};

		// Call the update function if the store's stats change and are different from the local stats
		if (JSON.stringify(bundles) !== JSON.stringify(localBundles)) {
			updateLocalBundlesFromStore();
		}
	}, [localBundles, bundles]);

	return (
		<div className="w-full flex flex-col gap-4 justify-center pb-10">
			{localBundles.map((product: Bundle, i: number) => (
				<Link key={i} href={`/bundle/${product.id}`}>
					<Card
						isPressable
						className="w-full flex flex-row justify-between rounded-lg p-4"
					>
						<h1 className="capitalize ">{product.title}</h1>
						<h1 className="text-[#15ea7d] font-bold">${product.value}</h1>
					</Card>
				</Link>
			))}
		</div>
	);
};

export default Inventory;
