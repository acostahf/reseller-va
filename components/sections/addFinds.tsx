"use client";
import React, { useState } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Input,
	Switch,
	Skeleton,
} from "@nextui-org/react";
import { useAppContext } from "@/app/context/AppContext";

const AddFinds = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [needInputDate, setNeedInputDate] = useState(false);
	const [captureReciept, setCaptureReciept] = useState(false);
	const [productName, setProductName] = useState("");
	const [numberOfItems, setNumberOfItems] = useState<Number>();
	const [price, setPrice] = useState<Number>();
	const [estimate, setEstimate] = useState<Number>();
	const [ebayLink, setEbayLink] = useState("");
	const { refreshData } = useAppContext();

	const handleSwitchChange = () => {
		setNeedInputDate(!needInputDate);
	};
	const handleRecieptChange = () => {
		setCaptureReciept(!captureReciept);
	};

	const handleSubmit = async () => {
		try {
			const dealData = {
				title: productName,
				cost: price,
				value: estimate,
				geoLoaction: "TODO",
				quantity: numberOfItems,
				ebayLink: ebayLink,
				recipt: "TODO",
				createAt: new Date(),
			};
			const res = await fetch("/api/bundles", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dealData),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			} else {
				// clear the form
				setProductName("");
				setEbayLink("");
				setNumberOfItems(0);
				setPrice(0);
				setEstimate(0);
				setNeedInputDate(false);
				setCaptureReciept(false);
				//ts-ignore
				onOpenChange(false);
				refreshData();
			}
		} catch (error) {
			console.log("Err:", error);
		}
	};

	return (
		<div className="fixed w-full bottom-0 py-6 bg-black flex justify-center">
			<div className="w-3/5">
				<Button
					onPress={onOpen}
					color="primary"
					className="uppercase w-full"
				>
					Quick Add
				</Button>
			</div>
			<Modal
				isOpen={isOpen}
				placement={"bottom-center"}
				onOpenChange={onOpenChange}
				backdrop="blur"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Quick Add
							</ModalHeader>
							<ModalBody>
								<Input
									value={productName}
									onChange={(e) => setProductName(e.target.value)}
									label="Product Name"
									placeholder="Wii Bundle"
								/>
								<Input
									value={numberOfItems as any}
									onChange={(e: any) => setNumberOfItems(e.target.value)}
									placeholder="10"
									type="number"
								/>
								<div className="flex justify-between gap-2">
									<Input
										value={price as any}
										onChange={(e: any) => setPrice(e?.target?.value)}
										label="Cost of Goods"
										placeholder="$100"
										type="number"
									/>
									<Input
										value={estimate as any}
										onChange={(e: any) => setEstimate(e.target.value)}
										label="Last Sold For "
										placeholder="$200"
										type="number"
									/>
								</div>
								<Input
									value={ebayLink}
									onChange={(e) => setEbayLink(e.target.value)}
									label="Ebay Link"
									placeholder="ebay.com/1234"
									type="string"
								/>
								<Switch onChange={handleRecieptChange} color="success">
									Do you have a receipt?
								</Switch>
								{captureReciept && (
									<div className="flex flex-col justify-center items-center">
										<p className="text-xs">Take a Picture</p>
										<Skeleton className="flex rounded-full w-12 h-12" />
									</div>
								)}

								<Switch onChange={handleSwitchChange} color="success">
									Do you need to input a different date?
								</Switch>
								{needInputDate && (
									<Input
										label="Date"
										type="date"
										placeholder="YYYY-MM-DD"
									/>
								)}
							</ModalBody>
							<ModalFooter>
								<Button color="danger" variant="light" onPress={onClose}>
									Close
								</Button>
								<Button color="primary" onPress={handleSubmit}>
									Add
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
};

export default AddFinds;
