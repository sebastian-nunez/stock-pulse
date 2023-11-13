import {
  Button,
  Card,
  Divider,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { FileArchive, PackagePlus, Search } from "lucide-react";

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
    <Card className="p-4 drop-shadow-sm">
      <h1 className="text-xl font-bold tracking-tight">Filters</h1>

      <Divider className="mb-3" />

      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:gap-6">
        <div className="flex gap-3 sm:w-1/2 sm:flex-row md:w-1/3">
          {/* ------- Filters --------- */}
          <Select
            aria-label="Select a filter"
            size="lg"
            disallowEmptySelection
            variant="bordered"
            startContent={<FileArchive size={20} />}
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
            startContent={<PackagePlus width={20} height={20} />}
            onPress={handleOpenModal}
            className="sm:text-md h-12 w-1/3 font-semibold transition duration-250 ease-in-out hover:scale-[1.03] sm:w-2/5"
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
            startContent={<Search width={20} height={20} />}
            isClearable
            value={searchText}
            onValueChange={setSearchText}
            type="text"
          />
        </div>
      </div>
    </Card>
  );
};

export default TableFilters;
