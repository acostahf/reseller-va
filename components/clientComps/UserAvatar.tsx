"use client";
import React from "react";
import {
	Avatar,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import { Link } from "@nextui-org/link";

const UserAvatar = (props: any) => {
	const { user } = props;
	return (
		<div>
			<Dropdown placement="bottom-end">
				<DropdownTrigger>
					<Avatar
						isBordered
						as="button"
						className="transition-transform"
						color="secondary"
						name={user.name}
						size="sm"
						src={user.image}
					/>
				</DropdownTrigger>
				<DropdownMenu aria-label="Profile Actions" variant="flat">
					{siteConfig.navMenuItems.map((item, index) => (
						<DropdownItem
							as={Link}
							key={`${item}-${index}`}
							href={item.href}
							color={item.label === "Logout" ? "danger" : "default"}
							className="text-white"
						>
							{item.label}
						</DropdownItem>
					))}
				</DropdownMenu>
			</Dropdown>
		</div>
	);
};

export default UserAvatar;
