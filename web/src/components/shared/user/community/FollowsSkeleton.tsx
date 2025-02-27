import { Skeleton } from "@/components/ui/shadcn/Skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/shadcn/Table";

export function FollowsSkeleton({ itemsPerPage }: { itemsPerPage: number }) {
  return (
    <TableBody>
      {Array.from({ length: itemsPerPage }, (_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton key={i} className="h-10 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton key={i} className="h-10 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton key={i} className="h-10 w-full" />
          </TableCell>
          <TableCell>
            <Skeleton key={i} className="h-10 w-full" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
