import About from "@/components/sections/about";
import Hero from "@/components/sections/hero";

const home = async () => {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<Hero title="All-in-One Tool for Resellers" />
			<About title="The ultimate reseller's toolkit, from initial pickup to final sale. Monitor your expenditures, earnings, investments, receipts, eBay comparisons, and more - with additional features on the way!" />
		</section>
	);
};

export default home;
