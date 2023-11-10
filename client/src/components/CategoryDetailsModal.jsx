import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { ExternalLink } from "lucide-react";
import CategoryEditableModal from "./CategoryEditableModal";
import InfoPanel from "./InfoPanel";

const CategoryDetailsModal = ({ category, isOpen, onOpenChange }) => {
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

              <ModalFooter className="jus flex justify-between gap-3">
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

      <CategoryEditableModal
        title="Edit Category"
        canDelete={true}
        category={category}
        isOpen={isOpen_Edit}
        onOpenChange={onOpenChange_Edit}
      />
    </>
  );
};

export default CategoryDetailsModal;
