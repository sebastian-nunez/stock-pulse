import { useAsyncList } from "@react-stately/data";
import { useEffect, useMemo } from "react";
import { sortItemsAscDesc } from "../utils/sorting.js";
import { usePagination } from "./usePagination";

/**
 * (BUGGY!) Hook for managing pagination and sorting logic. It is meant to be used with `useAsyncList`.
 *
 * @param {Array} items - Array of items to paginate and sort
 * @param {number} rowsPerPage - Number of items per page
 * @returns {Object} - Pagination and sorting data and control functions
 * @property {number} currentPage - Current active page
 * @property {number} numberOfPages - Total number of pages
 * @property {Object} sliceRange - Object with start and end indices for slicing items
 * @property {Function} changePage - Function to change the current active page
 * @property {Object} sortedList - Async list object with paginated and sorted items. Contains `items`, `sort`, `sortDescriptor`
 */
export const usePaginatedSortedList = (items, rowsPerPage) => {
  // pagination hook
  const numberOfItems = items?.length || 0;
  const { currentPage, numberOfPages, sliceRange, changePage } = usePagination(
    numberOfItems,
    rowsPerPage,
  );

  // memoized paginated products
  const currentPageItems = useMemo(() => {
    const { start, end } = sliceRange;

    return items?.slice(start, end);
  }, [JSON.stringify(items), sliceRange.start, sliceRange.end]);

  // Async list hook for sorting items
  const sortedList = useAsyncList({
    async load() {
      return {
        items: currentPageItems || [],
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: sortItemsAscDesc(items, sortDescriptor),
      };
    },
  });

  useEffect(() => {
    sortedList.reload();
  }, [items, sortedList]);

  return {
    currentPage,
    numberOfPages,
    sliceRange,
    changePage,
    sortedList,
  };
};
