"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/shadcn/Button";
import { FormWrapper } from "@/components/ui/items/FormWrapper";
import { useRequestToEmailChangeMutation } from "@/graphql/generated/output";
import { useCurrent } from "@/hooks/useCurrent";
import { useTranslations } from "next-intl";

export function ChangeEmailForm() {
  const { user } = useCurrent();
  const [isRequesting, setIsRequesting] = useState(false);
  const t = useTranslations("settings");

  const [requestEmailChange] = useRequestToEmailChangeMutation({
    onCompleted() {
      toast.success(t("emailChangeRequestSent"));
      setIsRequesting(false);
    },
    onError(error) {
      toast.error(`${t("emailChangeRequestError")}: ${error.message}`);
      setIsRequesting(false);
    },
  });

  const handleEmailChangeRequest = async () => {
    setIsRequesting(true);
    await requestEmailChange();
  };

  return (
    <FormWrapper
      heading={t("emailAddress")}
      id="email-change"
      description={t("emailChangeDescription")}
    >
      <div className="p-6 pb-0 space-y-4">
        <div className="flex flex-col space-y-2">
          <span className="text-lg font-medium">{t("currentEmail")}: </span>
          <span className="text-sm text-muted-foreground">{user?.email}</span>
        </div>
        <Button onClick={handleEmailChangeRequest} disabled={isRequesting}>
          {isRequesting ? t("sendingVerification") : t("changeEmail")}
        </Button>
      </div>
    </FormWrapper>
  );
}
