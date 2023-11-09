import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { MoreVertical } from "lucide-react";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { usePagination } from "../hooks/usePagination";
import ProductsAPI from "../services/ProductsAPI";
import { DEFAULT_ROWS_PER_PAGE, PRODUCTS_QUERY_KEY } from "../utils/constants";

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
  // state
  const [productId, setProductId] = useState(null);
  const numberOfProducts = products?.length;
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const { currentPage, numberOfPages, sliceRange, changePage } = usePagination(
    numberOfProducts,
    rowsPerPage,
  );

  const productByIdQuery = useQuery([PRODUCTS_QUERY_KEY, { productId }], () => {
    if (productId) {
      return ProductsAPI.getProductById(productId);
    }
  });
  const product = productByIdQuery.data;

  const handleView = (productId) => {
    setProductId(productId);
    console.log("View", productId);
  };

  const handleEdit = (productId) => {
    setProductId(productId);
    console.log("Edit", productId);
  };

  const handleDelete = (productId) => {
    setProductId(productId);
    console.log("Delete", productId);
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

  // TODO: replace with either a loading skeleton or tell the NextUI table to load using isLoading prop
  if (!products) return <p>Loading...</p>;

  return (
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
  );
};

export default ProductsTable;
