import { Pagination } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { usePagination } from "../hooks/usePagination";
import { DEFAULT_ROWS_PER_PAGE_CARD as DEFAULT_ROWS_PER_PAGE_CARD_VIEW } from "../utils/constants";
import ProductCard from "./ProductCard";
import ResultsWidget from "./ResultsWidget";

const ProductGrid = ({ products }) => {
  // state
  const numberOfProducts = products?.length;
  const [rowsPerPage, setRowsPerPage] = useState(
    DEFAULT_ROWS_PER_PAGE_CARD_VIEW,
  );

  // pagination
  const { currentPage, numberOfPages, sliceRange, changePage } = usePagination(
    numberOfProducts,
    rowsPerPage,
  );

  // memoized paginated products
  const paginatedProducts = useMemo(() => {
    const { start, end } = sliceRange;

    return products.slice(start, end);
  }, [JSON.stringify(products), sliceRange.start, sliceRange.end]);

  if (!products || products?.length === 0) {
    return (
      <div className="p-6 text-center text-lg tracking-tight">
        No results found.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col justify-between gap-3 px-6 pb-8 sm:px-0">
      <div className="mt-4 flex flex-col gap-2">
        {/* ---------- Result Widget  ---------- */}
        <ResultsWidget
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          numberOfResults={numberOfProducts}
          changePage={changePage}
        />

        {/* ---------- Product Rendering ---------- */}
        <div className="grid gap-6 pb-6 md:grid-cols-2 lg:grid-cols-3">
          {paginatedProducts?.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
      </div>

      {/* ----------- Pagination Controls --------- */}
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
