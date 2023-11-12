import React, { useState } from "react";
import { useQuery } from "react-query";
import BackgroundGradient from "../components/BackgroundGradient";
import BrowserFilters from "../components/BrowserFilters";
import ErrorCard from "../components/ErrorCard";
import ProductGrid from "../components/ProductGrid";
import ProductGridSkeleton from "../components/skeletons/ProductGridSkeleton";
import { useFilteredProducts } from "../hooks/useFilteredProducts";
import ProductsAPI from "../services/ProductsAPI";

const Browser = () => {
  // state
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  // react-query
  const productsQuery = useQuery(["products"], ProductsAPI.getAllProducts);
  const products = productsQuery.data;

  // filter products
  const filteredProducts = useFilteredProducts(products, {
    searchText,
    selectedCategory,
    selectedTags,
  });

  if (productsQuery.isError) {
    return (
      <ErrorCard
        message="Unable to fetch products, please try again."
        error={productsQuery.error?.message}
      />
    );
  }

  return (
    <div className="py-4">
      {/* -------------------- Filters --------------------- */}
      <BrowserFilters
        searchText={searchText}
        setSearchText={setSearchText}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* ------------------- Product Grid ------------------- */}
      <div className="min-h-screen ">
        {/* Change the full width background color */}
        {!filteredProducts || productsQuery.isFetching ? (
          <ProductGridSkeleton />
        ) : (
          <ProductGrid products={filteredProducts} />
        )}
      </div>

      {/* ------------- Blurred Background -------------- */}
      <BackgroundGradient variant="subtle" />
    </div>
  );
};

export default Browser;
