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

export function CreateAccountForm() {
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
      // toast.success('Аккаунт успешно создан')
    },
    onError() {
      toast.error("Ошибка при создании аккаунта");
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
      heading="Регистрация в Nokurami"
      backButtonLabel="Есть учетная запись? Войти"
      backButtonHref="/account/login"
    >
      {success ? (
        <Alert>
          <CircleCheck className="h-4 w-4" />
          <AlertTitle>Аккаунт успешно создан</AlertTitle>
          <AlertDescription>
            Теперь вы должны подтвердить почту
          </AlertDescription>
        </Alert>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Имя пользователя</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johanliebert"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Поле для ввода имени пользователя
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Почта</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johan.liebert@example.com"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Поле для ввода email</FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      type="password"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Поле для ввода пароля</FormDescription>
                </FormItem>
              )}
            />

            <Button className="w-full mt-4" disabled={!isValid || loading}>
              Зарегистрироваться
            </Button>
          </form>
        </Form>
      )}
    </AuthWrapper>
  );
}
