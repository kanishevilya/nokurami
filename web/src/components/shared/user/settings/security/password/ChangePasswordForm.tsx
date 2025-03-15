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
import { useTranslations } from "next-intl";

export function ChangePasswordForm() {
  const t = useTranslations("settings");

  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const [changePassword, { loading: isLoading }] = useChangePasswordMutation({
    onCompleted() {
      toast.success(t("passwordChangedSuccess"));
      form.reset();
    },
    onError(error) {
      toast.error(`${t("error")}: ${error.message}`);
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
      heading={t("changePassword")}
      id="change-password"
      description={t("changePasswordDescription")}
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
                <FormLabel>{t("currentPassword")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("currentPasswordPlaceholder")}
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
                <FormLabel>{t("newPassword")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("newPasswordPlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? t("changingPassword") : t("changePassword")}
          </Button>
          <FormDescription>{t("passwordRequirements")}</FormDescription>
        </form>
      </Form>
    </FormWrapper>
  );
}
