import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Tooltip,
} from "@nextui-org/react";
import { RotateCcw } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ErrorCard from "../components/ErrorCard";
import ProductGrid from "../components/ProductGrid";
import ProductsAPI from "../services/ProductsAPI";

const PRODUCT_STALE_TIME = 5 * 60 * 1000; // 5 mins

const Inventory = () => {
  // state
  const [products, setProducts] = useState(null);

  // filter example
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["product"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  // react-query
  const productsQuery = useQuery(["products"], ProductsAPI.getAllProducts, {
    staleTime: PRODUCT_STALE_TIME,
  });
  const fetchedProducts = productsQuery.data;

  // save the products to state
  useEffect(() => {
    setProducts(fetchedProducts);
  }, [fetchedProducts]);

  // TODO: make a loading component (skeleton)
  if (productsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (productsQuery.isError) {
    return (
      <ErrorCard
        message="Unable to fetch products"
        error={productsQuery.error?.message}
      />
    );
  }

  return (
    <>
      {/* --------------- Filters --------------- */}
      {/* TODO: create the filtering options */}
      <div className="my-6">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" className="capitalize">
              {selectedValue}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Single selection example"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            radius="sm"
          >
            <DropdownItem key="product">Product</DropdownItem>
            <DropdownItem key="category">Category</DropdownItem>
            <DropdownItem key="tag">Tag</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* --------------- Search Bar --------------- */}
        <Input
          label="Search"
          isClearable
          radius="sm"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              //"w-50",
            ],
            innerWrapper: "bg-transparent",
            inputWrapper: [
              "shadow-xl",
              "bg-default-200/50",
              "dark:bg-default/60",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "hover:bg-default-200/70",
              "dark:hover:bg-default/70",
              "group-data-[focused=true]:bg-default-200/50",
              "dark:group-data-[focused=true]:bg-default/60",
              "!cursor-text",
            ],
          }}
          placeholder="Type to search..."
        />

        {/* --------------- Refresh Button --------------- */}
        <Tooltip content="Refresh">
          <Button
            size="sm"
            variant="flat"
            onPress={() => productsQuery.refetch()}
          >
            <RotateCcw />
          </Button>
        </Tooltip>
      </div>

      {/* ------------- Product Grid ------------- */}
      <div className="mx-break-out bg-neutral-50">
        {/* Change the full width background color */}
        <div className="container">{<ProductGrid products={products} />}</div>
      </div>
    </>
  );
};

export default Inventory;
