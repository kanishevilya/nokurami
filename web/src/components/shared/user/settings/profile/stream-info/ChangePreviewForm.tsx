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
  useChangeStreamPreviewMutation,
  useRemoveStreamPreviewMutation,
} from "@/graphql/generated/output";

import { useCurrent } from "@/hooks/useCurrent";

import {
  type TypeUploadFileSchema,
  uploadFileSchema,
} from "@/schemas/dashboard/profile/upload-file.schema";
import Image from "next/image";
import { getMediaSource } from "@/utils/get-media-source";

export function ChangePreviewForm() {
  const { user, isLoadingProfile, refetch } = useCurrent();

  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<TypeUploadFileSchema>({
    resolver: zodResolver(uploadFileSchema),
    values: {
      file: user?.stream?.previewUrl!,
    },
  });

  console.log(user);

  const [update, { loading: isLoadingUpdate }] = useChangeStreamPreviewMutation(
    {
      onCompleted(data) {
        refetch();
        toast.success("Preview updated successfully");
      },
      onError() {
        toast.error("Error updating preview");
      },
    }
  );

  const [remove, { loading: isLoadingRemove }] = useRemoveStreamPreviewMutation(
    {
      onCompleted() {
        refetch();
        toast.success("Preview removed successfully");
      },
      onError() {
        toast.error("Error removing preview");
      },
    }
  );

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    console.log(file);
    if (file) {
      form.setValue("file", file);
      update({ variables: { preview: file } });
    }
  }

  return (
    <FormWrapper
      heading="Stream Preview"
      id="preview"
      description="Change your stream preview to a new image. You can upload a new image or remove your current preview."
      // alwaysOpen={true}
    >
      {isLoadingProfile ? (
        <ChangePreviewFormSkeleton />
      ) : (
        <Form {...form}>
          <div className="p-6 pb-0 pt-0 space-y-6">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <div className="pb-6">
                  <div className="flex flex-col items-center space-y-6 lg:items-start lg:flex-row lg:space-x-8 lg:space-y-0">
                    <div
                      className="relative group cursor-pointer"
                      onClick={() => inputRef.current?.click()}
                    >
                      <img
                        src={getPreview(
                          field.value instanceof File
                            ? URL.createObjectURL(field.value)
                            : field.value
                        )}
                        alt="Preview"
                        className="w-[850px] h-[450px] object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white text-sm font-medium">
                          Change Preview
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 text-center lg:text-left">
                      <div className="flex flex-col sm:flex-row justify-start items-start gap-3">
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
                            : "Upload New Preview"}
                        </Button>
                        {user?.avatar && (
                          <ConfirmModal
                            heading="Remove Preview"
                            message="Are you sure you want to remove your preview? This action cannot be undone."
                            onConfirm={() => remove()}
                          >
                            <Button
                              variant="ghost"
                              className="w-full sm:w-auto"
                              disabled={isLoadingUpdate || isLoadingRemove}
                            >
                              {isLoadingRemove
                                ? "Removing..."
                                : "Remove Preview"}
                              <Trash className="ml-2 size-4" />
                            </Button>
                          </ConfirmModal>
                        )}
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Recommended: 16:9 aspect ratio
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
              You can upload a new preview or remove your current preview.
            </FormDescription>
          </div>
        </Form>
      )}
    </FormWrapper>
  );
}

export function ChangePreviewFormSkeleton() {
  return (
    <div className="rounded-lg">
      <div className="p-6">
        <div className="flex items-center space-x-8">
          <Skeleton className="size-36 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function getPreview(preview: string | null | undefined) {
  let previewUrl = null;

  if (preview?.startsWith("blob:")) {
    previewUrl = preview;
  } else {
    previewUrl = getMediaSource(preview);
  }

  return previewUrl;
}
