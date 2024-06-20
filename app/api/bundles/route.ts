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
	try {
		const data = await request.json();
		console.log("Adding a new document...", data);
		const dealData = data.dealData;
		const userEmail = data.userEmail;

		// Start a batch
		const batch = writeBatch(firestore);

		// Add the deal document
		const dealRef = doc(
			collection(firestore, "users", userEmail as string, "bundles")
		);
		batch.set(dealRef, dealData);

		// Create products based on the quantity and add them to the batch
		// const productCollectionRef = collection(dealRef, "products"); // subcollection under each deal
		const productCollectionRef = collection(
			firestore,
			"users",
			userEmail as string,
			"products"
		);
		//if only one item then set the name and ebay link to the first item
		if (dealData.quantity === "1") {
			const productRef = doc(productCollectionRef);
			const cost = dealData.cost / dealData.quantity;
			const value = dealData.value / dealData.quantity;
			batch.set(productRef, {
				dealId: dealRef,
				title: dealData.title,
				cost: cost,
				ebayLink: dealData.ebayLink,
				geoLoaction: dealData.geoLoaction,
				createAt: dealData.createAt,
				value: value,
				recipt: dealData.recipt,
			});
		} else {
			for (let i = 0; i < dealData.quantity; i++) {
				const productRef = doc(productCollectionRef);
				const cost = dealData.cost / dealData.quantity;
				const value = dealData.value / dealData.quantity;
				batch.set(productRef, {
					// Define the product dealData structure here
					dealId: dealRef,
					title: "Item " + (i + 1).toString(),
					cost: cost,
					ebayLink: dealData.ebayLink,
					geoLoaction: dealData.geoLoaction,
					createAt: dealData.createAt,
					value: value,
					recipt: dealData.recipt,
				});
			}
		}

		// Commit the batch
		await batch.commit();

		// Successfully added the documents, send the response with the deal document ID
		return NextResponse.json({ id: dealRef.id, ...dealData });
	} catch (error) {
		console.error("Error adding document: ", error);
		// An error occurred while adding the document, send an error response
		return NextResponse.json({ error: `API error: ${error}` });
	}
}
