import { accordionStore } from '@/storage/accordion/accordion.storage';
import { useCallback } from 'react';

export function useAccordion(id: string) {
    let isOpen = accordionStore((state) => state.openAccordions.includes(id));
    const toggleAccordion = accordionStore((state) => state.toggleAccordion);
    const openAccordion = accordionStore((state) => state.openAccordion);
    const closeAccordion = accordionStore((state) => state.closeAccordion);

    const toggle = (isOpen?: Boolean) => {

        toggleAccordion(id)
        if (isOpen !== undefined) {
            return !isOpen
        }
    };
    const open = () => openAccordion(id);
    const close = () => closeAccordion(id);


    return {
        isOpen,
        toggle,
        open,
        close,
    };
}

export function useClearAccordions() {

    const setOpenItems = accordionStore((state) => state.setOpenAccordions);

    const clearAccordions = useCallback(() => {
        setOpenItems([]);
    }, [setOpenItems]);

    return { clearAccordions };
}
