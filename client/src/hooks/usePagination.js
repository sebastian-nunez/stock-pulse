import { useState } from "react";

/**
 * Hook for managing pagination logic.
 *
 * @param {number} totalItems - Total number of items to paginate
 * @param {number} itemsPerPage - Number of items per page
 *
 * @returns {Object} - Pagination data and control functions
 * @property {number} currentPage - Current active page
 * @property {number} numberOfPages - Total number of pages
 * @property {Object} sliceRange - Object with start and end indices for slicing items
 * @property {Function} changePage - Function to change the current active page
 */
export const usePagination = (totalItems, itemsPerPage) => {
  const numberOfPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const sliceRange = {
    start: (currentPage - 1) * itemsPerPage,
    end: currentPage * itemsPerPage,
  };

  const changePage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" }); // scroll to top of page
  };

  return {
    currentPage,
    numberOfPages,
    sliceRange,
    changePage,
  };
};
