export interface AccordionState {
    openAccordions: string[];
    setOpenAccordions: (accordions: string[]) => void;
    toggleAccordion: (id: string) => void;
    openAccordion: (id: string) => void;
    closeAccordion: (id: string) => void;
}