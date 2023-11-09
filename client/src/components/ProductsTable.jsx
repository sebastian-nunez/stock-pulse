import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { MoreVertical } from "lucide-react";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { usePagination } from "../hooks/usePagination";
import useProducts from "../hooks/useProducts";
import ProductsAPI from "../services/ProductsAPI";
import { DEFAULT_ROWS_PER_PAGE, PRODUCTS_QUERY_KEY } from "../utils/constants";
import { Action } from "./ProductCard";
import ProductDetailsModal from "./ProductDetailsModal";
import ProductEditableModal from "./ProductEditableModal";

const columns = [
  { key: "name", label: "Name" },
  { key: "brand", label: "Brand" },
  { key: "price", label: "Price" },
  { key: "quantity", label: "Quantity" },
  { key: "category", label: "Category" },
  { key: "tags", label: "Tags" },
  { key: "actions", label: "Actions" },
];
const headerColumns = columns.map((column) => column.label);

const ProductsTable = ({ products }) => {
  // modal controls
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedAction, setSelectedAction] = useState(null);

  // state
  const [productId, setProductId] = useState(null);
  const numberOfProducts = products?.length;
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const { currentPage, numberOfPages, sliceRange, changePage } = usePagination(
    numberOfProducts,
    rowsPerPage,
  );

  // react-query
  const productByIdQuery = useQuery([PRODUCTS_QUERY_KEY, { productId }], () => {
    if (productId) {
      return ProductsAPI.getProductById(productId);
    }
  });
  const product = productByIdQuery.data;

  const { deleteProduct } = useProducts({});

  const handleView = (productId) => {
    if (!productId) {
      toast.error("Product does not have a valid ID, unable to view it!");
    }

    setProductId(productId);
    setSelectedAction(Action.VIEW);
    onOpen(); // open the modal
  };

  const handleEdit = (productId) => {
    if (!productId) {
      toast.error("Product does not have a valid ID, unable to edit it!");
    }

    setProductId(productId);
    setSelectedAction(Action.UPDATE);
    onOpen(); // open the modal
  };

  const handleDelete = (productId) => {
    if (!productId) {
      toast.error("Product does not have a valid ID, unable to delete it!");
    }

    deleteProduct.mutate(productId);
  };

  const renderCell = useCallback((product, columnKey = "") => {
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
                  onClick={() => handleView(product?.product_id)}
                >
                  View
                </DropdownItem>

                <DropdownItem
                  aria-label="Edit"
                  key={"Edit"}
                  onClick={() => handleEdit(product?.product_id)}
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

  // replace this with making the table show loading state
  //   if (productByIdQuery.isLoading) {
  //     return (
  //       <div className="my-auto flex items-center justify-center">
  //         <CircularProgress size="lg" aria-label="Loading..." />
  //       </div>
  //     );
  //   }

  return (
    <>
      {/* -------------- Table -------------- */}
      <div className="flex flex-col">
        {products?.map((product) => (
          <div key={product.product_id} className="flex justify-between gap-3">
            {columns.map((column) => (
              <div key={column.key}>{renderCell(product, column.key)}</div>
            ))}
          </div>
        ))}

        {product && JSON.stringify(product)}
      </div>

      {/* -------------- Modals -------------- */}
      {selectedAction === Action.VIEW &&
        !productByIdQuery.isLoading && ( // TODO: remove loading check
          <ProductDetailsModal
            product={product}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
        )}

      {selectedAction === Action.UPDATE &&
        !productByIdQuery.isLoading && ( // TODO: remove loading check
          <ProductEditableModal
            title="Edit Product"
            canDelete={true}
            product={product}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
        )}
    </>
  );
};

export default ProductsTable;
