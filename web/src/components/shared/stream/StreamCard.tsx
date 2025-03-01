import Link from "next/link";
import Image from "next/image";
import { getMediaSource } from "@/utils/get-media-source";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

interface StreamCardProps {
  stream: {
    previewUrl?: string | null;
    title: string;
    isLive: boolean;
    user: {
      username: string;
      avatar?: string | null;
    };
    category: {
      title: string;
      slug: string;
    };
  };
}

export function StreamCard({ stream }: StreamCardProps) {
  const { previewUrl, title, isLive, user, category } = stream;

  return (
    <Link
      href={`/${user.username}`}
      className="group relative block w-full max-w-[480px] rounded-lg shadow-md bg-card overflow-hidden"
    >
      <div className="relative w-full h-[200px]">
        <Image
          src={getMediaSource(previewUrl)}
          alt={title}
          fill
          className="object-cover rounded-t-lg z-0"
        />
        {!isLive && (
          <div className="absolute inset-0 transition-opacity duration-400 bg-gray-800/70 rounded-lg" />
        )}
        <div className="absolute inset-0 z-10 overflow-hidden rounded-t-lg">
          <div className="absolute inset-y-0 left-0 bg-primary text-transparent flex items-center justify-center w-0 group-hover:w-full group-hover:text-primary-foreground transition-all duration-150 ease-out">
            <span className="text-md font-semibold">
              {isLive ? "Перейти на стрим" : "Перейти на канал"}
            </span>
          </div>
        </div>
        {isLive ? (
          <div className="absolute top-2 left-2 flex items-center gap-1 z-20">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="px-2 py-1 text-xs font-semibold bg-primary transition-colors text-white rounded-full shadow-sm">
              LIVE
            </span>
          </div>
        ) : (
          <div className="absolute top-2 left-2 px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full z-20">
            Оффлайн
          </div>
        )}
      </div>

      <div className="p-4 space-y-2 bg-card rounded-b-lg z-10">
        <h3 className="text-md font-semibold text-foreground line-clamp-1">
          {title}
        </h3>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage
                className="rounded-full"
                src={getMediaSource(user.avatar || "")}
              />
              <AvatarFallback className="flex w-8 h-8 items-center justify-center bg-muted text-foreground rounded-full text-sm font-medium">
                {user.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm text-muted-foreground">{user.username}</p>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">
            <span className="font-medium text-primary">{category.title}</span>
          </p>
        </div>
      </div>

      <div className="absolute inset-0 rounded-lg pointer-events-none z-10">
        <div
          className="absolute inset-0 w-0 border-2 border-transparent group-hover:border-primary group-hover:w-full transition-all duration-150 ease-out rounded-lg"
          style={{ transformOrigin: "left" }}
        />
      </div>
    </Link>
  );
}
