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

      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:gap-6">
        <div className="flex gap-3 sm:w-1/2 sm:flex-row md:w-1/3">
          {/* ------- Filters --------- */}
          <Select
            aria-label="Select a filter"
            size="lg"
            variant="bordered"
            placeholder="Select a filter"
            selectedKeys={selectedFilter ? [selectedFilter] : []}
            labelPlacement="outside"
            onSelectionChange={(object) => setSelectedFilter(object.currentKey)}
            className="sm:w-3/5"
          >
            {Object.values(FilterOptions).map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </Select>

          <Button
            size="md"
            color="primary"
            radius="sm"
            startContent={<Plus size={20} />}
            onPress={handleOpenModal}
            className="text-md h-12 w-1/3 transition duration-250 ease-in-out hover:scale-[1.03] sm:w-2/5"
          >
            Add
          </Button>
        </div>

        <div className="sm:w-1/2 md:w-1/3">
          {/* ------- Search Text --------- */}
          <Input
            aria-label="Search Text"
            placeholder="Search"
            size="lg"
            labelPlacement="outside"
            variant="bordered"
            isClearable
            isDisabled={true} // TODO: implemented filtering
            value={searchText}
            onValueChange={setSearchText}
            type="text"
          />
        </div>
      </div>
    </div>
  );
};

export default TableFilters;
