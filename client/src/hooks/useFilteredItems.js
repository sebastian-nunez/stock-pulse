import { useEffect, useMemo, useState } from "react";
import { normalizeText } from "../utils/helpers";

/**
 * Custom hook to filter products by search text, category, and tags
 *
 * @param {Array} items list of items
 * @param {string} searchText search text
 * @param {Array} filterKeys keys to filter items by
 * @returns {Array} filtered items and isFiltering state
 */
const useFilteredItems = (items, searchText, filterKeys) => {
  const [filteredItems, setFilteredItems] = useState(items);
  const [isFiltering, setIsFiltering] = useState(true);

  // memoized normalized search text
  const normalizedSearchText = useMemo(
    () => normalizeText(searchText),
    [searchText],
  );

  const filtered = useMemo(
    () =>
      items?.filter((item) => {
        const itemTokens = filterKeys
          .map((key) => normalizeText(item?.[key]))
          .join("");

        return itemTokens.includes(normalizedSearchText);
      }),
    [JSON.stringify(items), normalizedSearchText, JSON.stringify(filterKeys)],
  );

  useEffect(() => {
    setIsFiltering(true);

    // debounce the filter function
    const timeoutId = setTimeout(() => {
      setFilteredItems(filtered);
      setIsFiltering(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filtered]);

  return { filteredItems, isFiltering };
};

export default useFilteredItems;
