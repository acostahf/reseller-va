"use client";
import React, {
	createContext,
	use,
	useContext,
	useEffect,
	useState,
} from "react";

export const AppContext = createContext(null);

export default function AppContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [bundles, setBundles] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [stats, setStats] = useState({});

	const fetchBundles = async () => {
		const res = await fetch("/api/bundles", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		setBundles(data);
		if (data.error) {
			throw new Error(data.error);
		} else {
			console.log(data);
		}
	};

	const fetchStats = async () => {
		const res = await fetch("/api/stats", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		setStats(data);
		if (data.error) {
			throw new Error(data.error);
		} else {
			console.log(data);
		}
	};

	useEffect(() => {
		fetchBundles();
		fetchStats();
	}, []);

	return (
		<AppContext.Provider
			value={{
				bundles: bundles,
				stats: stats,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export const useAppContext = () => {
	const context = useContext(AppContext);

	if (!context) {
		throw new Error(
			"useAppContext must be used within AppContextProvider"
		);
	}
	return context;
};
