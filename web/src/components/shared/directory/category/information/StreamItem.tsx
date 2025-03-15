import Link from "next/link";
import Image from "next/image";
import { getMediaSource } from "@/utils/get-media-source";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/Avatar";
import { useTranslations } from "next-intl";

interface StreamItemProps {
  previewUrl: string;
  title: string;
  username: string;
  isLive: boolean;
  user: {
    username: string;
    avatar?: string | null;
  };
  category: {
    title: string;
    slug: string;
  };
}

export function StreamItem({
  previewUrl,
  title,
  username,
  isLive,
  user,
  category,
}: StreamItemProps) {
  const t = useTranslations("streams");

  return (
    <Link
      href={`/${username}`}
      className="group relative block w-full max-w-[300px] rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl bg-card hover:-translate-y-1"
    >
      <div className="relative w-full h-[200px] overflow-hidden">
        <Image
          src={getMediaSource(previewUrl)}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {isLive ? (
          <div className="absolute inset-0 ">
            <span className="absolute top-3 right-3 px-3 py-1 text-sm font-semibold bg-primary text-white rounded-full shadow-md">
              {t("live")}
            </span>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gray-800/80 transition-opacity ">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-muted-foreground text-lg font-medium bg-card px-4 py-2 rounded-full shadow-sm">
                {t("offline")}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-base font-medium truncate">{title}</h3>
        <div className="mt-2 flex items-center gap-2">
          <Avatar className="h-5 w-5">
            <AvatarImage src={getMediaSource(user.avatar)} />
            <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground truncate">
            {username}
          </span>
        </div>
        <div className="mt-2 text-xs font-medium text-primary">
          {category.title}
        </div>
      </div>
    </Link>
  );
}
