import { useFindNotificationsByUserQuery } from "@/graphql/generated/output";
import { toast } from "sonner";
import { NotificationItem } from "@/components/layout/header/notifications/NotificationItem";
import { Loader } from "lucide-react";

export const NotificationsList = () => {
  const { refetch } = useFindNotificationsByUserQuery();

  const { data, loading } = useFindNotificationsByUserQuery({
    onCompleted() {
      refetch();
    },
    onError() {
      toast.error("Ошибка при загрузке уведомлений");
    },
  });

  if (loading) {
    return;
  }

  const notifications = data?.findNotificationsByUserId ?? [];

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold pl-3">Уведомления</h2>
      </div>
      {loading ? (
        <Loader className="size-6 animate-spin" />
      ) : (
        <div className="flex flex-col gap-2 mt-2">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                id={notification.id}
                type={notification.type}
                message={notification.message}
                date={notification.createdAt}
              />
            ))
          ) : (
            <div className="text-left pl-3 text-md text-muted-foreground">
              У вас еще нет уведомлений
            </div>
          )}
        </div>
      )}
    </>
  );
};
