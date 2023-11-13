import { useEffect, useMemo, useState } from "react";
import { normalizeText } from "../utils/helpers";

/**
 * Custom hook to filter products by search text and filter keys
 *
 * @param {Array} items list of items
 * @param {string} searchText search text
 * @param {Array} filterBy keys to filter items by
 * @returns {Array} filtered items
 */
const useFilteredItems = (items, searchText, filterBy) => {
  const [filteredItems, setFilteredItems] = useState(items);

  // memoized normalized search text
  const normalizedSearchText = useMemo(
    () => normalizeText(searchText),
    [searchText],
  );

  const filtered = useMemo(
    () =>
      items?.filter((item) => {
        const itemTokens = filterBy
          .map((key) => normalizeText(item?.[key]))
          .join("");

        return itemTokens.includes(normalizedSearchText);
      }),
    [JSON.stringify(items), normalizedSearchText, JSON.stringify(filterBy)],
  );

  useEffect(() => {
    // debounce the filter function
    const timeoutId = setTimeout(() => {
      setFilteredItems(filtered);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filtered]);

  return filteredItems;
};

export default useFilteredItems;
