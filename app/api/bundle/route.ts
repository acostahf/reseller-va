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

const db = getFirestore(app);

export async function GET(request: Request) {
	const url = new URL(request.url);
	const bundleId = url.searchParams.get("id");
	const docRef = doc(db, "bundles", bundleId as string);
	try {
		// Get the bundle
		const querySnapshot = await getDoc(docRef);
		const bundleData = querySnapshot.data();

		// Get the products for this bundle
		const productsRef = collection(db, "products");
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
