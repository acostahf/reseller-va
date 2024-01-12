import { getFirestore, getDoc, doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import app from "../../../firebase";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const db = getFirestore(app);

export async function GET(request: Request) {
	const session = await getServerSession(authOptions);
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
	const session = await getServerSession(authOptions);
	const user = session?.user;

	// Ensure that the user is authenticated
	if (!user) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const url = new URL(request.url);
	const id = url.searchParams.get("id");
	const docRef = doc(
		db,
		"users",
		user.email as string,
		"products",
		id as string
	);

	try {
		const data = await request.json();
		const { title, ebayLink, aiTitle, aiDescription } = data;

		// Update the document with the new data
		await updateDoc(docRef, {
			title,
			ebayLink,
			aiTitle,
			aiDescription,
		});

		return NextResponse.json({ message: "Document updated successfully" });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
