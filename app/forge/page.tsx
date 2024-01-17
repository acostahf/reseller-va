"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Product } from "@/types";

type NewProduct = {
	name: string;
};

const ForgePage = () => {
	const [inputValue, setInputValue] = useState("");
	const [products, setProducts] = useState([] as any);
	const [isFormVisible, setFormVisible] = useState(false);
	const [isEditing, setEditing] = useState(false);

	const handleAdd = () => {
		setFormVisible(true);
	};

	const handleSubmit = () => {
		if (inputValue.trim() === "") {
			return; // Prevent adding empty products
		}

		const newProduct: NewProduct = {
			name: inputValue,
		};
		if (isEditing) {
			setEditing(false);
		} else {
			setProducts([newProduct, ...products]);
			setInputValue("");
			setFormVisible(false);
		}
	};

	const handleProductClick = () => {
		setFormVisible(true);
	};
	const handleProductEdit = () => {
		setEditing(true);
	};

	return (
		<div>
			<h1 className="pb-4 text-xl">Forge a Pickup</h1>
			{isFormVisible ? (
				<div>
					<input
						type="text"
						placeholder="Enter product name"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<button onClick={handleSubmit}>Add Product</button>
				</div>
			) : (
				<Button onPress={handleAdd} className="w-full">
					+
				</Button>
			)}

			{isEditing && (
				<div>
					<input
						type="text"
						placeholder="Edit Product Name"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<button onClick={handleSubmit}>Save</button>
				</div>
			)}

			{products.map((product: any, index: any) => (
				<Card
					isPressable
					key={index}
					className="w-full text-center p-4 rounded "
					onPress={handleProductEdit}
				>
					<p>{product.name}</p>
					{/* Display other product information */}
				</Card>
			))}
		</div>
	);
};

export default ForgePage;
