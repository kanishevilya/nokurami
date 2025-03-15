"use client";

import { useEffect, useState } from "react";
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
        toast.success("Stream information updated successfully");
      },
      onError(error) {
        toast.error(`Error updating stream information: ${error.message}`);
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
      heading="Stream Information"
      id="stream-info"
      description="Update your stream title and description."
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
                  <FormLabel>Stream Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Your stream title" {...field} />
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
                  <FormLabel>Stream Category</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value || defaultCategoryId}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
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
                {isLoadingUpdate ? "Saving..." : "Save Changes"}
              </Button>
            </div>
            <FormDescription>
              Title must be less than 100 characters. Description must be less
              than 300 characters.
            </FormDescription>
          </form>
        </Form>
      )}
    </FormWrapper>
  );
}
