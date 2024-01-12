"use client";
import { useEffect, useState } from "react";
import { Card, Divider } from "@nextui-org/react";
import { Bundle, Product } from "@/types";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { slug: string } }) {
	const router = useRouter();
	const [bundle, setBundle] = useState<Bundle | null>(null);
	const [products, setProducts] = useState<Product[] | null>(null);

	useEffect(() => {
		try {
			const fetchProduct = async () => {
				const res = await fetch(`/api/bundle/?id=${params.slug}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				const data = await res.json();
				if (data.error) {
					throw new Error("Fetching Error:", data.error);
				} else {
					console.log(data.bundle);
					setBundle(data.bundle);
					setProducts(data.products);
				}
			};
			fetchProduct();
		} catch (error) {
			console.log("Fetching Error:", error);
		}
	}, [params.slug]);

	const handleSelection = async (value: string) => {
		router.push(`/product/${value}`);
	};

	if (!bundle) return <p>No Bundle</p>;

	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold mb-4">{bundle?.title}</h1>
			<Divider />
			<h2 className="text-2xl mt-6 mb-4">Sources</h2>
			<Divider />
			<p className="mt-2 mb-4">Cost of Goods: ${bundle?.cost}</p>
			<p className="mt-2 mb-4">Number of Listings: {bundle?.quantity}</p>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<h1 className="text-xl font-bold">Listing</h1>
					<Divider />
				</div>
				<div className="flex flex-wrap gap-4">
					{products?.map((item, i) => {
						return (
							<Card
								isPressable
								onPress={() => handleSelection(item?.id)}
								key={i}
								className="w-full text-center rounded-lg p-4"
							>
								<h1 className=" capitalize ">{item?.title}</h1>
								<p>Cost: ${item?.cost.toFixed(2)}</p>
								<p>Value: ${item?.value.toFixed(2)}</p>
							</Card>
						);
					})}
				</div>
			</div>
		</div>
	);
}
