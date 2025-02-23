"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/shadcn/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/Form";
import { Input } from "@/components/ui/shadcn/Input";
import { FormWrapper } from "@/components/ui/items/FormWrapper";
import {
  useCreateSocialLinkMutation,
  useFindSocialLinksQuery,
} from "@/graphql/generated/output";
import {
  socialLinkSchema,
  SocialLinkFormData,
} from "@/schemas/profile/social-link.schema";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { SocialLinksList } from "./SocialLinksList";
import { Heading } from "@/components/ui/items/Heading";
import { Separator } from "@/components/ui/shadcn/Separator";

export function SocialLinksForm() {
  const { loading: isLoadingLinks, refetch } = useFindSocialLinksQuery();
  const form = useForm<SocialLinkFormData>({
    resolver: zodResolver(socialLinkSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const [createSocialLink, { loading: isLoadingCreate }] =
    useCreateSocialLinkMutation({
      onCompleted() {
        refetch(); // Обновляем список после добавления
        form.reset(); // Сбрасываем форму
        toast.success("Social link added successfully");
      },
      onError(error) {
        toast.error(`Error adding social link: ${error.message}`);
      },
    });

  const onSubmit = (data: SocialLinkFormData) => {
    createSocialLink({
      variables: {
        input: {
          title: data.title,
          url: data.url,
        },
      },
    });
  };

  return (
    <FormWrapper
      heading="Social Links"
      id="social-links-form"
      description="Add a new social media link to your profile or manage existing ones."
    >
      {isLoadingLinks ? (
        <SocialLinksFormSkeleton />
      ) : (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-6 pb-0 pt-0 space-y-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Twitter" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., https://twitter.com/yourprofile"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoadingCreate}>
                {isLoadingCreate ? "Adding..." : "Add Link"}
              </Button>
            </form>
          </Form>
          <div className="p-6 gap-6 flex flex-col">
            <Heading
              title="Your Social Links"
              description="Manage your existing social links. Drag to reorder."
              size="md"
            />
            <SocialLinksList />
          </div>
        </>
      )}
    </FormWrapper>
  );
}

export function SocialLinksFormSkeleton() {
  return <Skeleton className="h-72 w-full" />;
}
