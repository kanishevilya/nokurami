"use client";

import { useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useChangeEmailMutation } from "@/graphql/generated/output";
import { FormWrapper } from "@/components/ui/items/FormWrapper";
import { Button } from "@/components/ui/shadcn/Button";

export function FinalizeEmailChangeForm() {
  const router = useRouter();
  const params = useParams<{ token: string }>();

  const token = params.token;

  const [changeEmail, { loading }] = useChangeEmailMutation({
    onCompleted() {
      toast.success("Email changed successfully");
      router.push("/account/security");
    },
    onError(error) {
      toast.error(`Error changing email: ${error.message}`);
    },
  });

  const handleConfirm = async () => {
    if (!token) {
      toast.error("Invalid token");
      return;
    }

    await changeEmail({
      variables: {
        data: {
          token,
        },
      },
    });
  };

  useEffect(() => {
    if (!token) {
      toast.error("Invalid token");
      router.push("/account/security");
    }
  }, [token, router]);

  return (
    <FormWrapper
      heading="Finalize Email Change"
      id="finalize-email-change"
      description="Click confirm to complete your email change process."
      alwaysOpen={true}
    >
      <div className="p-6 space-y-4">
        <Button onClick={handleConfirm} disabled={loading || !token}>
          {loading ? "Finalizing..." : "Confirm Email Change"}
        </Button>
      </div>
    </FormWrapper>
  );
}
