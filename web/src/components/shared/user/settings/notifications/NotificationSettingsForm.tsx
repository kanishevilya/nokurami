"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";

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
  DialogFooter,
} from "@/components/ui/shadcn/Dialog";
import { FormWrapper } from "@/components/ui/items/FormWrapper";
import { useCurrent } from "@/hooks/useCurrent";
import { useChangeNotificationSettingsMutation } from "@/graphql/generated/output";
import {
  notificationSettingsSchema,
  NotificationSettingsFormData,
} from "@/schemas/dashboard/notifications/notification-settings.schema";
import {
  useTelegramTokenStore,
  getDecryptedToken,
} from "@/storage/auth/telegram-token.storage";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { Heading } from "@/components/ui/items/Heading";

export function NotificationSettingsForm() {
  const { user, isLoadingProfile, refetch } = useCurrent();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { telegramToken, setTelegramToken, clearTelegramToken } =
    useTelegramTokenStore();
  const t = useTranslations("settings");
  const commonT = useTranslations("common");

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
        toast.success(t("notificationSettingsUpdated"));

        if (
          data.changeNotificationSettings.notificationSettings
            .telegramNotificationsEnable &&
          data.changeNotificationSettings.telegramToken
        ) {
          setTelegramToken(data.changeNotificationSettings.telegramToken);
          setIsModalOpen(true);
        } else {
          clearTelegramToken();
        }
      },
      onError(error) {
        toast.error(`${commonT("error")}: ${error.message}`);
        form.setValue("telegramNotificationsEnable", false);
        clearTelegramToken();
        setIsModalOpen(false);
      },
    });

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
    const decryptedToken = getDecryptedToken(telegramToken);
    if (decryptedToken) {
      window.open(
        `https://t.me/nokurami_bot?start=${decryptedToken}`,
        "_blank"
      );
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
    clearTelegramToken();
  };

  const handleCheckStatus = async () => {
    const { data } = await refetch();
    const isTelegramEnabled =
      data?.getProfile.notificationSettings.telegramNotificationsEnable;
    const chatId = data?.getProfile.telegramChatId;

    if (chatId) {
      toast.success(t("telegramNotificationsActive"));
      clearTelegramToken();
      setIsModalOpen(false);
    } else if (isTelegramEnabled && telegramToken) {
      toast.warning(t("telegramLinkingIncomplete"));
      setIsModalOpen(true);
    } else if (!isTelegramEnabled && telegramToken) {
      toast.error(t("telegramNotificationsDisabled"));
      form.setValue("telegramNotificationsEnable", false);
      setIsModalOpen(true);
    } else if (!chatId && !isTelegramEnabled && !telegramToken) {
      toast.info(t("telegramNotificationsOff"));
      setIsModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Heading
        title={t("notifications")}
        description={t("notificationsDescription")}
        size="lg"
      />
      <FormWrapper
        heading={t("notificationSettings")}
        id="notification-settings"
        description={t("notificationSettingsDescription")}
        alwaysOpen={true}
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
                    <FormLabel className="text-lg">
                      {t("siteNotifications")}
                    </FormLabel>
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
                        {t("telegramNotifications")}
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
                          handleSwitchChange(
                            "telegramNotificationsEnable",
                            value
                          )
                        }
                        disabled={isLoadingUpdate}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="w-full max-w-4xl">
                <DialogHeader>
                  <DialogTitle>{t("setupTelegramNotifications")}</DialogTitle>
                </DialogHeader>
                <div className="text-sm text-muted-foreground">
                  {t("telegramSetupInstructions")}:
                  <ol className="pl-5 mt-2">
                    <li>{t("telegramSetupStep1")}</li>
                    <li>
                      {t("telegramSetupStep2")}:{" "}
                      <strong>
                        {getDecryptedToken(telegramToken) || t("loading")}
                      </strong>
                    </li>
                    <li>{t("telegramSetupStep3")}</li>
                  </ol>
                  <p className="mt-2">{t("telegramSetupNote")}</p>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={handleDisableTelegram}
                    disabled={isLoadingUpdate}
                  >
                    {t("disableTelegram")}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCheckStatus}
                    disabled={isLoadingUpdate}
                  >
                    {t("checkStatus")}
                  </Button>
                  <Button
                    onClick={handleOpenTelegram}
                    disabled={isLoadingUpdate || !telegramToken}
                  >
                    {t("openTelegram")}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Form>
        )}
      </FormWrapper>
    </div>
  );
}

const NotificationSettingsSkeleton = () => {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-10 w-full bg-gray-300 rounded" />
      <Skeleton className="h-10 w-full bg-gray-300 rounded" />
    </div>
  );
};
