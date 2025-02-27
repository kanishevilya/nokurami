"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/shadcn/Button";
import { FormWrapper } from "@/components/ui/items/FormWrapper";
import { CreateStreamKeyDialog } from "./CreateStreamKeyDialog";
import { StreamKeysList, StreamKeysSkeleton } from "./StreamKeysList";

export function StreamKeysSettings() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <FormWrapper
      heading="Stream Keys"
      id="stream-keys"
      description="Manage your stream keys for broadcasting."
      alwaysOpen={true}
    >
      <div className="p-6 pb-0 space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-0.5">
            <h3 className="text-base font-medium">Stream Keys</h3>
            <p className="text-sm text-muted-foreground">
              Generate stream keys.
            </p>
          </div>
          <Button onClick={() => setIsDialogOpen(true)}>
            Generate Stream Key
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
