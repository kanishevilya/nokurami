"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { type ChangeEvent, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/shadcn/Button";
import { Form, FormDescription, FormField } from "@/components/ui/shadcn/Form";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { ChannelAvatar } from "@/components/ui/items/ChannelAvatar";
import { ConfirmModal } from "@/components/ui/items/ConfirmModal";
import { FormWrapper } from "@/components/ui/items/FormWrapper";

import {
  useChangeProfileAvatarMutation,
  useRemoveProfileAvatarMutation,
} from "@/graphql/generated/output";

import { useCurrent } from "@/hooks/useCurrent";

import {
  type TypeUploadFileSchema,
  uploadFileSchema,
} from "@/schemas/dashboard/profile/upload-file.schema";

export function AvatarChangeForm() {
  const t = useTranslations("settings");
  const { user, isLoadingProfile, refetch, updateUserAvatar } = useCurrent();

  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<TypeUploadFileSchema>({
    resolver: zodResolver(uploadFileSchema),
    values: {
      file: user?.avatar!,
    },
  });

  const [update, { loading: isLoadingUpdate }] = useChangeProfileAvatarMutation(
    {
      onCompleted(data) {
        refetch();
        toast.success(t("avatarUpdatedSuccess"));
      },
      onError() {
        toast.error(t("avatarUpdateError"));
      },
    }
  );

  const [remove, { loading: isLoadingRemove }] = useRemoveProfileAvatarMutation(
    {
      onCompleted() {
        refetch();
        toast.success(t("avatarRemovedSuccess"));
      },
      onError() {
        toast.error(t("avatarRemoveError"));
      },
    }
  );

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      form.setValue("file", file);
      updateUserAvatar(URL.createObjectURL(file));
      update({ variables: { avatar: file } });
    }
  }

  return (
    <FormWrapper
      heading={t("avatar")}
      id="avatar"
      description={t("avatarDescription")}
    >
      {isLoadingProfile ? (
        <ChangeAvatarFormSkeleton />
      ) : (
        <Form {...form}>
          <div className="p-6 pb-0 pt-0 space-y-6">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <div className="pb-6">
                  <div className="flex flex-col items-center space-y-6 lg:flex-row lg:space-x-8 lg:space-y-0">
                    <div
                      className="relative group cursor-pointer"
                      onClick={() => inputRef.current?.click()}
                    >
                      <ChannelAvatar
                        channel={{
                          username: user?.username!,
                          avatar:
                            field.value instanceof File
                              ? URL.createObjectURL(field.value)
                              : field.value,
                        }}
                        size="xl"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-sm font-medium">
                          {t("changeAvatar")}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 text-center lg:text-left">
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <input
                          className="hidden"
                          type="file"
                          accept="image/*"
                          ref={inputRef}
                          onChange={handleImageChange}
                        />
                        <Button
                          variant="default"
                          className="w-full sm:w-auto"
                          onClick={() => inputRef.current?.click()}
                          disabled={isLoadingUpdate || isLoadingRemove}
                        >
                          {isLoadingUpdate
                            ? t("uploading")
                            : t("uploadNewAvatar")}
                        </Button>
                        {user?.avatar && (
                          <ConfirmModal
                            heading={t("removeAvatar")}
                            message={t("removeAvatarConfirmation")}
                            onConfirm={() => remove()}
                          >
                            <Button
                              variant="ghost"
                              className="w-full sm:w-auto"
                              disabled={isLoadingUpdate || isLoadingRemove}
                            >
                              {isLoadingRemove
                                ? t("removing")
                                : t("removeAvatar")}
                              <Trash className="ml-2 size-4" />
                            </Button>
                          </ConfirmModal>
                        )}
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          {t("avatarRecommendedSize")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {t("avatarSupportedFormats")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            />
            <FormDescription>{t("avatarUploadDescription")}</FormDescription>
          </div>
        </Form>
      )}
    </FormWrapper>
  );
}

export function ChangeAvatarFormSkeleton() {
  return (
    <div className="rounded-lg">
      <div className="p-6">
        <div className="flex items-center space-x-8">
          <Skeleton className="size-36 rounded-full" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-[340px]" />
            <Skeleton className="h-4 w-[310px]" />
            <Skeleton className="h-4 w-[230px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
