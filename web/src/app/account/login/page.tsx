import { Metadata } from "next";
import { LoginAccountForm } from "@/components/shared/auth/forms/LoginAccountForm";

export const metadata: Metadata = {
  title: "Login Account",
  description: "Login to your account",
};

export default function LoginAccountPage() {
  return <LoginAccountForm />;
}
