import { Pagination, Tooltip } from "@nextui-org/react";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { usePagination } from "../hooks/usePagination";
import { PRODUCTS_QUERY_KEY } from "../utils/constants";
import ProductCard from "./ProductCard";

const rowsPerPageOptions = [18, 24, 30, 42, 54, 72, 96];

const ProductGrid = ({ products }) => {
  // state
  const queryClient = useQueryClient();
  const numberOfProducts = products?.length;
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  // pagination
  const { currentPage, numberOfPages, sliceRange, changePage } = usePagination(
    numberOfProducts,
    rowsPerPage,
  );

  if (!products || products?.length === 0) {
    return (
      <div className="p-6 text-center text-lg tracking-tight">
        No results found.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col justify-between gap-3 px-6 pb-8 sm:px-0">
      <div className="mt-4 flex items-center justify-between">
        <span className="text-small text-default-400">
          Results: {numberOfProducts}
        </span>

        <div className="flex items-center ">
          <label className="text-small text-default-400">
            Rows per page:
            <select
              aria-label="Select items per page"
              className="bg-transparent text-small text-default-400 outline-none"
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
            >
              {rowsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <Tooltip content="Refresh">
            <button
              className="ml-3 rounded-lg p-1 text-small text-default-400 hover:bg-gray-100 active:text-default-500"
              onClick={() => {
                queryClient.invalidateQueries([PRODUCTS_QUERY_KEY]);
                changePage(1);
              }}
            >
              <RefreshCcw width={20} height={20} />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* --------------- Product Rendering --------------- */}
      <div className="grid gap-6 pb-6 md:grid-cols-2 lg:grid-cols-3">
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
