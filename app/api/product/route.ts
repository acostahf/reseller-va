import { getFirestore, getDoc, doc, updateDoc } from "firebase/firestore";
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
