import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  if (!products) {
    return <div>No products available!</div>;
  }

  return (
    <>
      {/* --------------- Product Rendering --------------- */}
      <div className="my-3 grid gap-6 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>

      {/* --------------- Pagination Controls --------------- */}
      {/* TODO: implement pagination */}
      <div>Pagination Controls</div>
    </>
  );
};

export default ProductGrid;
