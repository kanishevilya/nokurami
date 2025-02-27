// FollowingsTable.tsx
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
import {
  useFindMyFollowingsQuery,
  useUnfollowFromChannelMutation,
} from "@/graphql/generated/output";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { Input } from "@/components/ui/shadcn/Input";
import { Button } from "@/components/ui/shadcn/Button";
import { toast } from "sonner";
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
import { useRouter } from "next/navigation";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/shadcn/Select";

export function FollowingsTable() {
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
  }, []);

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

  const { data, loading, refetch } = useFindMyFollowingsQuery({
    variables: {
      data: {
        search: debouncedSearch || undefined,
        skip: (page - 1) * itemsPerPage,
        take: itemsPerPage,
        orderBy: { [sortBy]: sortOrder },
      },
    },
  });

  const [unfollowUser, { loading: unfollowing }] =
    useUnfollowFromChannelMutation({
      onCompleted: () => {
        toast.success("Successfully unfollowed");
        refetch();
      },
      onError: (error) => toast.error(`Error unfollowing: ${error.message}`),
    });

  const followings = data?.findMyFollowings.followings || [];
  const totalCount = data?.findMyFollowings.totalCount || 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handleSort = (column: "username" | "createdAt") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handleUnfollow = (followingId: string) => {
    unfollowUser({
      variables: { channelId: followingId },
    });
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setPage(1);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Followings</CardTitle>
        <CardDescription>View users you follow</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-2">
          <Input
            ref={inputRef}
            placeholder="Search by username..."
            value={search}
            onChange={handleSearchChange}
            className="max-w-sm"
          />
          <Select
            value={itemsPerPage.toString()}
            onValueChange={handleItemsPerPageChange}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Items per page" />
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
              <TableHead className="select-none">Avatar</TableHead>
              <TableHead
                onClick={() => handleSort("username")}
                className="cursor-pointer select-none"
              >
                Username{" "}
                {sortBy === "username" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead
                onClick={() => handleSort("createdAt")}
                className="cursor-pointer select-none"
              >
                Following Since{" "}
                {sortBy === "createdAt" && (sortOrder === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="select-none">Actions</TableHead>
            </TableRow>
          </TableHeader>
          {loading || !data ? (
            <>
              <FollowsSkeleton itemsPerPage={itemsPerPage} />
            </>
          ) : (
            <TableBody>
              {followings.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground"
                  >
                    No followings found
                  </TableCell>
                </TableRow>
              ) : (
                followings.map((following) => (
                  <TableRow key={following.followingId}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={following.following.avatar || ""} />
                        <AvatarFallback>
                          {following.following.username[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{following.following.username}</TableCell>
                    <TableCell>
                      {new Date(following.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="outline" size="default" asChild>
                        <a href={`/channel/${following.following.username}`}>
                          View Channel
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-red-500"
                        size="default"
                        onClick={() => handleUnfollow(following.followingId)}
                        disabled={unfollowing}
                      >
                        {unfollowing ? "Unfollowing..." : "Unfollow"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          )}
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    onClick={() => setPage(p)}
                    isActive={page === p}
                    className="cursor-pointer"
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
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
      </CardContent>
    </Card>
  );
}
