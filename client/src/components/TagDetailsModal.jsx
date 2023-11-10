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
import InfoPanel from "./InfoPanel";
import TagEditableModal from "./TagEditableModal";

const TagDetailsModal = ({ tag, isOpen, onOpenChange }) => {
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
                Tag Details
              </ModalHeader>

              <ModalBody>
                {tag ? (
                  <div className="flex flex-col gap-3">
                    {/* ------------------- BASIC INFO ------------------- */}
                    <InfoPanel title="Basic Info">
                      <h2>
                        <strong>Name:</strong> {tag?.name}
                      </h2>
                    </InfoPanel>

                    {/* ------------------- DESCRIPTION -------------------*/}
                    <InfoPanel title="Description">
                      <p>{tag?.description}</p>
                    </InfoPanel>
                  </div>
                ) : (
                  <p>Unable to fetch tag details, please try again.</p>
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

      <TagEditableModal
        title="Edit Tag"
        canDelete={true}
        tag={tag}
        isOpen={isOpen_Edit}
        onOpenChange={onOpenChange_Edit}
      />
    </>
  );
};

export default TagDetailsModal;
