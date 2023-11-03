import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
const ProductCreateModal = ({ isOpen, onOpenChange }) => {
  // TODO: input validation
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Product added!");
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
                Add Product
              </ModalHeader>

              <ModalBody>ProductDetailsForm</ModalBody>

              <ModalFooter>
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
                    startContent={<Plus />}
                  >
                    Add
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

export default ProductCreateModal;
