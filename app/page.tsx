import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { NextRequest } from "next/server";

export default async function Home(req: NextRequest): Promise<any> {
	const session = await getServerSession(authOptions);
	console.log(session);
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div>
				<h1>home</h1>
			</div>
			<div className="grid grid-cols-2 text-white p-4">
				<div>
					{session !== null ? (
						<h1 className="leading-loose text-lg font-extrabold text-accent">
							Hi {session?.user?.name}!
						</h1>
					) : (
						<a className="btn btn-primary" href="/api/auth/signin">
							Sign in
						</a>
					)}
				</div>
			</div>
		</section>
	);
}
