// src/components/profile/information/ProfileInfoChangeForm.tsx
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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
} from "@/schemas/profile/change-profile-info.schema";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { TooltipContent } from "@/components/ui/shadcn/Tooltip";
import { Tooltip, TooltipTrigger } from "@/components/ui/shadcn/Tooltip";
import { TooltipProvider } from "@/components/ui/shadcn/Tooltip";

export function ProfileInfoChangeForm() {
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
        toast.success("Profile information updated successfully");
      },
      onError(error) {
        toast.error(`Error updating profile: ${error.message}`);
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
    resetForm(user, "Form reset to default values");
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
      heading="Profile Information"
      id="profile-info"
      description="Update your username, display name, and additional information."
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
                  <FormLabel>Username </FormLabel>

                  <FormControl>
                    <Input placeholder="Your username" {...field} />
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
                  <FormLabel>Display Name</FormLabel>

                  <FormControl>
                    <Input placeholder="Your display name" {...field} />
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
                  <FormLabel>Information</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself (max 300 characters)"
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
                {isLoadingUpdate ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={isLoadingUpdate}
              >
                Reset to my values
              </Button>
            </div>
            <FormDescription>
              Username must contain only letters, numbers, and hyphens. Display
              name must be less than 30 characters. Information must be less
              than 300 characters.
            </FormDescription>
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
