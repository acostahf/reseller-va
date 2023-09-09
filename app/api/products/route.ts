import { getFirestore, collection, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import app from "../../../firebase";

const firestore = getFirestore(app);

export async function POST(request: Request) {
	try {
		const data = await request.json();
		console.log("Adding a new document...", data);
		const docRef = await addDoc(collection(firestore, "products"), data);
		// Successfully added the document, send the response with the document ID
		return NextResponse.json({ id: docRef.id, ...data });
	} catch (error) {
		// An error occurred while adding the document, send an error response
		return NextResponse.json({ error: error });
	}
}
