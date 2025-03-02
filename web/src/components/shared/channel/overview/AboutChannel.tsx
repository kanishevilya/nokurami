import { FindChannelByUsernameQuery } from "@/graphql/generated/output";
import Link from "next/link";

interface AboutChannelProps {
  channel: FindChannelByUsernameQuery["findChannelByUsername"];
}

export function AboutChannel({ channel }: AboutChannelProps) {
  const socialLinks = channel.socialLinks || [];

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-foreground">About channel</h3>
      <p className="text-sm text-muted-foreground">
        {channel.information || "Channel description is missing"}
      </p>
      {socialLinks.length > 0 && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-foreground">
            Social links
          </h4>
          <ul className="mt-2 space-y-2">
            {socialLinks.map((link) => (
              <li key={link.id} className="flex items-center gap-2">
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
