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
import { getServerSession } from "next-auth/next";

const db = getFirestore(app);

export async function GET(request: Request) {
	const session = await getServerSession();
	const user = session?.user;

	const url = new URL(request.url);
	const id = url.searchParams.get("id");
	const docRef = doc(
		db,
		"users",
		user?.email as string,
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
	const session = await getServerSession();
	const user = session?.user;

	// Ensure that the user is authenticated
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const data = await request.json();
		const { title, ebayLink, aiTitle, aiDescription } = data;
		const url = new URL(request.url);
		const id = url.searchParams.get("id");

		const docRef = doc(
			db,
			"users",
			user.email as string,
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
	const session = await getServerSession();
	const user = session?.user;

	// Ensure that the user is authenticated
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const url = new URL(request.url);
		const id = url.searchParams.get("id");
		const bId = url.searchParams.get("bId");

		const docRef = doc(
			db,
			"users",
			user.email as string,
			"products",
			id as string
		);

		await deleteDoc(docRef);

		// Update bundle total cost, value, and quantity
		const dealRef = doc(
			collection(
				db,
				"users",
				user?.email as string,
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
