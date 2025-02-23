"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Info } from "lucide-react";

import { Button } from "@/components/ui/shadcn/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/shadcn/Form";
import { Switch } from "@/components/ui/shadcn/Switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/shadcn/Dialog";
import { FormWrapper } from "@/components/ui/items/FormWrapper";
import { useCurrent } from "@/hooks/useCurrent";
import { useChangeNotificationSettingsMutation } from "@/graphql/generated/output";
import {
  notificationSettingsSchema,
  NotificationSettingsFormData,
} from "@/schemas/notifications/notification-settings.schema";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";

export function NotificationSettingsForm() {
  const { user, isLoadingProfile, refetch } = useCurrent();
  const [telegramToken, setTelegramToken] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<NotificationSettingsFormData>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      siteNotificationsEnable: false,
      telegramNotificationsEnable: false,
    },
  });

  const [changeNotificationSettings, { loading: isLoadingUpdate }] =
    useChangeNotificationSettingsMutation({
      onCompleted(data) {
        refetch();
        toast.success("Notification settings updated");

        // Если включены уведомления Telegram и вернулся токен, сохраняем его
        if (
          data.changeNotificationSettings.notificationSettings
            .telegramNotificationsEnable &&
          data.changeNotificationSettings.telegramToken
        ) {
          setTelegramToken(data.changeNotificationSettings.telegramToken);
          setIsModalOpen(true); // Открываем модальное окно
        } else {
          setTelegramToken(null); // Сбрасываем токен, если уведомления отключены
        }
      },
      onError(error) {
        toast.error(`Error: ${error.message}`);
        // Если бэкенд отключил Telegram из-за конфликта, обновляем форму
        if (error.message.includes("Telegram already linked")) {
          form.setValue("telegramNotificationsEnable", false);
          setTelegramToken(null);
          setIsModalOpen(false);
        }
      },
    });

  // Заполняем форму текущими настройками уведомлений
  useEffect(() => {
    if (user?.notificationSettings) {
      form.reset({
        siteNotificationsEnable:
          user.notificationSettings.siteNotificationsEnable,
        telegramNotificationsEnable:
          user.notificationSettings.telegramNotificationsEnable,
      });
    }
  }, [user, form]);

  const handleSwitchChange = (
    field: keyof NotificationSettingsFormData,
    value: boolean
  ) => {
    form.setValue(field, value);
    changeNotificationSettings({
      variables: {
        data: {
          siteNotificationsEnable: form.getValues("siteNotificationsEnable"),
          telegramNotificationsEnable: form.getValues(
            "telegramNotificationsEnable"
          ),
        },
      },
    });
  };

  const handleOpenTelegram = () => {
    if (telegramToken) {
      window.open(`https://t.me/nokurami_bot?start=${telegramToken}`, "_blank");
      refetch(); // Перезагружаем данные после открытия Telegram
    }
  };

  const handleDisableTelegram = () => {
    form.setValue("telegramNotificationsEnable", false);
    changeNotificationSettings({
      variables: {
        data: {
          siteNotificationsEnable: form.getValues("siteNotificationsEnable"),
          telegramNotificationsEnable: false,
        },
      },
    });
    setIsModalOpen(false);
  };

  return (
    <FormWrapper
      heading="Notification Settings"
      id="notification-settings"
      description="Manage your notification preferences."
    >
      {isLoadingProfile ? (
        <NotificationSettingsSkeleton />
      ) : (
        <Form {...form}>
          <div className="p-6 pt-0 space-y-6">
            <FormField
              control={form.control}
              name="siteNotificationsEnable"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel className="text-lg">Site Notifications</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(value) =>
                        handleSwitchChange("siteNotificationsEnable", value)
                      }
                      disabled={isLoadingUpdate}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telegramNotificationsEnable"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <FormLabel className="text-lg">
                      Telegram Notifications
                    </FormLabel>
                    {field.value && telegramToken && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsModalOpen(true)}
                        disabled={isLoadingUpdate}
                      >
                        <Info className="min-h-5 min-w-5" />
                      </Button>
                    )}
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(value) =>
                        handleSwitchChange("telegramNotificationsEnable", value)
                      }
                      disabled={isLoadingUpdate}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Модальное окно для Telegram */}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Setup Telegram Notifications</DialogTitle>
              </DialogHeader>
              <div className="text-sm text-muted-foreground">
                To enable Telegram notifications, follow these steps:
                <ol className="list-decimal pl-5 mt-2">
                  <li>Click "Open Telegram" below to start the bot.</li>
                  <li>
                    Use the token provided:{" "}
                    <strong>{telegramToken || "Loading..."}</strong>
                  </li>
                </ol>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={handleDisableTelegram}
                  disabled={isLoadingUpdate}
                >
                  Disable Telegram
                </Button>
                <Button
                  onClick={handleOpenTelegram}
                  disabled={isLoadingUpdate || !telegramToken}
                >
                  Open Telegram
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Form>
      )}
    </FormWrapper>
  );
}

function NotificationSettingsSkeleton() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-10 w-full bg-gray-300 rounded" />
      <Skeleton className="h-10 w-full bg-gray-300 rounded" />
    </div>
  );
}
