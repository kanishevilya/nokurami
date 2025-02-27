// FollowersTable.tsx
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

export function FollowersTable() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<"username" | "createdAt">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const itemsPerPage = 4;

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Followers</CardTitle>
        <CardDescription>View users who follow you</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Input
          ref={inputRef}
          placeholder="Search by username..."
          value={search}
          onChange={handleSearchChange}
          className="max-w-sm"
        />
        {loading || !data ? (
          <FollowsSkeleton itemsPerPage={itemsPerPage} />
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Avatar</TableHead>
                  <TableHead
                    onClick={() => handleSort("username")}
                    className="cursor-pointer"
                  >
                    Username{" "}
                    {sortBy === "username" && (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead
                    onClick={() => handleSort("createdAt")}
                    className="cursor-pointer"
                  >
                    Followed Since{" "}
                    {sortBy === "createdAt" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {followers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-muted-foreground"
                    >
                      No followers found
                    </TableCell>
                  </TableRow>
                ) : (
                  followers.map((follower) => (
                    <TableRow key={follower.follower.username}>
                      <TableCell>
                        <Avatar>
                          <AvatarImage src={follower.follower.avatar || ""} />
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
                        <Button variant="outline" size="default" asChild>
                          <a href={`/channel/${follower.follower.username}`}>
                            View Channel
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className={
                        page === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <PaginationItem key={p}>
                        <PaginationLink
                          onClick={() => setPage(p)}
                          isActive={page === p}
                          className="cursor-pointer"
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      className={
                        page === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

function FollowsSkeleton({ itemsPerPage }: { itemsPerPage: number }) {
  return <div></div>;
}
