import Hero from "@/components/sections/hero";
import { getServerSession } from "next-auth/next";

const home = async () => {
	const session = await getServerSession();
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<Hero title="All-in-One Tool for Resellers" />
		</section>
	);
};

export default home;
