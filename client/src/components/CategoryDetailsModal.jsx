import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import InfoPanel from "./InfoPanel";

const CategoryDetailsModal = ({ category, isOpen, onOpenChange }) => {
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
              <ModalHeader className="flex flex-col gap-3 text-3xl font-bold">
                Category Details
              </ModalHeader>

              <ModalBody>
                {category ? (
                  <div className="flex flex-col gap-3">
                    {/* ------------------- BASIC INFO ------------------- */}
                    <InfoPanel title="Basic Info">
                      <h2>
                        <strong>Name:</strong> {category?.name}
                      </h2>
                    </InfoPanel>

                    {/* ------------------- DESCRIPTION -------------------*/}
                    <InfoPanel title="Description">
                      <p>{category?.description}</p>
                    </InfoPanel>
                  </div>
                ) : (
                  <p>Unable to fetch category details, please try again.</p>
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

export default CategoryDetailsModal;
