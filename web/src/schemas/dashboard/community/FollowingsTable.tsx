// FollowingsTable.tsx
"use client";

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
import { useFindMyFollowingsQuery } from "@/graphql/generated/output";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { FormWrapper } from "@/components/ui/items/FormWrapper";
import { getMediaSource } from "@/utils/get-media-source";

export function FollowingsTable() {
  const { data, loading } = useFindMyFollowingsQuery();

  const followings = data?.findMyFollowings || [];

  return (
    <FormWrapper
      heading="Followings"
      id="followings-table"
      description="View users you follow"
      alwaysOpen={true}
    >
      {loading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <div className="p-6 pb-0">
          {followings.length === 0 ? (
            <p className="text-muted-foreground">
              You are not following anyone yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Avatar</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Following Since</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {followings.map((following) => (
                  <TableRow key={following.followingId}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage
                          src={getMediaSource(following.following.avatar)}
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </FormWrapper>
  );
}
