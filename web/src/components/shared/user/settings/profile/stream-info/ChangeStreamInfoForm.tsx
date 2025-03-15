"use client";

import { useEffect, useState } from "react";
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
import {
  useChangeStreamInfoMutation,
  useFindAllCategoriesQuery,
} from "@/graphql/generated/output";
import {
  changeStreamInfoSchema,
  ChangeStreamInfoFormData,
} from "@/schemas/dashboard/profile/change-stream-info.schema";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/Select";

interface Category {
  id: string;
  title: string;
  slug: string;
}

export function ChangeStreamInfoForm() {
  const t = useTranslations("settings");
  const { user, isLoadingProfile, refetch } = useCurrent();
  const [defaultCategoryId, setDefaultCategoryId] = useState<string>("");

  const form = useForm<ChangeStreamInfoFormData>({
    resolver: zodResolver(changeStreamInfoSchema),
    values: {
      title: user?.stream?.title || "",
      categoryId: user?.stream?.categoryId || "",
    },
  });

  useEffect(() => {
    console.log(user?.stream?.categoryId);
    setDefaultCategoryId(user?.stream?.categoryId || "");
  }, [user]);

  const [categories, setCategories] = useState<Category[]>([]);
  const { data, loading } = useFindAllCategoriesQuery();

  useEffect(() => {
    if (data) {
      setCategories(data.findAllCategories);
    }
  }, [data]);

  const [changeStreamInfo, { loading: isLoadingUpdate }] =
    useChangeStreamInfoMutation({
      onCompleted() {
        refetch();
        toast.success(t("streamInfoUpdatedSuccess"));
      },
      onError(error) {
        toast.error(`${t("error")}: ${error.message}`);
      },
    });

  const onSubmit = (data: ChangeStreamInfoFormData) => {
    changeStreamInfo({
      variables: {
        data: {
          title: data.title,
          categoryId: data.categoryId,
        },
      },
    });
  };

  return (
    <FormWrapper
      heading={t("streamInformation")}
      id="stream-info"
      description={t("streamInfoDescription")}
    >
      {isLoadingProfile ? (
        <Skeleton />
      ) : (
        <Form {...form}>
          <form
            className="p-6 pb-0 pt-0 space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t("streamTitle")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("streamTitlePlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t("streamCategory")}</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value || defaultCategoryId}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectCategory")} />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <Button type="submit" disabled={isLoadingUpdate}>
                {isLoadingUpdate ? t("saving") : t("saveChanges")}
              </Button>
            </div>
            <FormDescription>{t("streamInfoRequirements")}</FormDescription>
          </form>
        </Form>
      )}
    </FormWrapper>
  );
}
