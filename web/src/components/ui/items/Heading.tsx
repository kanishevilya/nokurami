interface HeadingProps {
  title: string;
  description?: string;
  size?: "sm" | "md" | "lg";
}

export function Heading({ title, description, size = "md" }: HeadingProps) {
  const titleSizes = {
    sm: "text-xl font-semibold",
    md: "text-2xl font-semibold",
    lg: "text-3xl font-semibold",
  };

  const descriptionSizes = {
    sm: "text-sm text-muted-foreground",
    md: "text-base text-muted-foreground",
    lg: "text-lg text-muted-foreground",
  };

  return (
    <div className="flex flex-col gap-1">
      <h1 className={titleSizes[size]}>{title}</h1>
      {description && <p className={descriptionSizes[size]}>{description}</p>}
    </div>
  );
}
