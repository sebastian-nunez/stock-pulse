import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  // TODO: implement a proper loading component/skeleton
  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* --------------- Product Rendering --------------- */}
      <div className="grid gap-6 py-6 md:grid-cols-2 lg:grid-cols-3">
        {products?.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>

      {/* --------------- Pagination Controls --------------- */}
      {/* TODO: implement pagination */}
      <div className="py-3 pb-8">Pagination Controls</div>
    </>
  );
};

export default ProductGrid;
