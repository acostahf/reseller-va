"use client";

import { Card } from "@nextui-org/card";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Product } from "@/types";
import { useAppContext } from "@/app/context/AppContext";

const Inventory = () => {
	const { bundles, isLoading } = useAppContext();
	const [products, setProducts] = useState([bundles]);

	useEffect(() => {
		setProducts(bundles);
	}, [bundles]);

	if (isLoading) return <p>Loading...</p>;
	if (!products) return <p>No Products</p>;

	return (
		<div className="w-full flex flex-col gap-4 justify-center">
			{products.map((product: Product, i) => (
				<Link key={i} href={`/bundle/${product.id}`}>
					<Card isPressable className="w-full text-center rounded-lg p-4">
						<h1 className=" capitalize ">{product.title}</h1>
					</Card>
				</Link>
			))}
		</div>
	);
};

export default Inventory;
