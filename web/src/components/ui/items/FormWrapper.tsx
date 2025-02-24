"use client";

import * as React from "react";
import { PropsWithChildren, useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../shadcn/Card";
import { cn } from "@/utils/cn";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "../shadcn/Accordion";
import { useAccordion } from "@/hooks/useAccordion";

interface FormWrapperProps {
  id: string;
  heading: string;
  description?: string;
  classNameHeader?: string;
  classNameCard?: string;
  classNameDescription?: string;
  defaultOpen?: boolean;
}

export function FormWrapper({
  id,
  children,
  heading,
  defaultOpen = false,
  description = "",
  classNameHeader = "",
  classNameCard = "",
  classNameDescription = "",
}: PropsWithChildren<FormWrapperProps>) {
  const { isOpen: zustandIsOpen, open, close } = useAccordion(id);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
    }
  }, [initialized, zustandIsOpen]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    const newIsOpen = !zustandIsOpen;

    if (newIsOpen) {
      open();
    } else {
      close();
    }
  };

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={zustandIsOpen ? id : undefined}
      value={zustandIsOpen ? id : undefined}
    >
      <AccordionItem value={id}>
        <Card>
          <AccordionTrigger onClick={handleToggle}>
            <CardHeader className="flex flex-row items-center">
              <CardTitle
                className={cn("text-2xl font-semibold pl-6", classNameHeader)}
              >
                {heading}
              </CardTitle>
              <CardDescription
                className={cn(
                  "pl-8 text-sm w-96 text-left",
                  classNameDescription
                )}
              >
                {description}
              </CardDescription>
            </CardHeader>
          </AccordionTrigger>
          <AccordionContent>
            <CardContent className={cn("", classNameCard)}>
              {children}
            </CardContent>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
}
