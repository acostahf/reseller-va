import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
} from "firebase/firestore";
import { NextResponse } from "next/server";
import app from "../../../firebase";
import { Products } from "@/types";

const firestore = getFirestore(app);

export async function GET() {
	try {
		const products: Products = [];
		const querySnapshot = await getDocs(collection(firestore, "products"));
		querySnapshot.forEach((doc) => {
			const data = doc.data();
			products.push({
				id: doc.id,
				name: data.name,
				price: data.price,
				description: data.description,
				image: data.image,
			});
		});
		return NextResponse.json(products);
	} catch (error) {
		return NextResponse.json({ error: error });
	}
}

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
