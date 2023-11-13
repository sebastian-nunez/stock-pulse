import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import BackgroundGradient from "../components/BackgroundGradient";
import CategoriesTable from "../components/CategoriesTable";
import CategoryEditableModal from "../components/CategoryEditableModal";
import ProductEditableModal from "../components/ProductEditableModal";
import ProductsTable from "../components/ProductsTable";
import TableFilters, { FilterOptions } from "../components/TableFilters";
import TagEditableModal from "../components/TagEditableModal";

const Inventory = () => {
  // modal controller
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // filters
  const [selectedFilter, setSelectedFilter] = useState(FilterOptions.PRODUCTS);
  const [searchText, setSearchText] = useState("");

  const handleOpenModal = () => {
    onOpen();
  };

  return (
    <>
      {/* ------------ Filters ------------- */}
      <TableFilters
        searchText={searchText}
        setSearchText={setSearchText}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        handleOpenModal={handleOpenModal}
      />

      {/* ------------ Products Table ------------- */}
      <div className="min-h-screen">
        {/* ------------------ Products ------------------- */}
        {selectedFilter === FilterOptions.PRODUCTS && (
          <ProductsTable filterText={searchText} />
        )}

        {/* ------------------ Categories ------------------- */}
        {selectedFilter === FilterOptions.CATEGORIES && (
          <CategoriesTable filterText={searchText} />
        )}

        {/* ------------------ Tags ------------------- */}
        {selectedFilter === FilterOptions.TAGS && <p>TAGS</p>}
      </div>

      {/* ------------------ Modals ------------------- */}
      {/* Create a product */}
      {selectedFilter === FilterOptions.PRODUCTS && (
        <ProductEditableModal
          title="Add Product"
          canDelete={false}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}

      {/* Create a category */}
      {selectedFilter === FilterOptions.CATEGORIES && (
        <CategoryEditableModal
          title="Add Category"
          canDelete={false}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}

      {/* Create a tag */}
      {selectedFilter === FilterOptions.TAGS && (
        <TagEditableModal
          title="Add Tag"
          canDelete={false}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}

      {/* ------------- Blurred Background -------------- */}
      <BackgroundGradient variant="subtle" />
    </>
  );
};

export default Inventory;
