import { useState } from "react";
import ProductsTable from "../components/ProductsTable";

const Item = {
  PRODUCT: "Product",
  CATEGORY: "Category",
  TAG: "Tag",
};

const Inventory = () => {
  const [selectedItem, setSelectedItem] = useState(Item.PRODUCT);

  return (
    <div className="flex flex-col gap-3">
      {/* ------------ Filters ------------- */}
      <div className="text-center">Filters</div>

      {/* ------------ Products Table ------------- */}
      {selectedItem === Item.PRODUCT && <ProductsTable />}
    </div>
  );
};

export default Inventory;
