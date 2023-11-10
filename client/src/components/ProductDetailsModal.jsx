import {
  Button,
  Chip,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import { convertDatetimeToMMDDYYYY } from "../utils/types";
import InfoPanel from "./InfoPanel";
import ProductEditableModal from "./ProductEditableModal";

const ProductDetailsModal = ({ product, isOpen, onOpenChange }) => {
  const {
    isOpen: isOpen_Edit,
    onOpen: onOpen_Edit,
    onOpenChange: onOpenChange_Edit,
  } = useDisclosure();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        placement="top"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-3 text-3xl font-bold">
                Product Details
              </ModalHeader>

              <ModalBody>
                {product ? (
                  <div className="flex flex-col gap-3 md:flex-row">
                    <div className="flex flex-col gap-3 md:w-1/3">
                      {/* ------------------- IMAGE ------------------- */}
                      <div className="flex h-fit flex-col items-center justify-center gap-2">
                        {product?.image ? (
                          <Image
                            src={product?.image}
                            alt={product?.name}
                            isZoomed
                            className="h-60 w-80 object-cover object-center md:w-96"
                            onError={() =>
                              toast.error(
                                "Failed to load image for " + product?.name,
                              )
                            }
                          />
                        ) : (
                          <div className="flex h-60 w-full items-center justify-center rounded-lg border drop-shadow-sm">
                            No image available.
                          </div>
                        )}

                        <p className="text-sm">
                          <strong>Date Added:</strong>{" "}
                          {product?.date_added
                            ? convertDatetimeToMMDDYYYY(product.date_added)
                            : "Unknown"}
                        </p>
                      </div>

                      {/* ------------------- TAGS ------------------- */}
                      <InfoPanel title="Tags">
                        <div className="mt-2 flex flex-wrap gap-2">
                          {product?.tags.map((tag, index) => {
                            return (
                              <Chip key={tag + index} color="primary">
                                {tag}
                              </Chip>
                            );
                          })}
                        </div>
                      </InfoPanel>
                    </div>

                    <div className="flex flex-col gap-3 md:w-2/3">
                      {/* ------------------- BASIC INFO ------------------- */}
                      <InfoPanel title="Basic Info">
                        <div className="flex flex-col gap-3 sm:flex-row">
                          <div className="flex flex-col sm:w-1/2">
                            <h2>
                              <strong>Name:</strong> {product?.name}
                            </h2>
                            <p>
                              <strong>Brand:</strong> {product?.brand}
                            </p>
                            <p>
                              <strong>Category:</strong>{" "}
                              {product?.category || "Unknown"}
                            </p>
                          </div>

                          <div className="flex flex-col sm:w-1/2">
                            <p>
                              <strong>Price:</strong> ${product?.price}
                            </p>

                            <p>
                              <strong>Quantity:</strong> {product?.quantity}
                            </p>

                            <p>
                              <strong>Available: </strong>
                              {product?.is_available ? "Yes" : "No"}
                            </p>
                          </div>
                        </div>
                      </InfoPanel>
                      {/* ------------------- DESCRIPTION -------------------*/}
                      <InfoPanel title="Description">
                        <p>{product?.description}</p>
                      </InfoPanel>

                      {/* ------------------- MANUFACTURER ------------------- */}
                      <InfoPanel title="Manufacturer">
                        <p>
                          <strong>Weight:</strong> {product?.weight}
                        </p>
                        <p>
                          <strong>Dimensions:</strong> {product?.dimensions}
                        </p>
                        <p>
                          <strong>Warranty Info:</strong>{" "}
                          {product?.warranty_info}
                        </p>
                      </InfoPanel>

                      {/* ------------------- NOTES ------------------- */}
                      <InfoPanel title="Notes">
                        <p>{product?.notes}</p>
                      </InfoPanel>
                    </div>
                  </div>
                ) : (
                  <div>No product details available!</div>
                )}
              </ModalBody>

              <ModalFooter className="flex justify-between gap-3">
                <Button
                  color="primary"
                  variant="ghost"
                  onPress={() => {
                    onClose();
                    onOpen_Edit();
                  }}
                  radius="sm"
                  startContent={<ExternalLink height={20} width={20} />}
                >
                  Edit
                </Button>

                <Button
                  color="danger"
                  onPress={onClose}
                  radius="sm"
                  className="w-40"
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <ProductEditableModal
        title="Edit Product"
        canDelete={true}
        product={product}
        isOpen={isOpen_Edit}
        onOpenChange={onOpenChange_Edit}
      />
    </>
  );
};

export default ProductDetailsModal;
