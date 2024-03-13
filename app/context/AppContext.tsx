"use client";
import { AppContextType, Stats } from "@/types";
import React, {
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

export const AppContext = createContext<AppContextType | null>(null);

export default function AppContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [bundles, setBundles] = useState([]);
	const [stats, setStats] = useState({} as Stats);
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState(null);

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
	const fetchUser = async () => {
		const res = await fetch("/api/user", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		setUser(data);
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

	const refreshData = async () => {
		try {
			setIsLoading(true);
			await fetchBundles();
			await fetchStats();
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		try {
			fetchUser();
			fetchBundles();
			fetchStats();
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return (
		<AppContext.Provider
			value={{
				bundles: bundles,
				stats: stats,
				refreshData: refreshData,
				isLoading: isLoading,
				user: user,
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
