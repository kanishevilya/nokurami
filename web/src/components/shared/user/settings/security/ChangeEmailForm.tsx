"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/shadcn/Button";
import { FormWrapper } from "@/components/ui/items/FormWrapper";
import { useRequestToEmailChangeMutation } from "@/graphql/generated/output";
import { useCurrent } from "@/hooks/useCurrent";

export function ChangeEmailForm() {
  const { user } = useCurrent();
  const [isRequesting, setIsRequesting] = useState(false);

  const [requestEmailChange] = useRequestToEmailChangeMutation({
    onCompleted() {
      toast.success(
        "Please check your current email for confirmation instructions"
      );
      setIsRequesting(false);
    },
    onError(error) {
      toast.error(`Error initiating email change: ${error.message}`);
      setIsRequesting(false);
    },
  });

  const handleEmailChangeRequest = async () => {
    setIsRequesting(true);
    await requestEmailChange();
  };

  return (
    <FormWrapper
      heading="Email Address"
      id="email-change"
      description="Change your email address. This will require verification of both your current and new email."
    >
      <div className="p-6 space-y-4">
        <div className="flex flex-col space-y-2">
          <span className="text-sm font-medium">Current Email</span>
          <span className="text-sm text-muted-foreground">{user?.email}</span>
        </div>
        <Button onClick={handleEmailChangeRequest} disabled={isRequesting}>
          {isRequesting ? "Sending verification..." : "Change Email"}
        </Button>
      </div>
    </FormWrapper>
  );
}
