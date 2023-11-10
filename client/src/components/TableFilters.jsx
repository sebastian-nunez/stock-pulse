import { Button, Divider, Input, Select, SelectItem } from "@nextui-org/react";
import { Plus } from "lucide-react";

export const FilterOptions = {
  PRODUCTS: "Products",
  CATEGORIES: "Categories",
  TAGS: "Tags",
};

const TableFilters = ({
  searchText,
  setSearchText,
  selectedFilter,
  setSelectedFilter,
  handleOpenModal,
}) => {
  const handleReset = () => {
    // reset the filters
    setSearchText("");
    setSelectedFilter(null);
  };

  return (
    <div className="my-6 px-6 sm:px-0">
      <h1 className="text-xl font-bold tracking-tight">Filters</h1>

      <Divider className="mb-3" />

      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:gap-6">
        <div className="flex flex-col gap-3 sm:w-1/2">
          <div className="flex gap-3">
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
              className="w-3/5"
            />

            {/* ------- Categories --------- */}
            <Select
              aria-label="Select a filter"
              size="lg"
              variant="bordered"
              placeholder="Select a filter"
              selectedKeys={selectedFilter ? [selectedFilter] : []}
              labelPlacement="outside"
              onSelectionChange={(object) =>
                setSelectedFilter(object.currentKey)
              }
              className="w-2/5"
            >
              {Object.values(FilterOptions).map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <Button
          size="md"
          color="primary"
          variant="shadow"
          startContent={<Plus size={20} />}
          onPress={handleOpenModal}
          className="text-md h-12 w-40 transition duration-250 ease-in-out hover:scale-[1.03]"
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default TableFilters;
