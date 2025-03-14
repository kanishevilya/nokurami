import Link from "next/link";
import Image from "next/image";
import { getMediaSource } from "@/utils/get-media-source";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/Avatar";

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
              LIVE
            </span>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gray-800/80 transition-opacity ">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-muted-foreground text-lg font-medium bg-card px-4 py-2 rounded-full shadow-sm">
                Оффлайн
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>

        <div className="flex items-center gap-2">
          <Avatar className="w-9 h-9 text-muted-foreground shadow-md transition-transform duration-300 group-hover:scale-110">
            <AvatarImage src={getMediaSource(user.avatar || "")} />
            <AvatarFallback className="flex items-center justify-center bg-muted text-foreground rounded-full">
              {user.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p className="text-md text-muted-foreground group-hover:text-foreground transition-colors duration-300">
            {user.username}
          </p>
        </div>

        <p className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 line-clamp-1">
          <span className="font-medium text-primary">{category.title}</span> (
          {category.slug})
        </p>
      </div>
    </Link>
  );
}
