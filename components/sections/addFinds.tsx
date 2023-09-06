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
	RadioGroup,
	Radio,
	Input,
	Switch,
	Skeleton,
} from "@nextui-org/react";

const AddFinds = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [needInputDate, setNeedInputDate] = useState(false);
	const [captureReciept, setCaptureReciept] = useState(false);

	const handleSwitchChange = () => {
		setNeedInputDate(!needInputDate);
	};
	const handleRecieptChange = () => {
		setCaptureReciept(!captureReciept);
	};
	return (
		<div>
			<Button onPress={onOpen} color="primary" className="uppercase">
				Add A Buy
			</Button>
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
								Add Your Finds
							</ModalHeader>
							<ModalBody>
								<Input label="Name" placeholder="Wii Bundle" />
								<Input label="# of Items" placeholder="10" />
								<Input label="Price" placeholder="$100" />
								<Switch onChange={handleRecieptChange} color="success">
									Do you have a recipt?
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
								<Button color="primary" onPress={onClose}>
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
