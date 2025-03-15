"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ArrowLeft, GripVertical, ListRestart, Trash } from "lucide-react";
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
import {
  useUpdateSocialLinkMutation,
  useRemoveSocialLinkMutation,
} from "@/graphql/generated/output";
import {
  socialLinkSchema,
  SocialLinkFormData,
} from "@/schemas/dashboard/profile/social-link.schema";

interface SocialLinkItemProps {
  link: { id: string; title: string; url: string; position: number };
  refetch: () => void;
}

export function SocialLinkItem({ link, refetch }: SocialLinkItemProps) {
  const t = useTranslations("settings");
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: link.id });

  const form = useForm<SocialLinkFormData>({
    resolver: zodResolver(socialLinkSchema),
    defaultValues: {
      title: link.title,
      url: link.url,
    },
  });

  const [updateSocialLink, { loading: isUpdating }] =
    useUpdateSocialLinkMutation({
      onCompleted() {
        refetch();
        toast.success(t("socialLinkUpdatedSuccess"));
      },
      onError(error) {
        toast.error(`${t("error")}: ${error.message}`);
      },
    });

  const [removeSocialLink, { loading: isRemoving }] =
    useRemoveSocialLinkMutation({
      onCompleted() {
        refetch();
        toast.success(t("socialLinkRemovedSuccess"));
      },
      onError(error) {
        toast.error(`${t("error")}: ${error.message}`);
      },
    });

  const onSubmit = (data: SocialLinkFormData) => {
    updateSocialLink({
      variables: {
        id: link.id,
        input: {
          title: data.title,
          url: data.url,
        },
      },
    });
  };

  const handleRemove = () => {
    removeSocialLink({
      variables: { id: link.id },
    });
  };

  const handleReset = () => {
    form.reset({
      title: link.title,
      url: link.url,
    });
    toast.info(t("resetToLastSavedValues"));
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 border border-border bg-background p-4 rounded-lg"
    >
      <div {...attributes} {...listeners} className="cursor-grab">
        <GripVertical className="h-5 w-5 text-gray-500" />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 flex items-end gap-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="flex gap-2 items-center">
                  {t("title")} <FormMessage className="text-red-400" />
                </FormLabel>
                <FormControl>
                  <Input placeholder={t("titlePlaceholder")} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="flex gap-2 items-center">
                  {t("url")} <FormMessage className="text-red-400" />
                </FormLabel>
                <FormControl>
                  <Input placeholder={t("urlPlaceholder")} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isUpdating || isRemoving}>
            {isUpdating ? t("updating") : t("update")}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={isUpdating || isRemoving}
          >
            <ListRestart className="min-h-6 min-w-6" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={handleRemove}
            disabled={isUpdating || isRemoving}
          >
            {isRemoving ? t("removing") : <Trash className="h-4 w-4" />}
          </Button>
        </form>
      </Form>
    </div>
  );
}
