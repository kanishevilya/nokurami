"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { type ChangeEvent, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
} from "@/schemas/profile/upload-file.schema";

export function AvatarChangeForm() {
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
        toast.success("Avatar updated successfully");
      },
      onError() {
        toast.error("Error updating avatar");
      },
    }
  );

  const [remove, { loading: isLoadingRemove }] = useRemoveProfileAvatarMutation(
    {
      onCompleted() {
        refetch();
        toast.success("Avatar removed successfully");
      },
      onError() {
        toast.error("Error removing avatar");
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
      heading="Avatar"
      id="avatar"
      description="Change your avatar to a new image. You can upload a new image or remove your current avatar."
      // alwaysOpen={true}
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
                          Change Avatar
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
                            ? "Uploading..."
                            : "Upload New Avatar"}
                        </Button>
                        {user?.avatar && (
                          <ConfirmModal
                            heading="Remove Avatar"
                            message="Are you sure you want to remove your avatar? This action cannot be undone."
                            onConfirm={() => remove()}
                          >
                            <Button
                              variant="ghost"
                              className="w-full sm:w-auto"
                              disabled={isLoadingUpdate || isLoadingRemove}
                            >
                              {isLoadingRemove
                                ? "Removing..."
                                : "Remove Avatar"}
                              <Trash className="ml-2 size-4" />
                            </Button>
                          </ConfirmModal>
                        )}
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Recommended: Square image, at least 512x512px
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Supported formats: JPG, PNG, GIF, WEBP (max 10MB)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            />
            <FormDescription>
              You can upload a new avatar or remove your current avatar.
            </FormDescription>
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
