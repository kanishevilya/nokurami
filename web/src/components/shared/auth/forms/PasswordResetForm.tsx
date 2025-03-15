"use client";
import { Button } from "@/components/ui/shadcn/Button";

import { FormDescription } from "@/components/ui/shadcn/Form";

import { FormControl } from "@/components/ui/shadcn/Form";

import { FormLabel } from "@/components/ui/shadcn/Form";

import { FormField, FormItem } from "@/components/ui/shadcn/Form";

import { AuthWrapper } from "../AuthWrapper";

import { Form } from "@/components/ui/shadcn/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  TypeResetPasswordSchema,
  resetPasswordSchema,
} from "@/schemas/auth/password-reset.schema";
import { Input } from "@/components/ui/shadcn/Input";
import { usePasswordResetMutation } from "@/graphql/generated/output";
import { toast } from "sonner";
import { useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/shadcn/Alert";
import { CircleCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export function PasswordResetForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const t = useTranslations("auth");

  const form = useForm<TypeResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const [passwordReset, { loading }] = usePasswordResetMutation({
    onCompleted(data) {
      setIsSuccess(true);
      toast.success(t("passwordResetLinkSent"));
    },
    onError() {
      toast.error(t("passwordResetError"));
    },
  });

  const { isValid } = form.formState;

  function onSubmit(data: TypeResetPasswordSchema) {
    passwordReset({ variables: { data } });
  }

  return (
    <AuthWrapper
      heading={t("resetPassword")}
      backButtonLabel={t("backToLogin")}
      backButtonHref="/account/login"
    >
      {isSuccess ? (
        <Alert>
          <CircleCheck className="h-4 w-4" />
          <AlertTitle>{t("linkSent")}</AlertTitle>
          <AlertDescription>{t("passwordResetLinkSent")}</AlertDescription>
        </Alert>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("emailPlaceholder")}
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{t("emailDescription")}</FormDescription>
                </FormItem>
              )}
            />
            <Button className="w-full mt-4" disabled={!isValid || loading}>
              {t("resetPassword")}
            </Button>
          </form>
        </Form>
      )}
    </AuthWrapper>
  );
}
