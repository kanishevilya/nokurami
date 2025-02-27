// FollowersTable.tsx
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
import { useFindMyFollowersQuery } from "@/graphql/generated/output";
import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { FormWrapper } from "@/components/ui/items/FormWrapper";

export function FollowersTable() {
  const { data, loading } = useFindMyFollowersQuery();

  const followers = data?.findMyFollowers || [];

  return (
    <FormWrapper
      heading="Followers"
      id="followers-table"
      description="View users who follow you"
      alwaysOpen={true}
    >
      {loading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <div className="p-6 pb-0">
          {followers.length === 0 ? (
            <p className="text-muted-foreground">You have no followers yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Avatar</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Followed Since</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {followers.map((follower: any) => (
                  <TableRow key={follower.follower.username}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={follower.follower.avatar} />
                        <AvatarFallback>
                          {follower.follower.username[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{follower.follower.username}</TableCell>
                    <TableCell>
                      {new Date(follower.createdAt).toLocaleDateString()}
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
