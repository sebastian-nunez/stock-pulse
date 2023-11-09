import { useEffect, useState } from "react";

export const ANY_CATEGORY = "Any";
export const REGEX_MATCH_NON_ALPHA_NUMERIC = /[^a-zA-Z\d]/g; // non-alphanumeric characters ('., etc), so "air max g.t." can match with "airmax gt"
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
    // debounce the filter function
    const timeoutId = setTimeout(() => {
      const filterProducts = products
        ?.filter((product) => {
          // filter by category

          // no category or any category is selected -> return all products
          if (!selectedCategory || selectedCategory === ANY_CATEGORY) {
            return true;
          }

          // product has no category -> filter it out
          if (selectedCategory && !product?.category) {
            return false;
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
            .replace(REGEX_MATCH_NON_ALPHA_NUMERIC, "");

          const normalizedProductName = product.name
            .trim()
            .toLowerCase()
            .replace(REGEX_MATCH_NON_ALPHA_NUMERIC, "");

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
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [products, searchText, selectedCategory, selectedTags]);

  return filteredProducts;
};
