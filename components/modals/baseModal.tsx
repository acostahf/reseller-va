import React from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
} from "@nextui-org/react";

interface BaseModalProps {
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
	children: React.ReactNode;
	scrollBehavior?: "inside" | "outside";
}

const BaseModal = ({
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
	scrollBehavior,
}: BaseModalProps) => {
	return (
		<Modal
			isOpen={isOpen}
			placement={placement}
			onOpenChange={onOpenChange}
			backdrop={backdrop}
			onClose={onClose}
			scrollBehavior={scrollBehavior}
		>
			<ModalContent>
				{(onClose) => (
					<>
						{header && <ModalHeader>{header}</ModalHeader>}
						<ModalBody>{children}</ModalBody>
						{firstButton && (
							<ModalFooter className="pb-24">
								<Button color="danger" variant="light" onPress={onClose}>
									{firstButton}
								</Button>
								<Button color="primary" onPress={handleSubmit}>
									{secondButton}
								</Button>
							</ModalFooter>
						)}
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default BaseModal;
