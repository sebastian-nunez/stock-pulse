import {
  Button,
  CircularProgress,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import { MoreVertical } from "lucide-react";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { usePagination } from "../hooks/usePagination";
import useProducts from "../hooks/useProducts";
import ProductsAPI from "../services/ProductsAPI";
import {
  DEFAULT_ROWS_PER_PAGE_TABLE as DEFAULT_ROWS_PER_PAGE_TABLE_VIEW,
  PRODUCTS_QUERY_KEY,
} from "../utils/constants";
import ErrorCard from "./ErrorCard";
import { Action } from "./ProductCard";
import ProductDetailsModal from "./ProductDetailsModal";
import ProductEditableModal from "./ProductEditableModal";
import ResultsWidget from "./ResultsWidget";

const columns = [
  { key: "name", label: "Name" },
  { key: "brand", label: "Brand" },
  { key: "price", label: "Price" },
  { key: "quantity", label: "Quantity" },
  { key: "category", label: "Category" },
  { key: "tags", label: "Tags" },
  { key: "actions", label: "Actions" },
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

  // determine if the products are loading
  const isLoading = productsQuery.isLoading;

  // pagination
  const { currentPage, numberOfPages, sliceRange, changePage } = usePagination(
    numberOfProducts,
    rowsPerPage,
  );

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
          <div className="relative flex items-center justify-end gap-2">
            <Dropdown aria-label="Actions Menu">
              <DropdownTrigger aria-label="Toggle Actions Menu">
                <Button isIconOnly size="sm" variant="light">
                  <MoreVertical />
                </Button>
              </DropdownTrigger>

              <DropdownMenu aria-label="Menu Options">
                <DropdownItem
                  aria-label="View"
                  key={"View"}
                  onClick={() => handleView(product)}
                >
                  View
                </DropdownItem>

                <DropdownItem
                  aria-label="Edit"
                  key={"Edit"}
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </DropdownItem>

                <DropdownItem
                  aria-label="Delete"
                  key={"Delete"}
                  onClick={() => handleDelete(product?.product_id)}
                  className="text-danger"
                  color="danger"
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
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

      {/* -------------- Table -------------- */}
      {products && (
        <Table aria-label="Products Table" isHeaderSticky>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>

          <TableBody
            items={products}
            emptyContent={"No rows to display."}
            isLoading={isLoading}
            loadingContent={
              <CircularProgress size="lg" aria-label="Loading..." />
            }
          >
            {(product, idx) => (
              <TableRow key={product?.product_id || idx}>
                {(columnKey) => (
                  <TableCell>{renderCell(product, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

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