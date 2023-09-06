import Graph from "@/components/graph";
import { title } from "@/components/primitives";
import AddFinds from "@/components/sections/addFinds";
import { Button } from "@nextui-org/button";
import NextLink from "next/link";

export default function DashboardPage() {
	return (
		<div className="flex flex-col gap-4 w-full justify-center items-center">
			<h1 className={title()}>Dashbaord</h1>
			<Graph />
			<AddFinds />
		</div>
	);
}
