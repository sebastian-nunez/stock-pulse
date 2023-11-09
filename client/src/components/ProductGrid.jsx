import { Pagination } from "@nextui-org/react";
import { usePagination } from "../hooks/usePagination";
import { PRODUCTS_PER_PAGE } from "../utils/constants";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  // state
  const numberOfProducts = products?.length;

  // pagination
  const { currentPage, numberOfPages, sliceRange, changePage } = usePagination(
    numberOfProducts,
    PRODUCTS_PER_PAGE,
  );

  if (!products || products?.length === 0) {
    return (
      <div className="p-6 text-center text-lg tracking-tight">
        No results found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 px-6 pb-8 sm:px-0">
      {/* --------------- Product Rendering --------------- */}
      <div className="grid gap-6 py-6 md:grid-cols-2 lg:grid-cols-3">
        {products?.slice(sliceRange.start, sliceRange.end).map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>

      {/* --------------- Pagination Controls --------------- */}
      <div className="flex justify-center ">
        <div className="rounded-lg border bg-white p-4 drop-shadow-sm">
          <Pagination
            showControls
            initialPage={1}
            total={numberOfPages}
            page={currentPage}
            onChange={changePage}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
