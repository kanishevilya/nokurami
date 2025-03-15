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
import { loginSchema, TypeLoginSchema } from "@/schemas/auth/login.schema";
import { useLoginMutation } from "@/graphql/generated/output";
import { useRouter } from "next/navigation";
import { InputOTPGroup } from "@/components/ui/shadcn/InputOtp";
import { InputOTP, InputOTPSlot } from "@/components/ui/shadcn/InputOtp";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";

export function LoginAccountForm() {
  const t = useTranslations("auth");
  const [show2FA, setShow2FA] = useState(false);
  const router = useRouter();

  const { authenticate } = useAuth();

  const form = useForm<TypeLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const [login, { loading }] = useLoginMutation({
    onCompleted(data) {
      if (data.login.message) {
        setShow2FA(true);
      } else {
        authenticate();
        toast.success(t("loginSuccess"));
        router.push("/dashboard/settings");
      }
    },
    onError() {
      toast.error(t("loginError"));
    },
  });

  const { isValid } = form.formState;

  function onSubmit(data: TypeLoginSchema) {
    login({
      variables: {
        data,
      },
    });
  }

  return (
    <AuthWrapper
      heading={t("loginTitle")}
      backButtonLabel={t("dontHaveAccount") + " " + t("register")}
      backButtonHref="/account/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-4">
          {show2FA ? (
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("verificationCode")}</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} disabled={loading} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    {t("verificationCodeDescription")}
                  </FormDescription>
                </FormItem>
              )}
            />
          ) : (
            <>
              <FormField
                control={form.control}
                name="login"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("username")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("loginPlaceholder")}
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {t("usernameDescription")}
                    </FormDescription>
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
                    <FormDescription>
                      {t("passwordDescription")}
                    </FormDescription>
                  </FormItem>
                )}
              />
            </>
          )}

          <Button className="w-full mt-4" disabled={!isValid || loading}>
            {t("loginButtonLabel")}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}
