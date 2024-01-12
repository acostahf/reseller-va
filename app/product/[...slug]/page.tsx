"use client";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { Divider, Input } from "@nextui-org/react";
import CopyCard from "@/components/cards/CopyCard";
import { Button } from "@nextui-org/button";

export default function Page({ params }: { params: { slug: string } }) {
	const [product, setProduct] = useState<Product | null>(null);
	const [editableTitle, setEditableTitle] = useState("");
	const [editableEbayLink, setEditableEbayLink] = useState("");
	const [aiTitle, setAiTitle] = useState("");
	const [aiDescription, setAiDescription] = useState("");

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

	useEffect(() => {
		if (product) {
			setEditableTitle(product.title);
			setEditableEbayLink(product?.ebayLink);
			setAiTitle(product?.aiTitle);
			setAiDescription(product?.aiDescription);
		}
	}, [product]);

	const handleTitleChange = (e) => {
		setEditableTitle(e.target.value);
	};

	const handleEbayLinkChange = (e) => {
		setEditableEbayLink(e.target.value);
	};

	const handleUpdate = async () => {
		try {
			console.log("Updating...");
			const res = await fetch(`/api/product/?id=${params.slug}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: editableTitle,
					ebayLink: editableEbayLink,
					aiTitle: aiTitle,
					aiDescription: aiDescription,
				}),
			});
			const data = await res.json();
			console.log(data);
			if (data.error) {
				throw new Error(data.error);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="w-full p-6">
			<Divider />
			<h2 className="text-2xl mt-6 mb-4">Sources</h2>
			<Divider />
			<Input
				className="text-3xl font-bold mb-4"
				value={editableTitle}
				onChange={handleTitleChange}
			/>
			<div className="w-full  pb-4">
				<Input value={editableEbayLink} onChange={handleEbayLinkChange} />
			</div>
			<div className="w-full flex justify-end">
				<Button onPress={handleUpdate} size="sm" color="secondary">
					Update
				</Button>
			</div>
			<p className="mt-2 mb-4">
				Cost of Goods: ${product?.cost.toFixed(2)}
			</p>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<h1 className="text-xl font-bold">Listing Content</h1>
					<Divider />
				</div>
				<CopyCard title="Title" content={aiTitle} />
				<CopyCard title="Description" content={aiDescription} />
			</div>
		</div>
	);
}
