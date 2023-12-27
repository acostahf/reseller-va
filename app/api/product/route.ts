import { getFirestore, getDoc, doc } from "firebase/firestore";
import { NextResponse } from "next/server";
import app from "../../../firebase";
import { Product } from "@/types";

const db = getFirestore(app);

export async function GET(request: Request) {
	const url = new URL(request.url);
	const id = url.searchParams.get("id");
	const docRef = doc(db, "products", id as string);
	try {
		const querySnapshot = await getDoc(docRef);
		const data = querySnapshot.data();
		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json({ error: error });
	}
}
