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
}: BaseModalProps) => {
	return (
		<Modal
			isOpen={isOpen}
			placement={placement}
			onOpenChange={onOpenChange}
			backdrop={backdrop}
			onClose={onClose}
		>
			<ModalContent className="pb-20 md:p-0">
				{(onClose) => (
					<>
						{header && (
							<ModalHeader className="flex flex-col gap-1">
								{header}
							</ModalHeader>
						)}
						<ModalBody>{children}</ModalBody>
						{firstButton && (
							<ModalFooter>
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
