import { create } from "zustand";

interface AppStore {
	bundles: any;
	stats: any;
	user: any;
	setBundles: (bundles: any) => void;
	setStats: (stats: any) => void;
	setUser: (user: any) => void;
	isLoading: boolean;
}

const useAppStore = create<AppStore>((set) => ({
	bundles: [],
	stats: [],
	user: {},
	isLoading: false,
	setBundles: (bundles) => set({ bundles }),
	setStats: (stats) => set({ stats }),
	setUser: (user) => set({ user }),
}));

export default useAppStore;
