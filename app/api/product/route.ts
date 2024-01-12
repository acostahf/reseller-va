import { getFirestore, getDoc, doc } from "firebase/firestore";
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
