import { PropsWithChildren } from "react";
import { Header } from "@/components/layout/header/Header";

export default function PublicLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <div className="fixed inset-y-0 z-50 h-[75px] w-full">
          <Header />
        </div>
        <main className="mt-[75px]">{children}</main>
      </div>
    </div>
  );
}
