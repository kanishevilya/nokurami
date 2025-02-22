import { PropsWithChildren } from "react";
import { Header } from "@/components/layout/header/Header";
import { Sidebar } from "@/components/layout/sidebar/Sidebar";
import { MainLayout } from "./MainLayout";

export default function PublicLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="flex h-full">
      <div className="flex-1">
        <div className="fixed inset-y-0 z-50 h-[75px] w-full">
          <Header />
        </div>
        <Sidebar />
        <MainLayout>{children}</MainLayout>
      </div>
    </div>
  );
}
