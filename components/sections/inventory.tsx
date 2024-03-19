"use client";

import { Card } from "@nextui-org/card";
import { CircularProgress } from "@nextui-org/react";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Bundle } from "@/types";

const Inventory = ({ data }: any) => {
	const [products, setProducts] = useState([data]);
	const [isLoading, setIsLoading] = useState(false);

	//sets the products from the server to the state
	useEffect(() => {
		setProducts(data);
	}, [data]);

	if (isLoading) return <CircularProgress color="secondary" />;
	if (!products) return <p>No Products</p>;

	return (
		<div className="w-full flex flex-col gap-4 justify-center pb-10">
			{products.map((product: Bundle, i) => (
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
