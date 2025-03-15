"use client";

import { useState, useCallback, useRef, useEffect, JSX } from "react";
import debounce from "lodash/debounce";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/Table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/Avatar";
import { Input } from "@/components/ui/shadcn/Input";
import { Button } from "@/components/ui/shadcn/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/shadcn/Card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/shadcn/Pagination";
import { FollowsSkeleton } from "./FollowsSkeleton";
import { useTranslations } from "next-intl";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/Select";

interface UserTableProps {
  title: string;
  description: string;
  data: any[];
  loading: boolean;
  totalCount: number;
  itemsPerPage: number;
  page: number;
  onSearchChange: (value: string) => void;
  onSort: (column: string) => void;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (value: number) => void;
  renderRow: (item: any) => JSX.Element;
}

export function UserTable({
  title,
  description,
  data,
  loading,
  totalCount,
  itemsPerPage,
  page,
  onSearchChange,
  onSort,
  onPageChange,
  onItemsPerPageChange,
  renderRow,
}: UserTableProps) {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const t = useTranslations("profile");
  const commonT = useTranslations("common");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      onSearchChange(value);
    }, 300),
    [onSearchChange]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSetSearch(e.target.value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-2">
          <Input
            ref={inputRef}
            placeholder={t("searchByUsername")}
            value={search}
            onChange={handleSearchChange}
            className="max-w-sm"
          />
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => onItemsPerPageChange(Number(value))}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder={t("itemsPerPage")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="select-none">{t("avatar")}</TableHead>
              <TableHead
                onClick={() => onSort("username")}
                className="cursor-pointer select-none"
              >
                {t("username")}
              </TableHead>
              <TableHead
                onClick={() => onSort("createdAt")}
                className="cursor-pointer select-none"
              >
                {t("followedSince")}
              </TableHead>
              <TableHead className="select-none">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          {loading ? (
            <FollowsSkeleton itemsPerPage={itemsPerPage} />
          ) : (
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground"
                  >
                    {t("noUsersFound")}
                  </TableCell>
                </TableRow>
              ) : (
                data.map(renderRow)
              )}
            </TableBody>
          )}
        </Table>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(Math.max(1, page - 1))}
                className={
                  page === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  onClick={() => onPageChange(p)}
                  isActive={page === p}
                  className="cursor-pointer"
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                className={
                  page === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
}
