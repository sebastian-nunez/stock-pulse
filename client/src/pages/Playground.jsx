import {
  Button,
  Input,
  Select,
  SelectItem,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useQuery } from "react-query";
import CategoryDetailsModal from "../components/CategoryDetailsModal";
import CategoryEditableModal from "../components/CategoryEditableModal";
import ProductDetailsModal from "../components/ProductDetailsModal";
import ProductEditableModal from "../components/ProductEditableModal";
import TagDetailsModal from "../components/TagDetailsModal";
import TagEditableModal from "../components/TagEditableModal";
import CategoriesAPI from "../services/CategoriesAPI";
import ProductsAPI from "../services/ProductsAPI";
import TagsAPI from "../services/TagsAPI";

export const Action = {
  CREATE: "Create",
  VIEW: "View",
  UPDATE: "Update",
};

// selectedfilter enum
export const Filter = {
  PRODUCT: "Product",
  CATEGORY: "Category",
  TAG: "Tag",
};

const DEFAULT_USER = {
  firstname: null,
  lastname: null,
  role: null,
  image: null,
};

const Playground = () => {
  {
    /* --------------------------- Modals ---------------------------*/
  }
  // control the modals
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [id, setId] = useState(null);

  const productByIdQuery = useQuery(["products", { id: id }], () => {
    // avoid fetching when productId is null
    if (id) {
      return ProductsAPI.getProductById(id);
    }
  });
  const product = productByIdQuery.data;

  const categoryByIdQuery = useQuery(["categories", { id }], () => {
    // avoid fetching when  is null
    if (id) {
      return CategoriesAPI.getCategoryById(id);
    }
  });
  const category = categoryByIdQuery.data;

  const tagByIdQuery = useQuery(["tags", { id }], () => {
    // avoid fetching when  is null
    if (id) {
      return TagsAPI.getTagById(id);
    }
  });
  const tag = tagByIdQuery.data;

  return (
    <>
      <h1 className="pb-6 text-center text-5xl font-extrabold tracking-tighter">
        Playground
      </h1>

      {/* --------------------------- Modals ---------------------------*/}
      <section>
        <h2 className="pb-6 text-3xl font-extrabold">Modals</h2>

        {/* Form */}
        <div className="flex gap-4">
          {/* Filter Selection */}
          <Select
            label="Filter"
            variant="bordered"
            placeholder="Select an filter"
            className="w-1/3"
            size="sm"
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            {Object.values(Filter).map((filter) => (
              <SelectItem key={filter}>{filter}</SelectItem>
            ))}
          </Select>

          {/* Action Selection */}
          <Select
            label="Action"
            variant="bordered"
            placeholder="Select an action"
            className="w-1/3"
            size="sm"
            onChange={(e) => setSelectedAction(e.target.value)}
          >
            {Object.values(Action).map((action) => (
              <SelectItem key={action}>{action}</SelectItem>
            ))}
          </Select>

          {/* ID Selector */}
          {selectedFilter &&
            selectedAction &&
            selectedAction !== Action.CREATE && (
              <Input
                defaultValue={id}
                label="ID"
                placeholder="1"
                type="number"
                variant="bordered"
                size="sm"
                onValueChange={(value) => {
                  setId(value);
                }}
                className="w-fit"
              />
            )}
        </div>

        {/* Open Modal Button */}
        <Tooltip content="Open the modal" delay={300}>
          <Button
            color="primary"
            variant="shadow"
            className="mt-6 w-1/3"
            onPress={onOpen}
            isLoading={productByIdQuery.isLoading}
          >
            Open Modal
          </Button>
        </Tooltip>

        {/* Create a product */}
        {selectedFilter === Filter.PRODUCT &&
          selectedAction === Action.CREATE && (
            <ProductEditableModal
              title="Add Product"
              canDelete={false}
              isOpen={isOpen}
              product={null}
              onOpenChange={onOpenChange}
            />
          )}

        {/* Edit a product */}
        {selectedFilter === Filter.PRODUCT &&
          selectedAction === Action.UPDATE && (
            <ProductEditableModal
              title="Edit Product"
              product={product}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            />
          )}

        {/* View a product */}
        {selectedFilter === Filter.PRODUCT &&
          selectedAction === Action.VIEW && (
            <ProductDetailsModal
              product={product}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            />
          )}

        {/* Create a category */}
        {selectedFilter === Filter.CATEGORY &&
          selectedAction === Action.CREATE && (
            <CategoryEditableModal
              title="Add Category"
              canDelete={false}
              isOpen={isOpen}
              category={null}
              onOpenChange={onOpenChange}
            />
          )}

        {/* Update a category */}
        {selectedFilter === Filter.CATEGORY &&
          selectedAction === Action.UPDATE && (
            <CategoryEditableModal
              title="Edit Category"
              canDelete={true}
              isOpen={isOpen}
              category={category}
              onOpenChange={onOpenChange}
            />
          )}

        {/* View a category */}
        {selectedFilter === Filter.CATEGORY &&
          selectedAction === Action.VIEW && (
            <CategoryDetailsModal
              category={category}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            />
          )}

        {/* Create a tag */}
        {selectedFilter === Filter.TAG && selectedAction === Action.CREATE && (
          <TagEditableModal
            title="Add Tag"
            canDelete={false}
            isOpen={isOpen}
            tag={null}
            onOpenChange={onOpenChange}
          />
        )}

        {/* Update a tag */}
        {selectedFilter === Filter.TAG && selectedAction === Action.UPDATE && (
          <TagEditableModal
            title="Edit Tag"
            canDelete={true}
            isOpen={isOpen}
            tag={tag}
            onOpenChange={onOpenChange}
          />
        )}

        {/* View a tag */}
        {selectedFilter === Filter.TAG && selectedAction === Action.VIEW && (
          <TagDetailsModal
            tag={tag}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
        )}

        {/* ------------ Toaster Notification -------------- */}
        <Toaster position="top-right" />
      </section>
    </>
  );
};

export default Playground;
