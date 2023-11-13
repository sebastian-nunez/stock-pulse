import {
  Chip,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import useFilteredItems from "../hooks/useFilteredItems";
import { usePagination } from "../hooks/usePagination";
import useProducts from "../hooks/useProducts";
import ProductsAPI from "../services/ProductsAPI";
import {
  DEFAULT_ROWS_PER_PAGE_TABLE as DEFAULT_ROWS_PER_PAGE_TABLE_VIEW,
  PRODUCTS_QUERY_KEY,
} from "../utils/constants";
import { convertDatetimeToMMDDYYYY } from "../utils/helpers";
import { sortItemsAscDesc } from "../utils/sorting";
import { Action } from "./ProductCard";
import ProductDetailsModal from "./ProductDetailsModal";
import ProductEditableModal from "./ProductEditableModal";
import ResultsWidget from "./ResultsWidget";
import TableDropdownActionMenu from "./TableDropdownActionMenu";
import TableSkeleton from "./skeletons/TableSkeleton";

// table columns. Key is the column name in the data, label is the visible column name in the table
const columns = [
  { key: "product_id", label: "ID", sortable: true },
  { key: "name", label: "NAME", sortable: true },
  { key: "brand", label: "BRAND", sortable: true },
  { key: "price", label: "PRICE", sortable: true },
  { key: "quantity", label: "QUANTITY", sortable: true },
  { key: "category", label: "CATEGORY", sortable: true },
  { key: "is_available", label: "AVAILABLE", sortable: true },
  { key: "tags", label: "TAGS" },
  { key: "actions", label: "ACTIONS" },
];

const ProductsTable = ({ filterText }) => {
  const queryClient = useQueryClient();

  // modal controls
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedAction, setSelectedAction] = useState(null);

  // state
  const [currentProduct, setCurrentProduct] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(
    DEFAULT_ROWS_PER_PAGE_TABLE_VIEW,
  );

  // retrieve the products (via a FETCH) and sort them
  const sortedList = useAsyncList({
    async load() {
      // IMPORTANT: we have to FETCH to make sure items are available for sorting
      const products = await queryClient.fetchQuery(
        [PRODUCTS_QUERY_KEY],
        async () => {
          return await ProductsAPI.getAllProducts();
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries([PRODUCTS_QUERY_KEY]);
          },
        },
      );

      return {
        items: products,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: sortItemsAscDesc(items, sortDescriptor),
      };
    },
  });

  const { deleteProduct } = useProducts({
    onSuccessAction: () => {
      sortedList.reload(); // reload the list
    },
  });

  // extract the products from the sorted list
  const sortedProducts = sortedList?.items;

  const filteredItems = useFilteredItems(sortedProducts, filterText, [
    "name",
    "brand",
    "category",
  ]);

  const numberOfProducts = filteredItems?.length;

  // pagination
  const { currentPage, numberOfPages, sliceRange, changePage } = usePagination(
    numberOfProducts,
    rowsPerPage,
  );

  // memoized paginated products
  const currentPageItems = useMemo(() => {
    const { start, end } = sliceRange;

    return filteredItems?.slice(start, end);
  }, [JSON.stringify(filteredItems), sliceRange.start, sliceRange.end]);

  const handleView = (product) => {
    setCurrentProduct(product);
    setSelectedAction(Action.VIEW);

    onOpen(); // open the modal
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setSelectedAction(Action.UPDATE);

    onOpen(); // open the modal
  };

  const handleDelete = (productId) => {
    if (!productId) {
      toast.error("Product does not have a valid ID, unable to delete it!");
    }

    deleteProduct.mutate(productId);
  };

  // render the cell based on the column key
  const renderCell = useCallback((product, columnKey) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case "actions":
        return (
          <TableDropdownActionMenu
            product={product}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleView={handleView}
          />
        );
      case "price":
        return `$${cellValue}`;
      case "tags":
        return (
          <div className="flex flex-wrap gap-2">
            {cellValue?.map((tag, idx) => (
              <Chip key={tag + idx} size="sm" color="primary">
                {tag}
              </Chip>
            ))}
          </div>
        );
      case "is_available":
        return cellValue ? "Yes" : "No";
      case "date_added":
        return cellValue ? convertDatetimeToMMDDYYYY(cellValue) : "Unknown";
      default:
        return cellValue;
    }
  }, []);

  const isLoading =
    sortedList.isLoading ||
    deleteProduct.isLoading ||
    (numberOfProducts <= 0 && !filterText); // if there are no products and no filter text, we are loading
  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="flex min-h-screen flex-col justify-between gap-3 px-6 pb-4 drop-shadow-sm sm:px-0">
      <div className="mt-4 flex flex-col gap-2">
        {/* -------------- Table -------------- */}
        <Table
          aria-label="Products Table"
          isHeaderSticky
          isCompact
          onSortChange={sortedList.sort}
          sortDescriptor={sortedList.sortDescriptor}
          topContent={
            <ResultsWidget
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              numberOfResults={numberOfProducts}
              changePage={changePage}
              onRefreshAction={() => sortedList.reload()}
            />
          }
          bottomContent={
            !isLoading &&
            numberOfProducts > 0 && (
              <Pagination
                showControls
                color="primary"
                showShadow
                page={currentPage}
                total={numberOfPages}
                onChange={changePage}
                className="mx-auto"
              />
            )
          }
          classNames={{
            table: "min-h-[400px]",
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.key}
                allowsSorting={column?.sortable === true}
              >
                {column.label}
              </TableColumn>
            )}
          </TableHeader>

          <TableBody
            items={isLoading ? [] : currentPageItems}
            emptyContent={"No rows to display."}
            isLoading={isLoading}
            loadingContent={<Spinner aria-label="Loading..." />}
          >
            {(product, idx) => (
              <TableRow
                key={product?.product_id || idx}
                className="cursor-pointer hover:bg-default-100"
                onClick={() => handleView(product)}
              >
                {(columnKey) => (
                  <TableCell>{renderCell(product, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* -------------- Pagination Controls -------------- */}
      <div className="mt-6 flex w-full justify-center"></div>

      {/* -------------- Modals -------------- */}
      {selectedAction === Action.VIEW && (
        <ProductDetailsModal
          product={currentProduct}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}

      {selectedAction === Action.UPDATE && (
        <ProductEditableModal
          title="Edit Product"
          canDelete={true}
          product={currentProduct}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
    </div>
  );
};

export default ProductsTable;
