import { useEffect, useState } from "react";
import { normalizeText } from "../utils/helpers";

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
            normalizeText(product.category) === normalizeText(selectedCategory)
          );
        })
        .filter((product) => {
          // filter by search text
          const normalizedSearchText = normalizeText(searchText);
          const normalizedProductName = normalizeText(product?.name);
          const normalizedProductBrand = normalizeText(product?.brand);

          const productTokens = normalizedProductBrand + normalizedProductName;

          return productTokens.includes(normalizedSearchText);
        })
        .filter((product) => {
          // filter by tags
          if (!selectedTags?.length) {
            return true;
          }

          // every selected tag must be included in product's tags list
          const productTags = product.tags;
          return selectedTags.every((tag) => productTags.includes(tag));
        });

      setFilteredProducts(filterProducts);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [products, searchText, selectedCategory, selectedTags]);

  return filteredProducts;
};
