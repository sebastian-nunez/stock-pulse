import {
  Button,
  Chip,
  Input,
  Select,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";
import { RotateCcw } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import ErrorCard from "../components/ErrorCard";
import ProductGrid from "../components/ProductGrid";
import {
  ANY_CATEGORY,
  useFilteredProducts,
} from "../hooks/useFilteredProducts";
import CategoriesAPI from "../services/CategoriesAPI";
import ProductsAPI from "../services/ProductsAPI";
import TagsAPI from "../services/TagsAPI";
import {
  CATEGORY_STALE_TIME_MILLISECONDS,
  PRODUCT_STALE_TIME_MILLISECONDS,
  TAG_STALE_TIME_MILLISECONDS,
} from "../utils/constants";

const Inventory = () => {
  // state
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [tags, setTags] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  // react-query
  const productsQuery = useQuery(["products"], ProductsAPI.getAllProducts, {
    staleTime: PRODUCT_STALE_TIME_MILLISECONDS,
  });
  const fetchedProducts = productsQuery.data;

  const categoriesQuery = useQuery(
    ["categories"],
    CategoriesAPI.getCategories,
    {
      staleTime: CATEGORY_STALE_TIME_MILLISECONDS,
    },
  );
  const fetchedCategories = categoriesQuery.data;

  const tagsQuery = useQuery(["tags"], TagsAPI.getAllTags, {
    staleTime: TAG_STALE_TIME_MILLISECONDS,
  });
  const fetchedTags = tagsQuery.data;

  // save the products, tags & categories to state
  useEffect(() => {
    setProducts(fetchedProducts);
    setCategories(fetchedCategories);
    setTags(fetchedTags);
  }, [fetchedProducts, fetchedCategories, fetchedTags]);

  // filter products
  const filteredProducts = useFilteredProducts(products, {
    searchText,
    selectedCategory,
    selectedTags,
  });

  // TODO: make a loading component (skeleton)
  if (
    productsQuery.isLoading ||
    categoriesQuery.isLoading ||
    tagsQuery.isLoading
  ) {
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

  if (tagsQuery.isError) {
    return (
      <ErrorCard
        message="Unable to fetch tags, please try again."
        error={tagsQuery.error?.message}
      />
    );
  }

  return (
    <>
      {/* -------------------- Filters --------------------- */}
      <div className="mb-6 mt-12 flex gap-6">
        {/* ------- Category --------- */}
        <div className="w-1/3">
          <Select
            label="Category"
            variant="bordered"
            defaultSelectedKeys={[ANY_CATEGORY]}
            labelPlacement="outside"
            onSelectionChange={(object) =>
              setSelectedCategory(object.currentKey)
            }
          >
            <SelectItem key={ANY_CATEGORY} value={ANY_CATEGORY}>
              {ANY_CATEGORY}
            </SelectItem>

            {categories?.map((category) => (
              <SelectItem
                key={category.name}
                value={category.name}
                textValue={category.name}
              >
                {category.name}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* ------- Tags --------- */}
        <div className="w-1/3">
          <Select
            label="Tags"
            items={tags}
            variant="bordered"
            labelPlacement="outside"
            isMultiline={true}
            selectionMode="multiple"
            onChange={
              // convert comma-separated string to array of strings
              (e) => {
                const selectedTags = e.target.value;

                if (selectedTags?.length > 0) {
                  setSelectedTags(selectedTags.split(","));
                } else {
                  setSelectedTags([]);
                }
              }
            }
            renderValue={(selectedItems) => {
              // selected tags as chips
              return (
                <div className="flex flex-wrap gap-2">
                  {selectedItems?.map((item) => (
                    <Chip key={item.key} size="sm" color="primary">
                      {item.key}
                    </Chip>
                  ))}
                </div>
              );
            }}
          >
            {/* Tag options */}
            {tags?.map((tag) => (
              <SelectItem key={tag.name} textValue={tag.name}>
                {tag.name}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="flex w-1/3 gap-3">
          {/* ------- Search Text --------- */}
          <Input
            label="Search"
            labelPlacement="outside"
            variant="bordered"
            isClearable
            value={searchText}
            onValueChange={setSearchText}
            type="text"
          />

          {/* ------- Refresh Button --------- */}
          <Tooltip content="Refresh">
            <Button
              size="sm"
              variant="flat"
              onPress={() => {
                productsQuery.refetch();
                categoriesQuery.refetch();
                tagsQuery.refetch();
              }}
              className="h-full"
            >
              <RotateCcw />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* ------------------- Product Grid ------------------- */}
      <div className="mx-break-out min-h-screen bg-neutral-50">
        {/* Change the full width background color */}
        <div className="container">
          {<ProductGrid products={filteredProducts} />}
        </div>
      </div>
    </>
  );
};

export default Inventory;
