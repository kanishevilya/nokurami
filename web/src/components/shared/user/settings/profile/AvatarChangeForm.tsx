// "use client";

// import {
//   useChangeProfileAvatarMutation,
//   useRemoveProfileAvatarMutation,
// } from "@/graphql/generated/output";

// import { Button } from "@/components/ui/shadcn/Button";
// import { Input } from "@/components/ui/shadcn/Input";
// import { Label } from "@/components/ui/shadcn/Label";
// import { Upload, Trash2 } from "lucide-react";
// import { toast } from "sonner";
// import { ChangeEvent, useRef, useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form, useForm } from "react-hook-form";
// import { useCurrent } from "@/hooks/useCurrent";
// import {
//   uploadFileSchema,
//   TypeUploadFileSchema,
// } from "@/schemas/upload-file.schema";
// import { ChannelAvatar } from "@/components/ui/items/ChannelAvatar";
// import { FormField } from "@/components/ui/shadcn/Form";
// import { FormWrapper } from "@/components/ui/items/FormWrapper";
// import { Skeleton } from "@/components/ui/shadcn/Skeleton";
// export function AvatarChangeForm() {
//   const { user, isLoadingProfile, refetch } = useCurrent();

//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const form = useForm<TypeUploadFileSchema>({
//     resolver: zodResolver(uploadFileSchema),
//     values: {
//       file: user?.avatar!,
//     },
//   });

//   const [update, { loading: isLoadingUpdate }] = useChangeProfileAvatarMutation(
//     {
//       onCompleted() {
//         refetch();
//         toast.success("Avatar updated successfully");
//       },
//       onError() {
//         toast.error("Error updating avatar");
//       },
//     }
//   );

//   const [remove, { loading: isLoadingRemove }] = useRemoveProfileAvatarMutation(
//     {
//       onCompleted() {
//         refetch();
//         toast.success("Avatar removed successfully");
//       },
//       onError() {
//         toast.error("Error removing avatar");
//       },
//     }
//   );

//   function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
//     const file = event.target.files?.[0];

//     if (file) {
//       form.setValue("file", file);
//       update({ variables: { file: file } });
//     }
//   }

//   return isLoadingProfile ? (
//     <Skeleton className="h-24 w-24" />
//   ) : (
//     <FormWrapper heading="Avatar">
//       <Form {...form}>
//         <FormField
//           control={form.control}
//           name="file"
//           render={({ field }) => (
//             <div className="flex items-center gap-6">
//               <ChannelAvatar
//                 channel={{
//                   username: user?.username!,
//                   avatar:
//                     field.value instanceof File
//                       ? URL.createObjectURL(field.value)
//                       : field.value,
//                 }}
//                 size="xl"
//               />

//               <div className="space-y-2">
//                 <Input
//                   className="hidden"
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleImageChange}
//                 />
//                 <div className="flex gap-2">
//                   <Button
//                     variant="outline"
//                     disabled={isLoadingUpdate}
//                     onClick={() => fileInputRef.current?.click()}
//                   >
//                     <Upload />
//                     Upload new image
//                   </Button>
//                 </div>
//                 <p className="text-xs text-muted-foreground">
//                   Recommended: Square image, at least 400x400px
//                 </p>
//               </div>
//             </div>
//           )}
//         />
//       </Form>
//     </FormWrapper>
//   );
// }

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { type ChangeEvent, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/shadcn/Button";
import { Form, FormField } from "@/components/ui/shadcn/Form";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { ChannelAvatar } from "@/components/ui/items/ChannelAvatar";
// import { ConfirmModal } from "@/components/ui/elements/ConfirmModal";
import { FormWrapper } from "@/components/ui/items/FormWrapper";

import {
  useChangeProfileAvatarMutation,
  useRemoveProfileAvatarMutation,
} from "@/graphql/generated/output";

import { useCurrent } from "@/hooks/useCurrent";

import {
  type TypeUploadFileSchema,
  uploadFileSchema,
} from "@/schemas/upload-file.schema";
import { ConfirmModal } from "@/components/ui/items/ConfirmModal";
import { getMediaSource } from "@/utils/get-media-source";

export function ChangeAvatarForm() {
  const { user, isLoadingProfile, refetch } = useCurrent();

  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<TypeUploadFileSchema>({
    resolver: zodResolver(uploadFileSchema),
    values: {
      file: user?.avatar!,
    },
  });

  const [update, { loading: isLoadingUpdate }] = useChangeProfileAvatarMutation(
    {
      onCompleted() {
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

    if (file) {
      form.setValue("file", file);
      update({ variables: { avatar: file } });
    }
  }

  return isLoadingProfile ? (
    <ChangeAvatarFormSkeleton />
  ) : (
    <FormWrapper heading="Avatar">
      <Form {...form}>
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <div className="px-5 pb-5">
              <div className="w-full items-center space-x-6 lg:flex">
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
                <div className="space-y-3">
                  <div className="flex items-center gap-x-3">
                    <input
                      className="hidden"
                      type="file"
                      ref={inputRef}
                      onChange={handleImageChange}
                    />
                    <Button
                      variant="secondary"
                      onClick={() => inputRef.current?.click()}
                      disabled={isLoadingUpdate || isLoadingRemove}
                    >
                      Update
                    </Button>
                    {user?.avatar && (
                      <ConfirmModal
                        heading="Remove Avatar"
                        message="Are you sure you want to remove your avatar?"
                        onConfirm={() => remove()}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={isLoadingUpdate || isLoadingRemove}
                        >
                          <Trash className="size-4" />
                        </Button>
                      </ConfirmModal>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Recommended: Square image, at least 400x400px
                  </p>
                </div>
              </div>
            </div>
          )}
        />
      </Form>
    </FormWrapper>
  );
}

export function ChangeAvatarFormSkeleton() {
  return <Skeleton className="h-52 w-full" />;
}
