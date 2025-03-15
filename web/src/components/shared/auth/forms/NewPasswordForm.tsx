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
import { useTranslations } from "next-intl";

export function NewPasswordForm() {
  const router = useRouter();
  const params = useParams<{ token: string }>();
  const t = useTranslations("auth");

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
      toast.success(t("passwordChangedSuccess"));
      router.push("/account/login");
    },
    onError() {
      toast.error(t("passwordChangeError"));
    },
  });

  function onSubmit(data: TypeNewPasswordSchema) {
    newPassword({ variables: { data: { ...data, token: params.token } } });
  }

  return (
    <AuthWrapper
      heading={t("changePassword")}
      backButtonLabel={t("backToLogin")}
      backButtonHref="/account/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-4">
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
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t("passwordRequirements")}</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("confirmPassword")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("confirmPasswordPlaceholder")}
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t("confirmPasswordDescription")}
                </FormDescription>
              </FormItem>
            )}
          />
          <Button className="w-full mt-4" disabled={!isValid || loading}>
            {t("changePassword")}
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
}
