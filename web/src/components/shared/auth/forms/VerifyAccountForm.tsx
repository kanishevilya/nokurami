"use client";

import { useVerifyAccountMutation } from "@/graphql/generated/output";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { AuthWrapper } from "../AuthWrapper";
import { Loader } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";

export function VerifyAccountForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { authenticate } = useAuth();
  const t = useTranslations("auth");
  const errorsT = useTranslations("errors");

  const token = searchParams.get("token") ?? "";

  const [verifyAccount] = useVerifyAccountMutation({
    onCompleted() {
      authenticate();
      router.push("/dashboard/settings");
    },
    onError() {
      toast.error(errorsT("verificationFailed"));
    },
  });

  useEffect(() => {
    verifyAccount({ variables: { data: { token } } });
  }, [token, verifyAccount]);

  return (
    <AuthWrapper heading={t("verifyAccount")}>
      <div className="flex justify-center items-center">
        <Loader className="size-8 animate-spin" />
      </div>
    </AuthWrapper>
  );
}
