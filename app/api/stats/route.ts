import { getFirestore, collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";
import app from "../../../firebase";
import { Bundles } from "@/types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const firestore = getFirestore(app);

export async function GET() {
	try {
		const session = await getServerSession(authOptions);
		const user = session?.user;

		let stats = {
			totalValue: 0,
			totalProfit: 0,
			totalCost: 0,
			totalCount: 0,
		};

		const bundles: Bundles = [];
		const querySnapshot = await getDocs(
			collection(firestore, "users", user?.email as string, "bundles")
		);
		querySnapshot.forEach((doc) => {
			const data = doc.data();
			bundles.push({
				id: doc.id,
				title: data?.title,
				cost: data?.cost,
				value: data?.value,
				geoLocation: data?.geoLoaction,
				quantity: data?.quantity,
				receipt: data?.recipt,
				createdAt: data?.createAt,
				ebayLink: data?.ebayLink,
			});
		});
		//TODO: Fix data types
		bundles.forEach((bundle, i) => {
			stats.totalValue += bundle.value - 0;
			stats.totalCost += bundle.cost - 0;
			stats.totalCount += bundle.quantity - 0;
			stats.totalProfit += bundle.value - bundle.cost;
		});
		return NextResponse.json(stats);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ apiError: error });
	}
}
