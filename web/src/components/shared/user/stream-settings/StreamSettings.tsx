"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/Form";
import { Input } from "@/components/ui/shadcn/Input";
import { Button } from "@/components/ui/shadcn/Button";
import { Heading } from "@/components/ui/items/Heading";
import { FormWrapper } from "@/components/ui/items/FormWrapper";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/Select";

import { useCurrent } from "@/hooks/useCurrent";
import {
  useUpdateStreamMutation,
  useFindAllCategoriesQuery,
} from "@/graphql/generated/output";

const streamSettingsSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  categoryId: z.string().min(1, "Please select a category"),
  previewUrl: z.string().optional(),
});

type StreamSettingsFormData = z.infer<typeof streamSettingsSchema>;

export function StreamSettings() {
  const { user, isLoadingProfile, refetch } = useCurrent();
  const { data: categoriesData, loading: loadingCategories } =
    useFindAllCategoriesQuery();
  const t = useTranslations("streams");
  const formT = useTranslations("common");

  const form = useForm<StreamSettingsFormData>({
    resolver: zodResolver(streamSettingsSchema),
    defaultValues: {
      title: "",
      categoryId: "",
      previewUrl: "",
    },
  });

  const [updateStream, { loading: isUpdating }] = useUpdateStreamMutation({
    onCompleted() {
      toast.success(t("settingsUpdatedSuccess"));
      refetch();
    },
    onError(error) {
      toast.error(`${t("settingsUpdateError")}: ${error.message}`);
    },
  });

  useEffect(() => {
    if (user?.stream) {
      form.reset({
        title: user.stream.title || "",
        categoryId: user.stream.categoryId || "",
        previewUrl: user.stream.previewUrl || "",
      });
    }
  }, [user, form]);

  const onSubmit = async (data: StreamSettingsFormData) => {
    await updateStream({
      variables: {
        data: {
          title: data.title,
          categoryId: data.categoryId,
        },
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Heading
        title={t("streamSettings")}
        description={t("streamSettingsDescription")}
        size="lg"
      />

      <FormWrapper
        heading={t("streamInformation")}
        id="stream-information"
        description={t("streamInformationDescription")}
        alwaysOpen={true}
      >
        {isLoadingProfile || loadingCategories ? (
          <StreamSettingsSkeleton />
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-6 pt-0 space-y-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("streamTitle")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("enterStreamTitle")}
                        {...field}
                        disabled={isUpdating}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("category")}</FormLabel>
                    <Select
                      disabled={isUpdating}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("selectCategory")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoriesData?.findAllCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="previewUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("thumbnailUrl")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("enterThumbnailUrl")}
                        {...field}
                        value={field.value || ""}
                        disabled={isUpdating}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("updating")}
                  </>
                ) : (
                  formT("save")
                )}
              </Button>
            </form>
          </Form>
        )}
      </FormWrapper>
    </div>
  );
}

const StreamSettingsSkeleton = () => {
  return (
    <div className="p-6 space-y-6">
      <Skeleton className="h-10 w-full rounded" />
      <Skeleton className="h-10 w-full rounded" />
      <Skeleton className="h-10 w-full rounded" />
      <Skeleton className="h-10 w-32 rounded" />
    </div>
  );
};
