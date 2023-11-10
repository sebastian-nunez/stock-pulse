import { Card, Skeleton } from "@nextui-org/react";
export const ResultsWidgetSkeleton = () => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-1">
        <Skeleton className="h-6 w-14 rounded" />
        <Skeleton className="h-6 w-6 rounded" />
      </div>

      <div className="flex gap-2">
        <Skeleton className="h-6 w-24 rounded" />
        <Skeleton className="h-6 w-8 rounded" />
        <Skeleton className="h-6 w-5 rounded" />
      </div>
    </div>
  );
};

export const PaginationControlsSkeleton = () => {
  return <Skeleton className="mx-auto mb-6 mt-3 h-12 w-2/5 rounded-lg" />;
};

export const RowSkeleton = () => {
  return (
    <div className="flex gap-3">
      <Skeleton className="h-10 w-64 rounded" />
      <Skeleton className="h-10 w-64 rounded" />
      <Skeleton className="h-10 w-16 rounded" />
      <Skeleton className="h-10 w-32 rounded" />
      <Skeleton className="h-10 w-32 rounded" />
      <Skeleton className="h-10 w-96 rounded" />
    </div>
  );
};

export const TableCardSkeleton = ({ numberOfRows }) => {
  return (
    <Card className="flex flex-col gap-6 p-6">
      <Skeleton className="h-10 w-full rounded" />
      {Array.from({ length: numberOfRows }, (_, index) => (
        <RowSkeleton key={index} />
      ))}
    </Card>
  );
};

const TableSkeleton = () => {
  return (
    <div className="mt-3 flex flex-col gap-3 px-6 py-6 sm:px-0">
      <ResultsWidgetSkeleton />

      <TableCardSkeleton numberOfRows={12} />

      <PaginationControlsSkeleton />
    </div>
  );
};

export default TableSkeleton;
