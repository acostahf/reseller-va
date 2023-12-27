"use client";

import { Card } from "@nextui-org/card";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Product } from "@/types";

const Inventory = () => {
	const [products, setProducts] = useState([]);
	const [isLoading, setLoading] = useState(true);

	//fetch products from db
	const fetchProducts = async () => {
		const res = await fetch("/api/products", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		if (data.error) {
			throw new Error(data.error);
		} else {
			setProducts(data);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	if (isLoading) return <p>Loading...</p>;
	if (!products) return <p>No Products</p>;

	return (
		<div className="w-full flex flex-col gap-4 justify-center">
			{products.map((product: Product, i) => (
				<Link key={i} href={`/bundles/${product.id}`}>
					<Card isPressable className="w-full text-center rounded-lg p-4">
						<h1 className=" capitalize ">{product.name}</h1>
					</Card>
				</Link>
			))}
		</div>
	);
};

export default Inventory;
