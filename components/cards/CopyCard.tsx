"use client";
import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Button } from "@nextui-org/button";

const CopyCard = (props: any) => {
	const { title, content } = props;

	const handleClipBoard = () => {
		navigator.clipboard
			.writeText(content)
			.then(() => {
				console.log("Text copied to clipboard");
			})
			.catch((err) => {
				console.error("Failed to copy text: ", err);
			});
	};

	return (
		<Card className="max-w-[400px]">
			<CardHeader className="w-full flex justify-between ">
				{title}
				<Button color="primary" size="sm" onPress={handleClipBoard}>
					COPY
				</Button>
			</CardHeader>
			<CardBody>
				<p>{content}</p>
			</CardBody>
		</Card>
	);
};

export default CopyCard;
