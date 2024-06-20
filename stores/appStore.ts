import { create } from "zustand";

interface AppStore {
	bundles: any;
	stats: {
		totalValue: number;
		totalProfit: number;
		totalCost: number;
		totalCount: number;
	};
	user: any;
	setBundles: (bundles: any) => void;
	setStats: (stats: any) => void;
	setUser: (user: any) => void;
	isLoading: boolean;
}

const useAppStore = create<AppStore>((set) => ({
	bundles: [],
	stats: {
		totalValue: 0,
		totalProfit: 0,
		totalCost: 0,
		totalCount: 0,
	},

	user: {},
	isLoading: false,
	setBundles: (bundles) => set({ bundles }),
	setStats: (stats) => set({ stats }),
	setUser: (user) => set({ user }),
}));

export default useAppStore;
