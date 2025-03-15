"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

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
import { Textarea } from "@/components/ui/shadcn/Textarea";
import { FormWrapper } from "@/components/ui/items/FormWrapper";
import { useCurrent } from "@/hooks/useCurrent";
import { useChangeProfileInformationMutation } from "@/graphql/generated/output";
import {
  changeProfileInfoSchema,
  ChangeProfileInfoFormData,
} from "@/schemas/dashboard/profile/change-profile-info.schema";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { TooltipContent } from "@/components/ui/shadcn/Tooltip";
import { Tooltip, TooltipTrigger } from "@/components/ui/shadcn/Tooltip";
import { TooltipProvider } from "@/components/ui/shadcn/Tooltip";

export function ProfileInfoChangeForm() {
  const t = useTranslations("settings");
  const { user, isLoadingProfile, refetch } = useCurrent();

  const form = useForm<ChangeProfileInfoFormData>({
    resolver: zodResolver(changeProfileInfoSchema),
    defaultValues: {
      username: "",
      displayName: "",
      information: "",
    },
  });

  const [changeProfileInfo, { loading: isLoadingUpdate }] =
    useChangeProfileInformationMutation({
      onCompleted() {
        refetch();
        toast.success(t("profileInfoUpdatedSuccess"));
      },
      onError(error) {
        toast.error(`${t("error")}: ${error.message}`);
      },
    });

  const resetForm = (_user: typeof user, message?: string) => {
    if (_user) {
      form.reset({
        username: _user.username,
        displayName: _user.displayName,
        information: _user.information || "",
      });
      if (message) {
        toast.info(message);
      }
    }
  };

  useEffect(() => {
    resetForm(user);
  }, [user, form]);

  const handleReset = () => {
    resetForm(user, t("formResetSuccess"));
  };

  const onSubmit = (data: ChangeProfileInfoFormData) => {
    changeProfileInfo({
      variables: {
        input: {
          username: data.username,
          displayName: data.displayName,
          information: data.information,
        },
      },
    });
  };

  return (
    <FormWrapper
      heading={t("profileInformation")}
      id="profile-info"
      description={t("profileInfoDescription")}
    >
      {isLoadingProfile ? (
        <ProfileInfoChangeFormSkeleton />
      ) : (
        <Form {...form}>
          <form
            className="p-6 pb-0 pt-0 space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t("username")}</FormLabel>

                  <FormControl>
                    <Input placeholder={t("usernamePlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="displayName"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t("displayName")}</FormLabel>

                  <FormControl>
                    <Input
                      placeholder={t("displayNamePlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="information"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t("information")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("informationPlaceholder")}
                      className="resize-none"
                      maxLength={300}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <Button type="submit" disabled={isLoadingUpdate}>
                {isLoadingUpdate ? t("saving") : t("saveChanges")}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={isLoadingUpdate}
              >
                {t("resetToMyValues")}
              </Button>
            </div>
            <FormDescription>{t("profileInfoRequirements")}</FormDescription>
          </form>
        </Form>
      )}
    </FormWrapper>
  );
}

function ProfileInfoChangeFormSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-20 w-full" />
      </div>
      <Skeleton className="h-10 w-32" />
    </div>
  );
}
