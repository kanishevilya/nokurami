"use client";
import HeaderLogo from "./logo/HeaderLogo";
import HeaderMenu from "./menu/HeaderMenu";
import { Nav } from "./nav/Nav";
import SearchField from "./search/SearchField";

export function Header() {
  return (
    <header className="flex h-full items-center gap-x-4 border-b border-border bg-card p-4">
      <HeaderLogo />
      <Nav />
      <SearchField />
      <HeaderMenu />
    </header>
  );
}
