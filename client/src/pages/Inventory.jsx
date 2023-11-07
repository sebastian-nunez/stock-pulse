import { Button, Input, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { RotateCcw } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useQuery } from "react-query";
import ErrorCard from "../components/ErrorCard";
import ProductGrid from "../components/ProductGrid";
import CategoriesAPI from "../services/CategoriesAPI";
import ProductsAPI from "../services/ProductsAPI";

const PRODUCT_STALE_TIME = 5 * 60 * 1000; // 5 mins
const CATEGORY_STALE_TIME = 5 * 60 * 1000; // 5 mins

const Inventory = () => {
  // state
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(new Set([]));

  // react-query
  const productsQuery = useQuery(["products"], ProductsAPI.getAllProducts, {
    staleTime: PRODUCT_STALE_TIME,
  });
  const fetchedProducts = productsQuery.data;

  const categoriesQuery = useQuery(
    ["categories"],
    CategoriesAPI.getCategories,
    {
      staleTime: CATEGORY_STALE_TIME,
    },
  );
  const fetchedCategories = categoriesQuery.data;

  // save the products to state
  useEffect(() => {
    setProducts(fetchedProducts);
    setCategories(fetchedCategories);
  }, [fetchedProducts, fetchedCategories]);

  // TODO: make a loading component (skeleton)
  if (productsQuery.isLoading || categoriesQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (productsQuery.isError) {
    return (
      <ErrorCard
        message="Unable to fetch products, please try again."
        error={productsQuery.error?.message}
      />
    );
  }

  if (categoriesQuery.isError) {
    return (
      <ErrorCard
        message="Unable to fetch categories, please try again."
        error={categoriesQuery.error?.message}
      />
    );
  }

  return (
    <>
      {/* -------------------- Filters --------------------- */}
      <div className="my-6 flex gap-6">
        <div className="w-1/3">
          {/* ------- Search Text --------- */}
          <Input
            label="Search"
            variant="bordered"
            isClearable
            value={searchText}
            onValueChange={setSearchText}
            type="text"
          />
        </div>

        <div className="w-1/3">TAGS</div>

        <div className="flex w-1/3 gap-3">
          {/* ------- Category --------- */}
          <Select
            label="Select a Category"
            variant="bordered"
            onSelectionChange={(object) =>
              setSelectedCategory(object.currentKey)
            }
          >
            {categories?.map((category) => (
              <SelectItem key={category.name} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </Select>

          {/* ------- Refresh Button --------- */}
          <Tooltip content="Refresh">
            <Button
              size="sm"
              variant="flat"
              onPress={() => productsQuery.refetch()}
              className="h-full"
            >
              <RotateCcw />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* ------------------- Product Grid ------------------- */}
      <div className="mx-break-out bg-neutral-50">
        {/* Change the full width background color */}
        <div className="container">{<ProductGrid products={products} />}</div>
      </div>

      <Toaster />
    </>
  );
};

export default Inventory;
