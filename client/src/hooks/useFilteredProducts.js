import { useEffect, useState } from "react";

export const ANY_CATEGORY = "Any";

/**
 * Custom hook to filter products by search text, category, and tags
 *
 * @param {Array} products list of products
 * @param {Object} filters object containing searchText, selectedCategory, and selectedTags
 * @returns {Array} filtered products
 */
export const useFilteredProducts = (
  products,
  { searchText, selectedCategory, selectedTags },
) => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const filterProducts = products
      ?.filter((product) => {
        // filter by category
        if (!selectedCategory || selectedCategory === ANY_CATEGORY) {
          return true;
        }

        return (
          product.category.trim().toLowerCase() ===
          selectedCategory.trim().toLowerCase()
        );
      })
      .filter((product) => {
        // filter by search text
        const normalizedSearchText = searchText
          .trim()
          .toLowerCase()
          .replace(/\s+/g, ""); // remove all whitespace, so "air max" can match with "airmax"

        const normalizedProductName = product.name
          .trim()
          .toLowerCase()
          .replace(/\s+/g, ""); // remove all whitespace

        return normalizedProductName.includes(normalizedSearchText);
      })
      .filter((product) => {
        // filter by tags
        if (!selectedTags?.length) {
          return true;
        }

        const productTags = product.tags;
        return selectedTags.every((tag) => productTags.includes(tag));
      });

    setFilteredProducts(filterProducts);
  }, [products, searchText, selectedCategory, selectedTags]);

  return filteredProducts;
};
