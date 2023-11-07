import { Button, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import ProductDetailsModal from "./ProductDetailsModal";
import ProductEditableModal from "./ProductEditableModal";

const Action = {
  VIEW: "View",
  UPDATE: "Update",
};

const ProductCard = ({ product }) => {
  // control the modals
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedAction, setSelectedAction] = useState(null);

  if (!product) {
    return (
      <div className="rounded border px-8 py-4 shadow-md">
        Oops! Looks like the product is currently unavailable!
      </div>
    );
  }

  return (
    <>
      <div
        className="rounded border px-8 py-4 shadow-md hover:cursor-pointer"
        onClick={() => {
          setSelectedAction(Action.VIEW);
          onOpen();
        }}
      >
        <h1 className="text-2xl font-semibold tracking-tight">
          {product?.name}
        </h1>

        <Button
          size="sm"
          color="primary"
          onPress={() => {
            setSelectedAction(Action.UPDATE);
            onOpen();
          }}
        >
          EDIT
        </Button>
      </div>

      {/* -------------- Modals -------------- */}
      {selectedAction === Action.VIEW && (
        <ProductDetailsModal
          product={product}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}

      {selectedAction === Action.UPDATE && (
        <ProductEditableModal
          title="Edit Product"
          canDelete={true}
          product={product}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      )}
    </>
  );
};

export default ProductCard;
