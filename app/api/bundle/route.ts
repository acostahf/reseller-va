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
import { authOptions } from "../auth/[...nextauth]/route";

const db = getFirestore(app);

export async function GET(request: Request) {
	const session = await getServerSession(authOptions);
	const user = session?.user;
	const url = new URL(request.url);
	const bundleId = url.searchParams.get("id");
	const docRef = doc(
		db,
		"users",
		user?.email as string,
		"bundles",
		bundleId as string
	);
	try {
		// Get the bundle
		const querySnapshot = await getDoc(docRef);
		const bundleData = querySnapshot.data();

		// Get the products for this bundle
		const productsRef = collection(
			db,
			"users",
			user?.email as string,
			"products"
		);
		const productsQuery = query(
			productsRef,
			where("dealId", "==", docRef)
		);
		const productsSnapshot = await getDocs(productsQuery);
		let products = productsSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		return NextResponse.json({ bundle: bundleData, products: products });
	} catch (error) {
		return NextResponse.json({ error: error });
	}
}
