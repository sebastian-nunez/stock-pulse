import {
  Button,
  Card,
  Chip,
  Divider,
  Input,
  Select,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";
import { ListFilter, RouteOff, Search, Tag } from "lucide-react";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "react-query";
import CategoriesAPI from "../services/CategoriesAPI";
import TagsAPI from "../services/TagsAPI";
import {
  CATEGORIES_QUERY_KEY,
  PRODUCTS_QUERY_KEY,
  TAGS_QUERY_KEY,
} from "../utils/constants";
import { ANY_CATEGORY } from "../utils/helpers";

const BrowserFilters = ({
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

  const handleReset = () => {
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
    <Card className="mx-6 p-4 drop-shadow-sm sm:mx-0">
      <h1 className="text-xl font-bold tracking-tight">Filters</h1>
      <Divider className="mb-3" />
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
        {/* ------- Category --------- */}
        <div className="sm:w-1/3">
          <Select
            aria-label="Select a category"
            size="lg"
            variant="bordered"
            startContent={<ListFilter size={20} />}
            placeholder="Select a category"
            selectedKeys={selectedCategory ? [selectedCategory] : []}
            labelPlacement="outside"
            onSelectionChange={(object) =>
              setSelectedCategory(object.currentKey)
            }
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
            startContent={<Tag size={20} />}
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
            description="Search by name or brand"
            variant="bordered"
            isClearable
            startContent={<Search size={20} />}
            value={searchText}
            onValueChange={setSearchText}
            type="text"
            isLoading={isLoading}
          />

          {/* ------- Refresh Button --------- */}
          <Tooltip content="Reset">
            <Button
              size="lg"
              variant="flat"
              onPress={handleReset}
              isDisabled={isLoading}
              className="h-12"
              isIconOnly
            >
              <RouteOff />
            </Button>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
};

export default BrowserFilters;
