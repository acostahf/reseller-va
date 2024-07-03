"use client";
import { useCallback, useEffect, useState } from "react";
import { Slider } from "@nextui-org/slider";
import { Input, Switch } from "@nextui-org/react";

export default function CalculatorPage() {
	const [profit, setProfit] = useState(0);
	const [maxCost, setMaxCost] = useState(0);
	const [shipping, setShipping] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [soldPrice, setSoldPrice] = useState(0);
	const [ebayFees, setEbayFees] = useState(0.13);
	const [tax, setTax] = useState(0.0875);
	const [promotedFees, setPromotedFees] = useState(0.1);
	const [userRate, setUserRate] = useState(0.3);
	const [coverShipping, setCoverShipping] = useState(false);

	const calculateProfit = useCallback(() => {
		let fees = 0;
		fees = ebayFees + tax + promotedFees;
		const finalPrice = soldPrice - (soldPrice * fees + shipping);
		const totalCost = finalPrice * userRate;

		setProfit(Math.round(finalPrice));
		setMaxCost(Math.round(totalCost));
	}, [soldPrice, ebayFees, tax, promotedFees, shipping, userRate]);

	const handleSoldPriceChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const value = parseInt(event.target.value);
		setSoldPrice(value);
	};

	const handleUserRateChange = (value: number) => {
		setUserRate(value);
	};

	useEffect(() => {
		calculateProfit();
	}, [
		soldPrice,
		ebayFees,
		tax,
		promotedFees,
		shipping,
		userRate,
		coverShipping,
		quantity,
		profit,
		maxCost,
		calculateProfit,
	]);

	return (
		<div className="flex flex-col gap-4 w-full justify-center items-center">
			<div>
				<h1>Final Profit: {profit}</h1>
				<h1>Max Buy Cost: {maxCost}</h1>
			</div>

			{/* slider buy percent */}
			<Slider
				label="Select a value"
				showTooltip={true}
				step={0.05}
				formatOptions={{ style: "percent" }}
				maxValue={1}
				minValue={0}
				marks={[
					{
						value: 0.2,
						label: "20%",
					},
					{
						value: 0.5,
						label: "50%",
					},
					{
						value: 0.8,
						label: "80%",
					},
				]}
				defaultValue={userRate}
				onChange={(value) => handleUserRateChange(value as number)}
				className="max-w-md"
			/>

			{/* additional fee details */}
			<div></div>

			{/* items view box */}
			<div></div>

			<Switch
				color="secondary"
				checked={coverShipping}
				onChange={() => setCoverShipping(!coverShipping)}
			>
				You pay shipping
			</Switch>

			{coverShipping ? (
				<Input
					className="mt-4"
					type="number"
					label="Shipping"
					placeholder="0.00"
					labelPlacement="outside"
					startContent={
						<div className="pointer-events-none flex items-center">
							<span className="text-default-400 text-small">$</span>
						</div>
					}
				/>
			) : null}

			<Input
				className="mt-4"
				type="number"
				label="Quantity"
				placeholder={quantity.toString()}
				labelPlacement="outside"
				// startContent={
				// 	<div className="pointer-events-none flex items-center">
				// 		<span className="text-default-400 text-small">$</span>
				// 	</div>
				// }
				onChange={(value) => setQuantity(value)}
			/>

			<Input
				className="mt-4"
				type="number"
				label="Sold Price"
				placeholder="0.00"
				labelPlacement="outside"
				startContent={
					<div className="pointer-events-none flex items-center">
						<span className="text-default-400 text-small">$</span>
					</div>
				}
				onChange={(value) => handleSoldPriceChange(value)}
			/>

			{/* Buttons */}
			<div></div>
		</div>
	);
}
