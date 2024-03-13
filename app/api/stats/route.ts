import { getFirestore, collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";
import app from "../../../firebase";
import { Bundles, Bundle } from "@/types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const firestore = getFirestore(app);

async function fetchBundles(userEmail: string): Promise<Bundles> {
	const querySnapshot = await getDocs(
		collection(firestore, "users", userEmail, "bundles")
	);
	return querySnapshot.docs.map((doc) => ({
		...(doc.data() as Bundle),
	})) as Bundles;
}

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
	try {
		const session = await getServerSession(authOptions);
		const userEmail = session?.user?.email;
		if (!userEmail)
			throw new Error("User session is not valid or missing email.");

		const bundles = await fetchBundles(userEmail);
		const stats = calculateStats(bundles);

		return NextResponse.json(stats);
	} catch (error: any) {
		console.error(error);
		return NextResponse.json({ error: error.message });
	}
}
