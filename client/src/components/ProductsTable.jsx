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
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { usePagination } from "../hooks/usePagination";
import useProducts from "../hooks/useProducts";
import ProductsAPI from "../services/ProductsAPI";
import {
  DEFAULT_ROWS_PER_PAGE_TABLE as DEFAULT_ROWS_PER_PAGE_TABLE_VIEW,
  PRODUCTS_QUERY_KEY,
} from "../utils/constants";
import { convertDatetimeToMMDDYYYY } from "../utils/types";
import ErrorCard from "./ErrorCard";
import { Action } from "./ProductCard";
import ProductDetailsModal from "./ProductDetailsModal";
import ProductEditableModal from "./ProductEditableModal";
import ResultsWidget from "./ResultsWidget";
import TableDropdownActionMenu from "./TableDropdownActionMenu";
import TableSkeleton from "./skeletons/TableSkeleton";

const columns = [
  { key: "product_id", label: "ID" },
  { key: "name", label: "NAME" },
  { key: "brand", label: "BRAND" },
  { key: "price", label: "PRICE" },
  { key: "quantity", label: "QUANTITY" },
  { key: "category", label: "CATEGORY" },
  { key: "is_available", label: "AVAILABLE" },
  { key: "date_added", label: "DATE ADDED" },
  { key: "tags", label: "TAGS" },
  { key: "actions", label: "ACTIONS" },
];

const ProductsTable = () => {
  // modal controls
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedAction, setSelectedAction] = useState(null);

  // state
  const [currentProduct, setCurrentProduct] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(
    DEFAULT_ROWS_PER_PAGE_TABLE_VIEW,
  );

  // react-query
  const { deleteProduct } = useProducts({});

  const productsQuery = useQuery(
    [PRODUCTS_QUERY_KEY],
    ProductsAPI.getAllProducts,
  );

  const products = productsQuery.data;
  const numberOfProducts = products?.length;

  // pagination
  const { currentPage, numberOfPages, sliceRange, changePage } = usePagination(
    numberOfProducts,
    rowsPerPage,
  );

  // memoized paginated products
  const paginatedProducts = useMemo(() => {
    const { start, end } = sliceRange;

    return products?.slice(start, end);
  }, [JSON.stringify(products), sliceRange.start, sliceRange.end]);

  // determine if the products are loading
  const isLoading = productsQuery.isLoading;
  const loadingState =
    isLoading || paginatedProducts?.length === 0 ? "loading" : "idle";

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

  if (productsQuery.isError) {
    return (
      <ErrorCard
        message="Unable to fetch products, please try again."
        error={productsQuery.error?.message}
      />
    );
  }

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="mb-6 mt-3">
      {/* ---------- Result Widget  ---------- */}
      <div className="mb-2">
        <ResultsWidget
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          numberOfResults={numberOfProducts}
          changePage={changePage}
        />
      </div>

      <div className="flex min-h-screen flex-col justify-between">
        {/* -------------- Table -------------- */}
        <Table aria-label="Products Table" isHeaderSticky isCompact>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>

          <TableBody
            items={isLoading ? [] : paginatedProducts}
            emptyContent={!isLoading && "No rows to display."}
            isLoading={isLoading}
            loadingState={loadingState}
            loadingContent={<Spinner />}
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

        {/* -------------- Table -------------- */}
        <div className="mt-6 flex w-full justify-center">
          <div className="rounded-lg border p-3 drop-shadow-sm">
            <Pagination
              showControls
              color="primary"
              page={currentPage}
              total={numberOfPages}
              onChange={changePage}
            />
          </div>
        </div>
      </div>

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
