import Graph from "@/components/graph";
import { title } from "@/components/primitives";
import AddFinds from "@/components/sections/addFinds";
import Inventory from "@/components/sections/inventory";

export default function DashboardPage() {
	return (
		<div className="flex flex-col gap-4 w-full justify-center items-center">
			<Graph />
			<Inventory />
			<AddFinds />
		</div>
	);
}
