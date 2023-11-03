import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Save, Trash } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

const ProductUpdateModal = ({ product, isOpen, onOpenChange }) => {
  // TODO: input validation
  const handleDelete = () => {
    toast.success("Product deleted!");
  };

  // TODO: input validation
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Product updated!");
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
            <form onSubmit={handleSubmit}>
              <ModalHeader className="flex flex-col gap-1 text-3xl font-bold">
                Edit Product
              </ModalHeader>

              <ModalBody>ProductDetailsForm</ModalBody>

              <ModalFooter className="flex justify-between">
                <div className="flex gap-3">
                  <Button
                    color="danger"
                    onPress={onClose}
                    startContent={<Trash />}
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </div>

                <div className="flex gap-3">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>

                  <Button
                    color="primary"
                    onPress={onClose}
                    type="submit"
                    className="w-36"
                    radius="sm"
                    startContent={<Save />}
                  >
                    Save
                  </Button>
                </div>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>

      <Toaster position="top-right" />
    </>
  );
};

export default ProductUpdateModal;
