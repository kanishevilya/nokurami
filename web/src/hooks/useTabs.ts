import { tabsStore } from "@/storage/tabs/tabs.storage";

export const useTabs = () => {
    const { settingsTab, setSettingsTab } = tabsStore();

    return {
        settingsTab,
        setSettingsTab,
    };
};