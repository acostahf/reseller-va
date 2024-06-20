// import {
// 	getFirestore,
// 	getDoc,
// 	getDocs,
// 	doc,
// 	collection,
// 	where,
// 	query,
// } from "firebase/firestore";
// import { NextResponse } from "next/server";
// import app from "../../../firebase";
// import { clerkClient } from "@clerk/nextjs/server";

// const db = getFirestore(app);

// export async function GET(request: Request) {
// 	try {
// 		const res = await clerkClient.users.getUser();

// 		const user = res.data;

// 		const url = new URL(request.url);
// 		const bundleId = url.searchParams.get("id");
// 		const docRef = doc(
// 			db,
// 			"users",
// 			user?.user?.primaryEmailAddress?.emailAddress as string
// 		);
// 		// Get the bundle
// 		const querySnapshot = await getDoc(docRef);
// 		const userData = querySnapshot.data();

// 		return NextResponse.json({ user: userData });
// 	} catch (error) {
// 		return NextResponse.json({ error: error });
// 	}
// }
