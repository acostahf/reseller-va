import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number;
};

export interface Bundle {
	id: string;
	title: string;
	cost: number;
	value: number;
	geoLocation: string;
	quantity: number;
	receipt: string;
	createdAt: Date;
}

export type Bundles = Bundle[];

export type Product = {
	id: string;
	title: string;
	cost: number;
	value: number;
	geoLoaction: string;
	recipt: string;
	createAt: Date;
	aiTitle: string;
	aiDescription: string;
	dealId: string;
};
