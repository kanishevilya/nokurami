"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/shadcn/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/Select";

import {
  IngressType,
  createIngressSchema,
  type TypeCreateIngressSchema,
} from "@/schemas/dashboard/stream-keys/create-ingress.schema";
import { useCreateIngressMutation } from "@/graphql/generated/output";

interface CreateStreamKeyDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateStreamKeyDialog({
  isOpen,
  onClose,
}: CreateStreamKeyDialogProps) {
  const t = useTranslations("profile");

  const form = useForm<TypeCreateIngressSchema>({
    resolver: zodResolver(createIngressSchema),
    defaultValues: {
      ingressType: IngressType.RTMP,
    },
  });

  const [createIngress, { loading: isCreating }] = useCreateIngressMutation({
    onCompleted() {
      toast.success(t("streamKeyCreatedSuccess"));
      onClose();
      form.reset();
    },
    onError(error) {
      toast.error(`${t("streamKeyCreationError")}: ${error.message}`);
    },
  });

  const onSubmit = (data: TypeCreateIngressSchema) => {
    createIngress({
      variables: {
        ingressType: data.ingressType,
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("generateStreamKey")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="ingressType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("ingressType")}</FormLabel>
                  <Select
                    onValueChange={(value) =>
                      field.onChange(parseInt(value) as IngressType)
                    }
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectIngressType")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={IngressType.RTMP.toString()}>
                        RTMP
                      </SelectItem>
                      <SelectItem value={IngressType.WHIP.toString()}>
                        WHIP
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isCreating}>
              {isCreating ? t("generating") : t("generateStreamKey")}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
