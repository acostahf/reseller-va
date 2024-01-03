import {
	getFirestore,
	collection,
	addDoc,
	writeBatch,
	doc,
	getDocs,
} from "firebase/firestore";
import { NextResponse } from "next/server";
import app from "../../../firebase";
import { Bundles } from "@/types";

const firestore = getFirestore(app);

export async function GET() {
	try {
		const bundles: Bundles = [];
		const querySnapshot = await getDocs(collection(firestore, "bundles"));
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
				createdAt: data.createAt,
			});
		});
		return NextResponse.json(bundles);
	} catch (error) {
		return NextResponse.json({ error: error });
	}
}

export async function POST(request: Request) {
	try {
		const data = await request.json();
		console.log("Adding a new document...", data);

		// Start a batch
		const batch = writeBatch(firestore);

		// Add the deal document
		const dealRef = doc(collection(firestore, "bundles"));
		batch.set(dealRef, data);

		// Create products based on the quantity and add them to the batch
		// const productCollectionRef = collection(dealRef, "products"); // subcollection under each deal
		const productCollectionRef = collection(firestore, "products"); // separate collection for products
		for (let i = 0; i < data.quantity; i++) {
			const productRef = doc(productCollectionRef);
			const cost = data.cost / data.quantity;
			const value = data.value / data.quantity;
			batch.set(productRef, {
				// Define the product data structure here
				dealId: dealRef,
				title: "Item " + (i + 1).toString(),
				cost: cost,
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
