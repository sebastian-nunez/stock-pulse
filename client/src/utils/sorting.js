/**
 * Sorts items in ascending or descending order based on the sort descriptor.
 *
 * @param {Array} items - Array of items to sort
 * @param {Object} sortDescriptor - Object with column and direction properties
 *
 * @returns {Array} - Sorted array of items
 */
export const sortItemsAscDesc = (items, sortDescriptor) => {
  return items.sort((a, b) => {
    let first = a[sortDescriptor.column];
    let second = b[sortDescriptor.column];
    let cmp =
      (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

    if (sortDescriptor.direction === "descending") {
      cmp *= -1;
    }

    return cmp;
  });
};
