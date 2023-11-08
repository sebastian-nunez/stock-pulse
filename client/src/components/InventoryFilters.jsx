import {
  Button,
  Chip,
  Input,
  Select,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";
import { RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import { ANY_CATEGORY } from "../hooks/useFilteredProducts";
import CategoriesAPI from "../services/CategoriesAPI";
import TagsAPI from "../services/TagsAPI";
import {
  CATEGORIES_QUERY_KEY,
  PRODUCTS_QUERY_KEY,
  TAGS_QUERY_KEY,
} from "../utils/constants";

const InventoryFilters = ({
  setSearchText,
  setSelectedCategory,
  setSelectedTags,
  selectedTags,
  searchText,
  selectedCategory,
}) => {
  // react-query
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery(
    [CATEGORIES_QUERY_KEY],
    CategoriesAPI.getCategories,
    {
      onError: () => {
        toast.error("Unable to fetch the categories, please try again.");
      },
    },
  );
  const categories = categoriesQuery.data;

  const tagsQuery = useQuery([TAGS_QUERY_KEY], TagsAPI.getAllTags, {
    onError: () => {
      toast.error("Unable to fetch the tags, please try again.");
    },
  });
  const tags = tagsQuery.data;

  const isLoading =
    categoriesQuery.isLoading ||
    tagsQuery.isLoading ||
    queryClient.isFetching([PRODUCTS_QUERY_KEY]);

  const handleRefresh = () => {
    // refetch the products
    queryClient.refetchQueries(PRODUCTS_QUERY_KEY);
    categoriesQuery.refetch();
    tagsQuery.refetch();

    // reset the filters
    setSelectedCategory(null);
    setSelectedTags([]);
    setSearchText("");
  };

  const handleChipClose = (tagToRemove) => {
    // remove the tag from the selected tags
    setSelectedTags(
      selectedTags.filter((tag) => tag !== tagToRemove.textValue),
    );
  };

  return (
    <div className="mb-6 mt-6 flex flex-col gap-3 px-6 sm:flex-row sm:gap-6 sm:px-0">
      {/* ------- Category --------- */}
      <div className="sm:w-1/3">
        <Select
          aria-label="Select a category"
          size="lg"
          variant="bordered"
          placeholder="Select a category"
          selectedKeys={selectedCategory ? [selectedCategory] : []}
          labelPlacement="outside"
          onSelectionChange={(object) => setSelectedCategory(object.currentKey)}
          isDisabled={categoriesQuery.isError}
          isLoading={categoriesQuery.isLoading}
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
      <div className="sm:w-1/3">
        <Select
          aria-label="Select a tag"
          placeholder="Select tags"
          items={tags}
          size="lg"
          selectedKeys={selectedTags}
          variant="bordered"
          labelPlacement="outside"
          isMultiline={true}
          selectionMode="multiple"
          isDisabled={tagsQuery.isError}
          isLoading={tagsQuery.isLoading}
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
                  <Chip
                    key={item.key}
                    size="md"
                    color="primary"
                    onClose={() => handleChipClose(item)}
                    className="my-1"
                  >
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

      <div className="flex gap-3 sm:w-1/3">
        {/* ------- Search Text --------- */}
        <Input
          aria-label="Search Text"
          placeholder="Search"
          size="lg"
          labelPlacement="outside"
          variant="bordered"
          isClearable
          value={searchText}
          onValueChange={setSearchText}
          type="text"
          isLoading={isLoading}
        />

        {/* ------- Refresh Button --------- */}
        <Tooltip content="Refresh">
          <Button
            size="sm"
            variant="flat"
            onPress={handleRefresh}
            isDisabled={isLoading}
            className="h-12"
          >
            <RotateCcw />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default InventoryFilters;
