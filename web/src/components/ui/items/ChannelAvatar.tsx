import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn/Avatar";
import { getMediaSource } from "@/utils/get-media-source";

const avatarVariants = cva("relative rounded-full transition-all", {
  variants: {
    size: {
      xs: "size-6",
      sm: "size-8",
      default: "size-10",
      md: "size-12",
      lg: "size-16",
      xl: "size-36",
    },
    status: {
      online: "ring-2 ring-emerald-500 ring-offset-2",
      offline: "ring-2 ring-gray-200 ring-offset-2 opacity-75",
      live: "ring-2 ring-red-500 ring-offset-2 animate-pulse",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface ChannelAvatarProps extends VariantProps<typeof avatarVariants> {
  channel: {
    username: string;
    avatar?: string | null;
  };
  className?: string;
}

export function ChannelAvatar({
  size,
  status,
  channel,
  className,
}: ChannelAvatarProps) {
  console.log(channel.avatar);
  return (
    <Avatar className={cn(avatarVariants({ size, status }), className)}>
      <AvatarImage
        className="object-cover"
        src={getMediaSource(channel.avatar)}
      />
      <AvatarFallback
        className={cn(
          "bg-gradient-to-br from-neutral-700 to-neutral-900",
          size === "xl" && "text-4xl",
          size === "lg" && "text-2xl",
          size === "md" && "text-xl",
          size === "sm" && "text-sm",
          size === "xs" && "text-xs"
        )}
      >
        {channel.username[0].toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
