import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import app from "../../../../firebase"; // Ensure this path is correct

const db = getFirestore(app);

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async signIn({ user }: { user: any }) {
			// Here you're using Firestore to store/update the user data on each sign-in
			const userRef = doc(db, "users", user.email as string);
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
				return true; // Sign-in successful
			} catch (error) {
				console.error("Error saving user to Firestore:", error);
				return false; // Sign-in failed
			}
		},
		async session({ session }: { session: any }) {
			// You can modify the session object here if needed
			return session;
		},
	},
};

export default NextAuth(authOptions);
