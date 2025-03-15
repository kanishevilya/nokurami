import { FindChannelByUsernameQuery } from "@/graphql/generated/output";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface AboutChannelProps {
  channel: FindChannelByUsernameQuery["findChannelByUsername"];
}

export function AboutChannel({ channel }: AboutChannelProps) {
  const socialLinks = channel.socialLinks || [];
  const t = useTranslations("profile");

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-foreground">
        {t("aboutChannel")}
      </h3>
      <p className="text-sm text-muted-foreground">
        {channel.information || t("noChannelDescription")}
      </p>
      {socialLinks.length > 0 && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-foreground">
            {t("socialLinks")}
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
