"use client";
import HeaderLogo from "./HeaderLogo";
import HeaderMenu from "./HeaderMenu";
import SearchField from "./SearchField";

export function Header() {
  return (
    <header className="flex h-full items-center gap-x-4 border-b border-border bg-card p-4">
      <HeaderLogo />
      <SearchField />
      <HeaderMenu />
    </header>
  );
}
