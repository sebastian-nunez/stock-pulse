import { Card, Skeleton } from "@nextui-org/react";

export const ProductCardSkeleton = () => {
  return (
    <Card className="w-full space-y-8 p-10" radius="lg">
      <Skeleton className="h-40 rounded-lg " />

      <div className="space-y-6">
        <Skeleton className="h-6 w-3/5 rounded-lg" />

        <Skeleton className="h-3 w-2/5 rounded-lg" />
        <Skeleton className="h-3 w-2/5 rounded-lg" />
      </div>
    </Card>
  );
};

const ProductGridSkeleton = () => {
  const numberOfSkeletons = 12;

  return (
    <div className="grid gap-6 py-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from(Array(numberOfSkeletons).keys()).map((index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
