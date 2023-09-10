"use client";
import { Card } from "@nextui-org/card";
import React, { useEffect, useState } from "react";

type Product = {
	name: string;
	numberOfItems: number;
	price: number;
	createAt: Date;
};

const Inventory = () => {
	const [products, setProducts] = useState([]);
	const [isLoading, setLoading] = useState(true);

	const handlePress = () => {
		//opens a dynamic page with the product info
	};

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
				<Card
					onPress={handlePress}
					isPressable
					className="w-full text-center rounded-lg p-4"
					key={i}
				>
					<h1 className=" capitalize ">{product.name}</h1>
				</Card>
			))}
		</div>
	);
};

export default Inventory;
