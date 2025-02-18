import { VerifyAccountForm } from "@/components/shared/auth/forms/VerifyAccountForm";
import { redirect } from "next/navigation";

export default async function VerifyAccountPage(props: {
  searchParams: Promise<{ token: string }>;
}) {
  const searchParams = await props.searchParams;

  if (!searchParams.token) {
    return redirect("/account/create");
  }

  return <VerifyAccountForm />;
}
