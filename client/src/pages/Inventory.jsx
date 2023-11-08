import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ErrorCard from "../components/ErrorCard";
import InventoryFilters from "../components/InventoryFilters";
import ProductGrid from "../components/ProductGrid";
import { useFilteredProducts } from "../hooks/useFilteredProducts";
import ProductsAPI from "../services/ProductsAPI";
import { PRODUCT_STALE_TIME_MILLISECONDS } from "../utils/constants.js";

const Inventory = () => {
  // state
  const [products, setProducts] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  // react-query
  const productsQuery = useQuery(["products"], ProductsAPI.getAllProducts, {
    staleTime: PRODUCT_STALE_TIME_MILLISECONDS,
  });
  const fetchedProducts = productsQuery.data;

  // save the products to state
  useEffect(() => {
    setProducts(fetchedProducts);
  }, [fetchedProducts]);

  // filter products
  const filteredProducts = useFilteredProducts(products, {
    searchText,
    selectedCategory,
    selectedTags,
  });

  // TODO: make a loading component (skeleton)
  if (productsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (productsQuery.isError) {
    return (
      <ErrorCard
        message="Unable to fetch products, please try again."
        error={productsQuery.error?.message}
      />
    );
  }

  return (
    <>
      {/* -------------------- Filters --------------------- */}
      <InventoryFilters
        setSearchText={setSearchText}
        setSelectedCategory={setSelectedCategory}
        setSelectedTags={setSelectedTags}
        searchText={searchText}
      />

      {/* ------------------- Product Grid ------------------- */}
      <div className="mx-break-out min-h-screen bg-neutral-50">
        {/* Change the full width background color */}
        <div className="container">
          {<ProductGrid products={filteredProducts} />}
        </div>
      </div>
    </>
  );
};

export default Inventory;
