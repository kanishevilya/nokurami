"use client";

import { useState, useCallback, useRef, useEffect } from "react";
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
import { useFindMyFollowersQuery } from "@/graphql/generated/output";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
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
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/shadcn/Select";
import { UserTable } from "./UserTable";
import { ActionDropdown } from "@/components/ui/shadcn/ActionDropdown";
import { getMediaSource } from "@/utils/get-media-source";
import { useTranslations } from "next-intl";

export function FollowersTable() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState<{
    column: "username" | "createdAt";
    direction: "asc" | "desc";
  }>({
    column: "createdAt",
    direction: "desc",
  });
  const t = useTranslations("profile");

  const { data, loading, refetch } = useFindMyFollowersQuery({
    variables: {
      data: {
        search: debouncedSearch,
        take: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        orderBy: {
          [sortOrder.column]: sortOrder.direction === "asc" ? 1 : -1,
        },
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  const totalCount = data?.findMyFollowers?.totalCount || 0;
  const followers = data?.findMyFollowers?.followers || [];

  const handleSort = (column: "username" | "createdAt") => {
    setSortOrder((prev) => ({
      column,
      direction:
        prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setPage(1);
  };

  return (
    <UserTable
      title={t("followers")}
      description={t("followersDescription")}
      data={followers}
      loading={loading}
      totalCount={totalCount}
      itemsPerPage={itemsPerPage}
      page={page}
      onSearchChange={(value) => {
        setDebouncedSearch(value);
        setPage(1);
      }}
      onSort={(column) => handleSort(column as "username" | "createdAt")}
      onPageChange={setPage}
      onItemsPerPageChange={handleItemsPerPageChange}
      renderRow={(follower) => (
        <TableRow key={follower.follower.username}>
          <TableCell>
            <Avatar>
              <AvatarImage
                src={getMediaSource(follower.follower.avatar) || ""}
              />
              <AvatarFallback>
                {follower.follower.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </TableCell>
          <TableCell>{follower.follower.username}</TableCell>
          <TableCell>
            {new Date(follower.createdAt).toLocaleDateString()}
          </TableCell>
          <TableCell>
            <ActionDropdown
              actions={[
                {
                  label: t("viewChannel"),
                  onClick: () =>
                    (window.location.href = `/${follower.follower.username}`),
                },
              ]}
            />
          </TableCell>
        </TableRow>
      )}
    />
  );
}
