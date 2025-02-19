"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  newPasswordSchema,
  TypeNewPasswordSchema,
} from "@/schemas/auth/new-password.schema";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useNewPasswordMutation } from "@/graphql/generated/output";
import { AuthWrapper } from "../AuthWrapper";
import {
  Form,
  FormControl,
  FormDescription,
} from "@/components/ui/shadcn/Form";
import { FormField, FormItem, FormLabel } from "@/components/ui/shadcn/Form";
import { Input } from "@/components/ui/shadcn/Input";
import { Button } from "@/components/ui/shadcn/Button";

export function NewPasswordForm() {
  const router = useRouter();
  const params = useParams<{ token: string }>();

  const form = useForm<TypeNewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { isValid } = form.formState;

  const [newPassword, { loading }] = useNewPasswordMutation({
    onCompleted() {
      toast.success("Пароль успешно изменен");
      router.push("/account/login");
    },
    onError() {
      toast.error("Ошибка при смене пароля");
    },
  });

  function onSubmit(data: TypeNewPasswordSchema) {
    newPassword({ variables: { data: { ...data, token: params.token } } });
  }

  return (
    <AuthWrapper
      heading="Смена пароля"
      backButtonLabel="Вернуться на страницу входа"
      backButtonHref="/account/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-4">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Новый пароль</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Новый пароль"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Новый пароль должен быть не менее 8 символов
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Подтвердите пароль</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Подтвердите пароль"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Подтвердите ваш пароль</FormDescription>
              </FormItem>
            )}
          />
          <Button className="w-full mt-4" disabled={!isValid || loading}>
            Сменить пароль
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}
