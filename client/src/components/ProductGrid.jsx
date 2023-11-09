import { Pagination } from "@nextui-org/react";
import { useState } from "react";
import { PRODUCTS_PER_PAGE } from "../utils/constants";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  // state
  const numberOfProducts = products?.length;
  const numberOfPages = Math.ceil(numberOfProducts / PRODUCTS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

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
        {products
          ?.slice(
            // slice the array to only show the products for the current page
            (currentPage - 1) * PRODUCTS_PER_PAGE,
            currentPage * PRODUCTS_PER_PAGE,
          )
          .map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
      </div>

      {/* --------------- Pagination Controls --------------- */}
      <div className="flex justify-center ">
        <div className="rounded-lg border bg-white p-4 drop-shadow-sm">
          <Pagination
            showControls
            total={numberOfPages}
            initialPage={1}
            page={currentPage}
            onChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, left: 0, behavior: "instant" });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
