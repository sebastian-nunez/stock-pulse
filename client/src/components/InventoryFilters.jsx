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

const InventoryFilters = ({
  setSearchText,
  setSelectedCategory,
  setSelectedTags,
  searchText,
}) => {
  // react-query
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery(
    ["categories"],
    CategoriesAPI.getCategories,
    {
      onError: () => {
        toast.error("Unable to fetch the categories, please try again.");
      },
    },
  );
  const categories = categoriesQuery.data;

  const tagsQuery = useQuery(["tags"], TagsAPI.getAllTags, {
    onError: () => {
      toast.error("Unable to fetch the tags, please try again.");
    },
  });
  const tags = tagsQuery.data;

  return (
    <div className="mb-6 mt-12 flex gap-6">
      {/* ------- Category --------- */}
      <div className="w-1/3">
        <Select
          label="Category"
          variant="bordered"
          defaultSelectedKeys={[ANY_CATEGORY]}
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
      <div className="w-1/3">
        <Select
          label="Tags"
          items={tags}
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
          isLoading={categoriesQuery.isLoading || tagsQuery.isLoading}
        />

        {/* ------- Refresh Button --------- */}
        <Tooltip content="Refresh">
          <Button
            size="sm"
            variant="flat"
            onPress={() => {
              queryClient.invalidateQueries["products"];
              queryClient.refetchQueries("products");

              categoriesQuery.refetch();
              tagsQuery.refetch();
            }}
            className="h-full"
            isDisabled={
              categoriesQuery.isFetching ||
              tagsQuery.isFetching ||
              queryClient.isFetching(["products"])
            }
          >
            <RotateCcw />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default InventoryFilters;
