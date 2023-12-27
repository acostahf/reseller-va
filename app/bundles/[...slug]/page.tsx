"use client";
import { Product } from "@/types";
import { useEffect, useState } from "react";

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

	return (
		<div>
			<h1>{product?.name}</h1>
			<p>{product?.price}</p>
		</div>
	);
}
