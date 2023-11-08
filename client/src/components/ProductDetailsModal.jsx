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
                    {/* IMAGE */}
                    <div className="m-2 border p-2">
                      <img src={product.image} alt={product.name} />
                    </div>

                    {/* BASIC INFO */}
                    <div className="m-2 border p-2">
                      <h1 className="font-bold">Basic Info</h1>
                      <div className="flex flex-row gap-4">
                      <div className="flex flex-col">
                        <h2>Name: {product.name}</h2>
                        <p>Brand: {product.brand}</p>
                        <p>Category: {product.category}</p>
                        <p>
                          Tags:{" "}
                          {product.tags && product.tags.length > 0
                            ? product.tags.join(", ")
                            : "No tags"}
                        </p>
                        </div>
                        <div className="flex flex-col">
                          <p>Price: ${product.price}</p>
                          <p>Quantity: {product.quantity}</p>
                          <p>
                            Available:{" "}
                            {JSON.parse(product.is_available)
                              ? "true"
                              : "false"}
                          </p>
                          <p>Date Added: {product.date_added}</p>
                      </div>
                      </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="m-2 border p-2">
                      <h1 className="font-bold">Description</h1>
                      <p>{product.description}</p>
                    </div>

                    {/* MANUFACTURER */}
                    <div className="m-2 border p-2">
                      <h1 className="font-bold">Manufacturer</h1>
                      <p>Weight: {product.weight}</p>
                      <p>Dimensions: {product.dimensions}</p>
                      <p>Warranty Info: {product.warranty_info}</p>
                    </div>

                    {/* NOTES */}
                    <div className="m-2 border p-2">
                      <h1 className="font-bold">NOTES</h1>
                      <p>{product.notes}</p>
                    </div>
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
