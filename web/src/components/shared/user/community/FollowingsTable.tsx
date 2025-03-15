
"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import debounce from "lodash/debounce";
import {
  useFindMyFollowingsQuery,
  useUnfollowFromChannelMutation,
} from "@/graphql/generated/output";
import { toast } from "sonner";
import { UserTable } from "./UserTable";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/Avatar";
import { Button } from "@/components/ui/shadcn/Button";
import { TableCell } from "@/components/ui/shadcn/Table";
import { TableRow } from "@/components/ui/shadcn/Table";
import { ActionDropdown } from "@/components/ui/shadcn/ActionDropdown";
import { getMediaSource } from "@/utils/get-media-source";

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

  const handleUnfollow = (followingId: string) => {
    unfollowUser({
      variables: { channelId: followingId },
    });
  };

  return (
    <UserTable
      title="Followings"
      description="View users you follow"
      data={followings}
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
      renderRow={(following) => (
        <TableRow key={following.followingId}>
          <TableCell>
            <Avatar>
              <AvatarImage
                src={getMediaSource(following.following.avatar) || ""}
              />
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
            <ActionDropdown
              actions={[
                {
                  label: "View Channel",
                  onClick: () =>
                    (window.location.href = `/${following.following.username}`),
                },
                {
                  label: "Unfollow",
                  onClick: () =>
                    unfollowUser({
                      variables: { channelId: following.followingId },
                    }),
                  disabled: unfollowing,
                },
              ]}
            />
            {










}
          </TableCell>
        </TableRow>
      )}
    />
  );
}
