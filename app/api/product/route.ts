import {
	getFirestore,
	getDoc,
	doc,
	updateDoc,
	deleteDoc,
	collection,
} from "firebase/firestore";
import { NextResponse } from "next/server";
import app from "../../../firebase";

const db = getFirestore(app);

export async function GET(request: Request) {
	const url = new URL(request.url);
	const id = url.searchParams.get("id");
	const userEmail = request.headers.get("X-User-Email");

	const docRef = doc(
		db,
		"users",
		userEmail as string,
		"products",
		id as string
	);
	try {
		const querySnapshot = await getDoc(docRef);
		const data = querySnapshot.data();
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ error: error });
	}
}

export async function PUT(request: Request) {
	try {
		const data = await request.json();
		const userEmail = data.userEmail;

		// Ensure that the user is authenticated
		if (!userEmail) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { title, ebayLink, aiTitle, aiDescription } = data;
		const url = new URL(request.url);
		const id = url.searchParams.get("id");

		const docRef = doc(
			db,
			"users",
			userEmail as string,
			"products",
			id as string
		);

		// Update the document with the new data if it
		console.log("Updating document...", data);
		await updateDoc(docRef, data);

		return NextResponse.json({ message: "Document updated successfully" });
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 });
	}
}

export async function DELETE(request: Request) {
	const data = await request.json();
	const userEmail = data.userEmail;

	// Ensure that the user is authenticated
	if (!userEmail) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const url = new URL(request.url);
		const id = url.searchParams.get("id");
		const bId = url.searchParams.get("bId");

		const docRef = doc(
			db,
			"users",
			userEmail as string,
			"products",
			id as string
		);

		await deleteDoc(docRef);

		// Update bundle total cost, value, and quantity
		const dealRef = doc(
			collection(
				db,
				"users",
				userEmail as string,
				"bundles",
				bId as string
			)
		);
		const bundleDoc = await getDoc(dealRef);
		const bundleData = bundleDoc.data();
		console.log("Bundle data:", bundleData);
		// const newTotalCost = bundleData.totalCost - bundleData.cost;
		// const newTotalValue = bundleData.totalValue - bundleData.value;
		// const newTotalQuantity = bundleData.totalCount - 1;

		return NextResponse.json({ message: "Document deleted successfully" });
	} catch (error) {
		console.log("Error:", error);
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
