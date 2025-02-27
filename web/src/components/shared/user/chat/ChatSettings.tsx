"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/shadcn/Form";
import { Switch } from "@/components/ui/shadcn/Switch";
import { FormWrapper } from "@/components/ui/items/FormWrapper";
import { Heading } from "@/components/ui/items/Heading";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";

import { useCurrent } from "@/hooks/useCurrent";
import { useChangeChatSettingsMutation } from "@/graphql/generated/output";
import {
  chatSettingsSchema,
  type ChatSettingsFormData,
} from "@/schemas/dashboard/chat/chat-settings.schema";

export function ChatSettings() {
  const { user, isLoadingProfile, refetch } = useCurrent();

  const form = useForm<ChatSettingsFormData>({
    resolver: zodResolver(chatSettingsSchema),
    defaultValues: {
      isChatEnabled: false,
      isChatFollowersOnly: false,
    },
  });

  const [changeChatSettings, { loading: isLoadingUpdate }] =
    useChangeChatSettingsMutation({
      onCompleted() {
        refetch();
        toast.success("Chat settings updated successfully");
      },
      onError(error) {
        toast.error(`Error updating chat settings: ${error.message}`);
      },
    });

  useEffect(() => {
    if (user?.stream?.chatSettings) {
      form.reset({
        isChatEnabled: user.stream.chatSettings.isChatEnabled,
        isChatFollowersOnly: user.stream.chatSettings.isChatFollowersOnly,
      });
    }
  }, [user, form]);

  const handleSwitchChange = (
    field: keyof ChatSettingsFormData,
    value: boolean
  ) => {
    form.setValue(field, value);
    changeChatSettings({
      variables: {
        data: {
          isChatEnabled: form.getValues("isChatEnabled"),
          isChatFollowersOnly: form.getValues("isChatFollowersOnly"),
        },
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Heading
        title="Chat"
        description="Configure your stream chat settings"
        size="lg"
      />
      <FormWrapper
        heading="Chat Settings"
        id="chat-settings"
        description="Manage your chat preferences."
        alwaysOpen={true}
      >
        {isLoadingProfile ? (
          <ChatSettingsSkeleton />
        ) : (
          <Form {...form}>
            <div className="p-6 pt-0 space-y-6">
              <FormField
                control={form.control}
                name="isChatEnabled"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="text-lg">Enable Chat</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(value) =>
                          handleSwitchChange("isChatEnabled", value)
                        }
                        disabled={isLoadingUpdate}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isChatFollowersOnly"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="text-lg">Followers Only</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(value) =>
                          handleSwitchChange("isChatFollowersOnly", value)
                        }
                        disabled={isLoadingUpdate}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </Form>
        )}
      </FormWrapper>
    </div>
  );
}

const ChatSettingsSkeleton = () => {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-10 w-full bg-gray-300 rounded" />
      <Skeleton className="h-10 w-full bg-gray-300 rounded" />
    </div>
  );
};
