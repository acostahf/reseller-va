import { NextResponse } from "next/server";
import { Bundles, Bundle } from "@/types";

function calculateStats(bundles: Bundles) {
	return bundles.reduce(
		(
			acc: {
				totalValue: number;
				totalProfit: number;
				totalCost: number;
				totalCount: number;
			},
			bundle: Bundle
		) => {
			acc.totalValue += Number(bundle.value);
			acc.totalCost += Number(bundle.cost);
			acc.totalCount += Number(bundle.quantity);
			acc.totalProfit += Number(bundle.value) - Number(bundle.cost);
			return acc;
		},
		{ totalValue: 0, totalProfit: 0, totalCost: 0, totalCount: 0 }
	);
}

export async function GET(request: Request) {
	const userEmail = request.headers.get("X-User-Email");
	try {
		if (!userEmail)
			throw new Error("User email is missing in the headers.");

		const resp = await fetch("http://localhost:3000/api/bundles", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"X-User-Email": userEmail,
			},
		});
		const bundles = await resp.json();
		const stats = calculateStats(bundles);

		return NextResponse.json(stats);
	} catch (error) {
		return NextResponse.json({ error: error });
	}
}
