import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { SidebarStore } from './sidebar.types'

export const sidebarStore = create(
    persist<SidebarStore>(
        set => ({
            isCollapsed: false,
            setIsCollapsed: (value: boolean) => set({ isCollapsed: value })
        }),
        {
            name: 'sidebar',
            storage: createJSONStorage(() => localStorage)
        }
    )
)
