
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

export function FollowersTable() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<"username" | "createdAt">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [debouncedSearch]);

  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setDebouncedSearch(value);
      setPage(1);
    }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSetSearch(e.target.value);
  };

  const { data, loading } = useFindMyFollowersQuery({
    variables: {
      data: {
        search: debouncedSearch || undefined,
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        orderBy: { [sortBy]: sortOrder },
      },
    },
  });

  const followers = data?.findMyFollowers.followers || [];
  const totalCount = data?.findMyFollowers.totalCount || 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handleSort = (column: "username" | "createdAt") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setPage(1);
  };

  return (
    <UserTable
      title="Followers"
      description="View users who follow you"
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
                  label: "View Channel",
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
