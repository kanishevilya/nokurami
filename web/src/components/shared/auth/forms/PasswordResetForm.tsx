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

export function PasswordResetForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<TypeResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const [passwordReset, { loading }] = usePasswordResetMutation({
    onCompleted(data) {
      setIsSuccess(true);
      toast.success(
        "Сообщение с инструкциями по сбросу пароля отправлено на ваш email"
      );
    },
    onError() {
      toast.error(
        "Ошибка при отправке сообщения с инструкциями по сбросу пароля"
      );
    },
  });

  const { isValid } = form.formState;

  function onSubmit(data: TypeResetPasswordSchema) {
    passwordReset({ variables: { data } });
  }

  return (
    <AuthWrapper
      heading="Сброс пароля"
      backButtonLabel="Вернуться на страницу входа"
      backButtonHref="/account/login"
    >
      {isSuccess ? (
        <Alert>
          <CircleCheck className="h-4 w-4" />
          <AlertTitle>Ссылка отправлена</AlertTitle>
          <AlertDescription>
            Сообщение с инструкциями по сбросу пароля отправлено на ваш email
          </AlertDescription>
        </Alert>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" disabled={loading} {...field} />
                  </FormControl>
                  <FormDescription>Введите email</FormDescription>
                </FormItem>
              )}
            />
            <Button className="w-full mt-4" disabled={!isValid || loading}>
              Сбросить пароль
            </Button>
          </form>
        </Form>
      )}
    </AuthWrapper>
  );
}
