"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/shadcn/Button";
import { FormWrapper } from "@/components/ui/items/FormWrapper";
import { CreateStreamKeyDialog } from "./CreateStreamKeyDialog";
import { StreamKeysList, StreamKeysSkeleton } from "./StreamKeysList";

export function StreamKeysSettings() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const t = useTranslations("profile");

  return (
    <FormWrapper
      heading={t("streamKeys")}
      id="stream-keys"
      description={t("streamKeysDescription")}
      alwaysOpen={true}
    >
      <div className="p-6 pb-0 space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-0.5">
            <h3 className="text-base font-medium">{t("streamKeys")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("generateStreamKeysDescription")}
            </p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            {t("generateStreamKey")}
          </Button>
        </div>

        <StreamKeysList />

        <CreateStreamKeyDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      </div>
    </FormWrapper>
  );
}
