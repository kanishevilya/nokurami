import { PropsWithChildren } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn/Card";

interface FormWrapperProps {
  heading: string;
}

export function FormWrapper({
  children,
  heading,
}: PropsWithChildren<FormWrapperProps>) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{heading}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">{children}</CardContent>
    </Card>
  );
}
