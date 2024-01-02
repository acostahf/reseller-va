"use client";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { Divider } from "@nextui-org/react";
import CopyCard from "@/components/cards/CopyCard";
import { Button } from "@nextui-org/button";

export default function Page({ params }: { params: { slug: string } }) {
	const [product, setProduct] = useState<Product | null>(null);

	useEffect(() => {
		try {
			const fetchProduct = async () => {
				const res = await fetch(`/api/product/?id=${params.slug}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				const data = await res.json();
				if (data.error) {
					throw new Error(data.error);
				} else {
					setProduct(data);
				}
			};
			fetchProduct();
		} catch (error) {
			console.log(error);
		}
	}, [params.slug]);

	const handleUpdate = async () => {
		//TODO: update ebay link
	};

	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
			<Divider />
			<h2 className="text-2xl mt-6 mb-4">Sources</h2>
			<Divider />
			<div className="flex gap-4  pt-4">
				<a
					href="..."
					className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
				>
					Ebay Link
				</a>
				<Button onPress={handleUpdate} size="sm" color="secondary">
					Update
				</Button>
			</div>
			<p className="mt-2 mb-4">Cost of Goods: ${product?.price}</p>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<h1 className="text-xl font-bold">Listing Content</h1>
					<Divider />
				</div>
				<CopyCard
					title="Title"
					content="Make beautiful websites regardless of your design experience."
				/>
				<CopyCard
					title="Description"
					content="Make beautiful websites regardless of your design experience."
				/>
			</div>
		</div>
	);
}
