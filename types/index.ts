import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number;
};

export type Products = {
	id: string;
	name: string;
	price: number;
	description: string;
	image: string;
}[];

export type Product = {
	id: string;
	name: string;
	numberOfItems: number;
	price: number;
	createAt: Date;
};
