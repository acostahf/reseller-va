import {
	getFirestore,
	collection,
	addDoc,
	writeBatch,
	doc,
	getDocs,
	orderBy,
	query,
} from "firebase/firestore";
import { NextResponse } from "next/server";
import app from "../../../firebase";
import { Bundles, Bundle } from "@/types";
import { getServerSession } from "next-auth/next";

const firestore = getFirestore(app);

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
		const bundles: Bundles = [];
		const bundlesQuery = query(
			collection(firestore, "users", userEmail as string, "bundles"),
			orderBy("createAt", "desc") // This orders the bundles by creation date, newest first
		);

		const querySnapshot = await getDocs(bundlesQuery);

		querySnapshot.forEach((doc) => {
			const data = doc.data();
			bundles.push({
				id: doc.id,
				title: data.title,
				cost: data.cost,
				value: data.value,
				geoLocation: data.geoLoaction,
				quantity: data.quantity,
				receipt: data.recipt,
				ebayLink: data.ebayLink,
				createdAt: data.createAt,
			});
		});
		const stats = calculateStats(bundles);

		return NextResponse.json({ bundles, stats });
	} catch (error) {
		return NextResponse.json({ error: error });
	}
}

export async function POST(request: Request) {
	const session = await getServerSession();
	const user = session?.user;
	try {
		const data = await request.json();
		console.log("Adding a new document...", data);

		// Start a batch
		const batch = writeBatch(firestore);

		// Add the deal document
		const dealRef = doc(
			collection(firestore, "users", user?.email as string, "bundles")
		);
		batch.set(dealRef, data);

		// Create products based on the quantity and add them to the batch
		// const productCollectionRef = collection(dealRef, "products"); // subcollection under each deal
		const productCollectionRef = collection(
			firestore,
			"users",
			user?.email as string,
			"products"
		);
		//if only one item then set the name and ebay link to the first item
		if (data.quantity === "1") {
			const productRef = doc(productCollectionRef);
			const cost = data.cost / data.quantity;
			const value = data.value / data.quantity;
			batch.set(productRef, {
				dealId: dealRef,
				title: data.title,
				cost: cost,
				ebayLink: data.ebayLink,
				geoLoaction: data.geoLoaction,
				createAt: data.createAt,
				value: value,
				recipt: data.recipt,
			});
		} else {
			for (let i = 0; i < data.quantity; i++) {
				const productRef = doc(productCollectionRef);
				const cost = data.cost / data.quantity;
				const value = data.value / data.quantity;
				batch.set(productRef, {
					// Define the product data structure here
					dealId: dealRef,
					title: "Item " + (i + 1).toString(),
					cost: cost,
					ebayLink: data.ebayLink,
					geoLoaction: data.geoLoaction,
					createAt: data.createAt,
					value: value,
					recipt: data.recipt,
				});
			}
		}

		// Commit the batch
		await batch.commit();

		// Successfully added the documents, send the response with the deal document ID
		return NextResponse.json({ id: dealRef.id, ...data });
	} catch (error) {
		console.error("Error adding document: ", error);
		// An error occurred while adding the document, send an error response
		return NextResponse.json({ error: `API error: ${error}` });
	}
}
