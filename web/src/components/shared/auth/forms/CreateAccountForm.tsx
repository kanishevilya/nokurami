"use client";

import { AuthWrapper } from "../AuthWrapper";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  createAccountSchema,
  TypeCreateAccountSchema,
} from "@/schemas/auth/create-account.schema";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/shadcn/Form";
import { Input } from "@/components/ui/shadcn/Input";
import { Button } from "@/components/ui/shadcn/Button";
import { Form } from "@/components/ui/shadcn/Form";
import { useForm } from "react-hook-form";
import { useCreateUserMutation } from "@/graphql/generated/output";
import { toast } from "sonner";
import { useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/shadcn/Alert";
import { CircleCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export function CreateAccountForm() {
  const t = useTranslations("auth");
  const [success, setSuccess] = useState(false);

  const form = useForm<TypeCreateAccountSchema>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const [createUser, { loading }] = useCreateUserMutation({
    onCompleted() {
      setSuccess(true);
    },
    onError() {
      toast.error(t("registerError"));
    },
  });

  const { isValid } = form.formState;

  function onSubmit(data: TypeCreateAccountSchema) {
    createUser({
      variables: {
        data,
      },
    });
  }

  return (
    <AuthWrapper
      heading={t("registerTitle")}
      backButtonLabel={t("alreadyHaveAccount") + " " + t("login")}
      backButtonHref="/account/login"
    >
      {success ? (
        <Alert>
          <CircleCheck className="h-4 w-4" />
          <AlertTitle>{t("accountCreationSuccess")}</AlertTitle>
          <AlertDescription>{t("emailVerification")}</AlertDescription>
        </Alert>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("username")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("usernamePlaceholder")}
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{t("usernameDescription")}</FormDescription>
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("password")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("passwordPlaceholder")}
                      type="password"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{t("passwordDescription")}</FormDescription>
                </FormItem>
              )}
            />

            <Button className="w-full mt-4" disabled={!isValid || loading}>
              {t("registerButtonLabel")}
            </Button>
          </form>
        </Form>
      )}
    </AuthWrapper>
  );
}
