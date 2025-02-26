import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TabsState } from "./tabs.types";

export const tabsStore = create<TabsState>()(
    persist(
        (set) => ({
            settingsTab: "profile",
            setSettingsTab: (tab) => set({ settingsTab: tab }),
        }),
        {
            name: "tabs-storage",
        }
    )
);