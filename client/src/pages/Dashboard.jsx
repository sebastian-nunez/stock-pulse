import { useState } from "react";
import { useQuery } from "react-query";
import ErrorCard from "../components/ErrorCard";
import ProductsTable from "../components/ProductsTable";
import ProductsAPI from "../services/ProductsAPI";
import { PRODUCTS_QUERY_KEY } from "../utils/constants";

const Item = {
  PRODUCT: "Product",
  CATEGORY: "Category",
  TAG: "Tag",
};

const Dashboard = () => {
  const [selectedItem, setSelectedItem] = useState(Item.PRODUCT);

  // react-query
  const productsQuery = useQuery(
    [PRODUCTS_QUERY_KEY],
    ProductsAPI.getAllProducts,
  );
  const products = productsQuery.data;
  const numberOfProducts = products?.length;

  if (productsQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (productsQuery.isError) {
    return (
      <ErrorCard
        message="Unable to fetch products, please try again."
        error={productsQuery?.error?.message}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">Filters</div>

      {/* ----------------- display total rows ------------------ */}
      <div className="flex items-center justify-between">
        <span className="text-small text-default-400">
          Total {numberOfProducts} products
        </span>

        <label className="flex items-center text-small text-default-400">
          Rows per page:
          <select
            className="bg-transparent text-small text-default-400 outline-none"
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="15">25</option>
          </select>
        </label>
      </div>

      {/* ----------------- products table ------------------ */}
      {selectedItem === Item.PRODUCT && <ProductsTable products={products} />}
    </div>
  );
};

export default Dashboard;
