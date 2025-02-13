'use client'

import { Button } from "@/components/ui/shadcn/button";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('home')

  return <div className="text-4xl font-bold">
    Home
    </div>
}
