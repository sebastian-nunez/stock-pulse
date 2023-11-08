import { Button, Code, Image, useDisclosure } from "@nextui-org/react";
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
        className="transform rounded-xl border bg-white p-8 drop-shadow transition duration-250 ease-in-out  hover:scale-105 hover:cursor-pointer"
        onClick={() => {
          setSelectedAction(Action.VIEW);
          onOpen();
        }}
      >
        {/* ------------------- Image ------------------- */}
        <div className="flex h-fit max-w-full items-center justify-center">
          {product?.image ? (
            <Image
              src={product?.image}
              alt={product?.name}
              fallbackSrc="https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg"
              className="h-60 w-96 object-cover object-center"
            />
          ) : (
            <div className="flex h-60 w-full items-center justify-center rounded-lg border drop-shadow-sm">
              No image available.
            </div>
          )}
        </div>

        {/* ------------------- Name & Price ------------------- */}
        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">
            {product?.name}
          </h1>

          <Code>${product.price}</Code>
        </div>

        {/* ------------------- Brand ------------------- */}
        <p className="text-gray-500">{product.brand}</p>

        {/* ------------------- Quantity & Edit ------------------- */}
        <div className="mt-5 flex items-center justify-between">
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
