import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthStorage } from "./auth.types";

export const authStorage = create(persist<AuthStorage>((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated: isAuthenticated }),
}), {
    name: "auth",
    storage: createJSONStorage(() => localStorage),
}));