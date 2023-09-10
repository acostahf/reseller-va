import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number;
};

export type Product = {
	id: string;
	name: string;
	price: number;
	description: string;
	image: string;
}[];
