import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Save, Trash } from "lucide-react";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { EMPTY_PRODUCT } from "../utils/types";
import ProductDetailsForm from "./ProductDetailsForm";

const ProductEditableModal = ({
  title,
  canDelete = true,
  product = EMPTY_PRODUCT,
  isOpen,
  onOpenChange,
}) => {
  const [productInfo, setProductInfo] = useState(product);

  const onFormChange = (e) => {
    const { name, value } = e.target;

    setProductInfo((prev) => ({ ...prev, [name]: value }));
  };

  // TODO: input validation
  const handleDelete = () => {
    toast.success("Product deleted!");
  };

  // TODO: input validation
  const handleSubmit = () => {
    // if the product has an id, it means it's an existing product
    if (productInfo.product_id) {
      toast.success("Product updated!");
    } else {
      toast.success("Product created!");
    }

    console.log(productInfo);
  };

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
              {/* -------------------- Header -------------------- */}
              <ModalHeader className="flex flex-col gap-1 text-3xl font-bold">
                {title}
              </ModalHeader>

              {/* -------------------- Body -------------------- */}
              <ModalBody>
                <ProductDetailsForm
                  product={productInfo}
                  onFormChange={onFormChange}
                />
              </ModalBody>

              {/* -------------------- Footer -------------------- */}
              <ModalFooter className="flex justify-between">
                {/* --------- Left Footer ---------*/}
                <div className="flex gap-3">
                  {canDelete && (
                    <Button
                      color="danger"
                      onPress={onClose}
                      startContent={<Trash />}
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  )}
                </div>

                {/* --------- Right Footer ---------*/}
                <div className="flex gap-3">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>

                  <Button
                    color="primary"
                    onPress={onClose}
                    className="w-36"
                    radius="sm"
                    startContent={<Save />}
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Toaster position="top-right" />
    </>
  );
};

export default ProductEditableModal;
