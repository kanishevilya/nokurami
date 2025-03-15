"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

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
} from "@/schemas/dashboard/profile/social-link.schema";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { SocialLinksList } from "./SocialLinksList";
import { Heading } from "@/components/ui/items/Heading";
import { Separator } from "@/components/ui/shadcn/Separator";

export function SocialLinksForm() {
  const t = useTranslations("settings");
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
        refetch();
        form.reset();
        toast.success(t("socialLinkAddedSuccess"));
      },
      onError(error) {
        toast.error(`${t("error")}: ${error.message}`);
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
      heading={t("socialLinks")}
      id="social-links-form"
      description={t("socialLinksDescription")}
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
                    <FormLabel>{t("title")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("titlePlaceholder")} {...field} />
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
                    <FormLabel>{t("url")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("urlPlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoadingCreate}>
                {isLoadingCreate ? t("adding") : t("addLink")}
              </Button>
            </form>
          </Form>
          <div className="p-6 gap-6 flex flex-col">
            <Heading
              title={t("yourSocialLinks")}
              description={t("socialLinksManageDescription")}
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
