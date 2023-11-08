import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

const ProductDetailsModal = ({ product, isOpen, onOpenChange }) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        placement="top"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-3xl font-bold">
                Product Details
              </ModalHeader>

              <ModalBody>
                {product ? (
                  <div>
                <img src={product.image} alt={product.name} />
                <h2>Name: {product.name}</h2>
                <p>Brand: {product.brand}</p>
                <p>Description: {product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Price: {product.price}</p>
                <p>Category: {product.category}</p>
                <p>
                  Tags:{" "}
                  {product.tags && product.tags.length > 0
                    ? product.tags.join(", ")
                    : "No tags"}
                </p>
                <p>Date Added: {product.date_added}</p>
                <p>
                  Available:{" "}
                  {JSON.parse(product.is_available) ? "true" : "false"}
                </p>
                <p>Weight: {product.weight}</p>
                <p>Dimensions: {product.dimensions}</p>
                <p>Warranty Info: {product.warranty_info}</p>
                <p>Notes: {product.notes}</p>
                </div>
                ) : (
                  <div>No product details available!</div>
                )}
              </ModalBody>

              <ModalFooter>
                <Button color="danger" onPress={onClose} radius="sm">
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductDetailsModal;
