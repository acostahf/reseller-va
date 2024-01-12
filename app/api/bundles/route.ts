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
import { Bundles } from "@/types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const firestore = getFirestore(app);

export async function GET() {
	const session = await getServerSession(authOptions);
	const user = session?.user;

	try {
		const bundles: Bundles = [];
		const bundlesQuery = query(
			collection(firestore, "users", user?.email as string, "bundles"),
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
		return NextResponse.json(bundles);
	} catch (error) {
		return NextResponse.json({ error: error });
	}
}

export async function POST(request: Request) {
	const session = await getServerSession(authOptions);
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
		); // separate collection for products
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

		// Commit the batch
		await batch.commit();

		// Successfully added the documents, send the response with the deal document ID
		return NextResponse.json({ id: dealRef.id, ...data });
	} catch (error) {
		console.error("Error adding document: ", error);
		// An error occurred while adding the document, send an error response
		return NextResponse.json({ error: error.message });
	}
}
