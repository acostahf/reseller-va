"use client";
import { useCallback, useEffect, useState } from "react";
import { Card, Divider, Input } from "@nextui-org/react";
import { Bundle, Product } from "@/types";
import { useRouter } from "next/navigation";
import ProductModal from "@/components/modals/productModal";
import { useUser } from "@clerk/nextjs";

export default function Page({ params }: { params: { slug: string } }) {
	const router = useRouter();
	const [bundle, setBundle] = useState<Bundle | null>(null);
	const [products, setProducts] = useState<Product[] | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [product, setProduct] = useState<Product | null>(null);
	const bundleId = params.slug;
	const user = useUser();

	const fetchProduct = useCallback(async () => {
		const res = await fetch(`/api/bundle/?id=${bundleId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"X-User-Email": user?.user?.primaryEmailAddress
					?.emailAddress as string,
			},
		});
		const data = await res.json();
		if (data.error) {
			throw new Error("Fetching Error:", data.error);
		} else {
			setBundle(data.bundle);
			setProducts(data.products);
		}
	}, [bundleId, user]);

	useEffect(() => {
		try {
			fetchProduct();
		} catch (error) {
			console.log("Fetching Error:", error);
		}
	}, [fetchProduct, params.slug]);

	const handleSelection = async (value: any) => {
		setProduct(value);
		setIsOpen(!isOpen);
	};

	if (!bundle) return <p>loading...</p>;

	return (
		<div className="p-6">
			<div className="pb-4">
				<a
					onClick={() => router.back()}
					className="text-blue-500 hover:cursor-pointer"
				>
					Back
				</a>
			</div>
			<h1 className="text-3xl font-bold mb-4">{bundle?.title}</h1>
			<Divider />
			<h2 className="text-2xl mt-6 mb-4">Sources</h2>
			<Divider />
			<div className="flex flex-row flex-wrap">
				<p className="mt-2 mb-4 w-1/2">COG: ${bundle?.cost}</p>
				<p className="mt-2 mb-4 w-1/2">Listings: {bundle?.quantity}</p>
				<p className="mt-2 mb-4 w-1/2">
					ROI: {bundle?.value / bundle?.cost}X
				</p>
				<p className="mt-2 mb-4 w-1/2">
					Profit: ${bundle?.value - bundle?.cost}
				</p>
			</div>
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
								onPress={() => handleSelection(item)}
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
			<ProductModal
				bundleId={bundleId}
				product={product}
				isOpen={isOpen}
				onClose={() => setIsOpen(!isOpen)}
				fetchProduct={fetchProduct}
				userEmail={user?.user?.primaryEmailAddress?.emailAddress as string}
			/>
		</div>
	);
}
