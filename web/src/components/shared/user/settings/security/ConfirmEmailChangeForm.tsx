"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/Form";
import { Input } from "@/components/ui/shadcn/Input";
import { Button } from "@/components/ui/shadcn/Button";
import { FormWrapper } from "@/components/ui/items/FormWrapper";
import {
  confirmChangedEmailSchema,
  ConfirmChangedEmailFormData,
} from "@/schemas/dashboard/security/change-emai.schema";
import { useConfirmChangedEmailMutation } from "@/graphql/generated/output";

export function ConfirmEmailChangeForm() {
  const router = useRouter();
  const params = useParams<{ token: string }>();

  const token = params.token;

  console.log(params.token);

  const form = useForm<ConfirmChangedEmailFormData>({
    resolver: zodResolver(confirmChangedEmailSchema),
    values: {
      token: token,
      newEmail: "",
    },
  });

  const { isValid } = form.formState;

  const [confirmEmailChange, { loading }] = useConfirmChangedEmailMutation({
    onCompleted() {
      toast.success("Please check your new email for final confirmation");
      router.push("/dashboard/settings");
    },
    onError(error) {
      toast.error(`Error confirming email change: ${error.message}`);
    },
  });

  const onSubmit = (data: ConfirmChangedEmailFormData) => {
    confirmEmailChange({
      variables: {
        data: {
          token: data.token,
          newEmail: data.newEmail,
        },
      },
    });
  };

  return (
    <FormWrapper
      heading="Confirm Email Change"
      id="confirm-email-change"
      description="Enter your new email address to continue the change process."
      alwaysOpen={true}
    >
      <Form {...form}>
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/settings")}
          className="mb-4 w-1/6"
        >
          Back to Dashboard
        </Button>
        <FormField
          control={form.control}
          name="newEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Email Address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your new email"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={loading || !isValid}
          onClick={() => onSubmit(form.getValues())}
          className="mt-4 w-1/6"
        >
          {loading ? "Confirming..." : "Confirm Email Change"}
        </Button>
      </Form>
    </FormWrapper>
  );
}
