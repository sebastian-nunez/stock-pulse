import { Card, Skeleton } from "@nextui-org/react";
import { ResultsWidgetSkeleton } from "./TableSkeleton";

export const ProductCardSkeleton = () => {
  return (
    <Card className="w-full space-y-8 p-4" radius="lg">
      <Skeleton className="h-52 rounded-xl " />

      <div className="space-y-6">
        <div className="flex items-end justify-between">
          <Skeleton className="h-7 w-3/5 rounded-lg" />
          <Skeleton className="h-7 w-1/5 rounded-lg" />
        </div>

        <Skeleton className="h-4 w-1/6 rounded-lg" />

        <div className="item-center flex justify-between">
          <Skeleton className="h-6 w-2/5 rounded-lg" />
          <Skeleton className="h-8 w-16 rounded-full" />
        </div>
      </div>
    </Card>
  );
};

const ProductGridSkeleton = () => {
  const numberOfSkeletons = 12;

  return (
    <div className="flex flex-col gap-3 px-6 py-6 sm:px-0">
      <ResultsWidgetSkeleton />

      <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from(Array(numberOfSkeletons).keys()).map((index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductGridSkeleton;
