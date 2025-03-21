"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Copy, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/shadcn/Button";
import { Input } from "@/components/ui/shadcn/Input";
import { useTranslations } from "next-intl";

interface StreamKeyFieldProps {
  label: string;
  value: string;
  isSecret?: boolean;
}

export function StreamKeyField({
  label,
  value,
  isSecret = false,
}: StreamKeyFieldProps) {
  const [showSecret, setShowSecret] = useState(false);
  const t = useTranslations("profile");

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.success(t("copiedToClipboard", { label }));
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            value={value}
            type={isSecret && !showSecret ? "password" : "text"}
            readOnly
            className="pr-20"
          />
          {isSecret && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-10 top-0 h-full px-2"
              onClick={() => setShowSecret(!showSecret)}
              title={showSecret ? t("hideValue") : t("showValue")}
            >
              {showSecret ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-2"
            onClick={handleCopy}
            title={t("copyValue")}
          >
            <Copy className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
