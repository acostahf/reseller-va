import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import app from "../../../../firebase";

const db = getFirestore(app);

export const authOptions: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async signIn({ user }) {
			console.log("signIn===", user);
			const userRef = doc(db, "users", user.email);
			try {
				await setDoc(
					userRef,
					{
						name: user.name,
						email: user.email,
						image: user.image,
					},
					{ merge: true }
				);
				return true;
			} catch (error) {
				console.error("Error saving user to Firestore:", error);
				return false;
			}
		},
		async session({ session }) {
			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
