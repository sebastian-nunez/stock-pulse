import { Button, Card, Code, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import ProductDetailsModal from "./ProductDetailsModal";
import ProductEditableModal from "./ProductEditableModal";
import { ProductCardSkeleton } from "./skeletons/ProductGridSkeleton";

export const Action = {
  VIEW: "View",
  UPDATE: "Update",
};

const ProductCard = ({ product, isLoading = false }) => {
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

  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  return (
    <>
      <Card
        className="transform p-4 drop-shadow-sm transition duration-250 ease-in-out sm:hover:scale-[1.025]"
        isPressable
        disableRipple
        fullWidth
        onPress={() => {
          setSelectedAction(Action.VIEW);
          onOpen();
        }}
      >
        {/* ------------------- Image ------------------- */}
        <div className="flex h-fit w-full items-center justify-center">
          {product?.image ? (
            <img
              src={product?.image}
              alt={product?.name}
              className="h-60 w-full rounded-xl object-cover object-center"
            />
          ) : (
            <div className="flex h-60 w-full items-center justify-center rounded-xl border drop-shadow-sm">
              No image available.
            </div>
          )}
        </div>

        {/* ------------------- Name & Price ------------------- */}
        <div className="mt-4 flex w-full items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">
            {product?.name}
          </h1>

          <Code>${product.price}</Code>
        </div>

        {/* ------------------- Brand ------------------- */}
        <p className="text-gray-500">{product.brand}</p>

        {/* ------------------- Quantity & Edit ------------------- */}
        <div className="mt-5 flex w-full items-center justify-between">
          <p className="text-gray-700">
            <strong>Quantity:</strong> {product.quantity}
          </p>

          <Button
            size="sm"
            color="primary"
            variant="flat"
            radius="full"
            className="duration-500 ease-in-out hover:scale-105"
            onPress={() => {
              setSelectedAction(Action.UPDATE);
              onOpen();
            }}
          >
            EDIT
          </Button>
        </div>
      </Card>

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
