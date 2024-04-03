import React, { use, useEffect, useState } from "react";
import BaseModal from "./baseModal";
import { Button, Divider, Input } from "@nextui-org/react";
import CopyCard from "../cards/CopyCard";
import { Product } from "@/types";

interface ProductModalProps {
	isOpen: boolean;
	placement?:
		| "center"
		| "top"
		| "bottom"
		| "auto"
		| "top-center"
		| "bottom-center";
	onOpenChange?: () => void;
	backdrop?: "blur" | "transparent" | "opaque";
	handleSubmit?: () => void;
	onClose: () => void;
	firstButton?: string;
	secondButton?: string;
	header?: string;
	children?: React.ReactNode;
	product: Product | null;
	fetchProduct: () => void;
}

const ProductModal = ({
	isOpen,
	onClose,
	placement,
	onOpenChange,
	backdrop,
	handleSubmit,
	firstButton,
	secondButton,
	header,
	children,
	product,
	fetchProduct,
}: ProductModalProps) => {
	const [editableTitle, setEditableTitle] = useState("");
	const [editableEbayLink, setEditableEbayLink] = useState("");
	const [aiTitle, setAiTitle] = useState("");
	const [aiDescription, setAiDescription] = useState("");

	useEffect(() => {
		if (product) {
			setEditableTitle(product.title);
			setEditableEbayLink(product?.ebayLink);
			setAiTitle(product?.aiTitle);
			setAiDescription(product?.aiDescription);
		}
	}, [product]);

	const handleTitleChange = (e: any) => {
		setEditableTitle(e.target.value);
	};

	const handleEbayLinkChange = (e: any) => {
		setEditableEbayLink(e.target.value);
	};

	const fetchAi = async () => {
		const res = await fetch(`/api/openai`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: product?.title,
				ebayLink: product?.ebayLink,
			}),
		});
		const data = await res.json();
		console.log(data);
		if (data.error) {
			throw new Error(data.error);
		} else {
			setAiTitle(data.title);
			setAiDescription(data.description);
			console.log("AI Title:", data.title);
			console.log("AI Description:", data.description);
		}
	};

	const handleUpdate = async () => {
		try {
			console.log("Updating...");
			const res = await fetch(`/api/product/?id=${product?.id}`, {
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
			fetchProduct();
			if (data.error) {
				throw new Error(data.error);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<BaseModal
			isOpen={isOpen}
			onClose={onClose}
			handleSubmit={handleUpdate}
			firstButton="close"
			secondButton="save"
			header={product?.title}
			scrollBehavior="inside"
		>
			<Input
				className="text-3xl font-bold mb-4"
				label="Title"
				value={editableTitle}
				onChange={handleTitleChange}
			/>

			<Input
				label="Ebay Link"
				value={editableEbayLink}
				onChange={handleEbayLinkChange}
			/>

			<p className="mt-4 mb-4">
				Cost of Goods: ${product?.cost.toFixed(2)}
			</p>

			<div className="w-full flex flex-col gap-4 relative">
				<div className="flex flex-col gap-2">
					<div className="w-full flex justify-between">
						<h1 className="text-xl font-bold">Listing Content</h1>
						<Button onPress={fetchAi} size="sm" color="secondary">
							Generate
						</Button>
					</div>
					<Divider className="mb-1" />
				</div>

				<CopyCard title="Title" content={aiTitle} />
				<CopyCard title="Description" content={aiDescription} />
			</div>
		</BaseModal>
	);
};

export default ProductModal;
