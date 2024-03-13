import BgWrapper from "@/components/wrappers/BgWrapper";

export default function DocsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
			<div className="flex text-center justify-center w-full">
				{children}
			</div>
		</section>
	);
}
