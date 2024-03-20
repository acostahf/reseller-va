import {
	getFirestore,
	getDoc,
	getDocs,
	doc,
	collection,
	where,
	query,
} from "firebase/firestore";
import { NextResponse } from "next/server";
import app from "../../../firebase";
import { getServerSession } from "next-auth";

const db = getFirestore(app);

export async function GET(request: Request) {
	const session = await getServerSession();
	const user = session?.user;
	const url = new URL(request.url);
	const bundleId = url.searchParams.get("id");
	const docRef = doc(db, "users", user?.email as string);
	try {
		// Get the bundle
		const querySnapshot = await getDoc(docRef);
		const userData = querySnapshot.data();

		return NextResponse.json({ user: userData });
	} catch (error) {
		return NextResponse.json({ error: error });
	}
}
