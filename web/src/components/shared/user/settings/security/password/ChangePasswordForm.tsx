"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/shadcn/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/Form";
import { Input } from "@/components/ui/shadcn/Input";
import { FormWrapper } from "@/components/ui/items/FormWrapper";
import {
  changePasswordSchema,
  ChangePasswordFormData,
} from "@/schemas/dashboard/security/change-password.schema";
import { useChangePasswordMutation } from "@/graphql/generated/output";

export function ChangePasswordForm() {
  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const [changePassword, { loading: isLoading }] = useChangePasswordMutation({
    onCompleted() {
      toast.success("Password changed successfully");
      form.reset();
    },
    onError(error) {
      toast.error(`Error changing password: ${error.message}`);
    },
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    changePassword({
      variables: {
        data: {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
      },
    });
  };

  return (
    <FormWrapper
      heading="Change Password"
      id="change-password"
      description="Update your account password. Please use a strong password."
    >
      <Form {...form}>
        <form
          className="p-6 pb-0 pt-0 space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your current password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Changing Password..." : "Change Password"}
          </Button>
          <FormDescription>
            Password must be at least 8 characters long. Use a combination of
            letters, numbers, and special characters for better security.
          </FormDescription>
        </form>
      </Form>
    </FormWrapper>
  );
}
