import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  // TODO: implement a proper loading component/skeleton
  if (!products) {
    return <div>Loading...</div>;
  }

  if (products?.length === 0) {
    return (
      <div className="p-6 text-center text-lg tracking-tight">
        No results found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 pb-8">
      {/* --------------- Product Rendering --------------- */}
      <div className="grid gap-6 py-6 md:grid-cols-2 lg:grid-cols-3">
        {products?.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>

      {/* --------------- Pagination Controls --------------- */}
      {/* TODO: implement pagination */}
      <div className="text-center">Pagination Controls</div>
    </div>
  );
};

export default ProductGrid;
