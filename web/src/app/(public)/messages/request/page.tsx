"use client";

import { ChatRequestPage } from "@/components/shared/chat/private-messages/ChatRequestPage";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  return <ChatRequestPage usernameParam={username || ""} />;
}
