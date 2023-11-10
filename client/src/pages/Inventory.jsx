import { useState } from "react";
import ProductsTable from "../components/ProductsTable";
import TableFilters from "../components/TableFilters";

const Item = {
  PRODUCT: "Product",
  CATEGORY: "Category",
  TAG: "Tag",
};

const Inventory = () => {
  const [selectedItem, setSelectedItem] = useState(Item.PRODUCT);

  // filters
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <>
      {/* ------------ Filters ------------- */}
      <TableFilters
        searchText={searchText}
        setSearchText={setSearchText}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

      {/* ------------ Products Table ------------- */}
      <div className="mx-break-out min-h-screen bg-neutral-50">
        {/* Change the full width background color */}
        <div className="container">
          {selectedItem === Item.PRODUCT && <ProductsTable />}
        </div>
      </div>
    </>
  );
};

export default Inventory;
