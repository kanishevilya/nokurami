"use client";

import { useVerifyAccountMutation } from "@/graphql/generated/output";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { AuthWrapper } from "../AuthWrapper";
import { Loader } from "lucide-react";

export function VerifyAccountForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token") ?? "";

  const [verifyAccount] = useVerifyAccountMutation({
    onCompleted() {
      router.push("/dashboard/settings");
    },
    onError() {
      toast.error("Failed to verify account");
    },
  });

  useEffect(() => {
    verifyAccount({ variables: { data: { token } } });
  }, [token]);

  return (
    <AuthWrapper heading="Verify Account">
      <div className="flex justify-center items-center">
        <Loader className="size-8 animate-spin" />
      </div>
    </AuthWrapper>
  );
}
