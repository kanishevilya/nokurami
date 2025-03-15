
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { AccordionState } from './accordion.types';

export const accordionStore = create(
    persist<AccordionState>(
        (set) => ({
            openAccordions: [],
            setOpenAccordions: (accordions) => set({ openAccordions: accordions }),
            clearAccordions: () => set({ openAccordions: [] }),
            toggleAccordion: (id) =>
                set((state) => {
                    const isOpen = state.openAccordions.includes(id);
                    return {
                        openAccordions: isOpen
                            ? state.openAccordions.filter((accId) => accId !== id)
                            : [...state.openAccordions, id],
                    };
                }),
            openAccordion: (id) =>
                set((state) => {
                    if (!state.openAccordions.includes(id)) {
                        return { openAccordions: [...state.openAccordions, id] };
                    }
                    return state;
                }),
            closeAccordion: (id) =>
                set((state) => ({
                    openAccordions: state.openAccordions.filter((accId) => accId !== id),
                })),
        }),
        {
            name: 'accordion',
            storage: createJSONStorage(() => localStorage),
        }
    )
);