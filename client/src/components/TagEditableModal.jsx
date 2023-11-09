import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { Save, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import useTags from "../hooks/useTags";
import TagDetailsForm from "./TagDetailsForm";

const TagEditableModal = ({
  title,
  canDelete = true,
  tag,
  isOpen,
  onOpenChange,
}) => {
  // state
  const tagId = tag?.tag_id || null;

  // react-query
  const { createTag, updateTag, deleteTag } = useTags({
    onSuccessAction: () => {
      onOpenChange(); // close the modal
    },
  });

  // determine if the tag is loading
  const isLoading =
    createTag.isLoading || updateTag.isLoading || deleteTag.isLoading;

  const handleDelete = () => {
    if (!tagId) {
      toast.error("Tag does not have a valid ID, unable to delete!");
      return;
    }

    deleteTag.mutate(tagId);
  };

  const handleSave = async (tagDetails) => {
    // if the tag has an id, it means it's an existing tag
    if (tagId) {
      // add the tag id to the tag details
      const updatedTagDetails = {
        tag_id: tagId,
        ...tagDetails,
      };

      updateTag.mutate(updatedTagDetails);
    } else {
      createTag.mutate(tagDetails);
    }
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
                {isLoading ? (
                  <Spinner size="md" color="primary" label="Loading..." />
                ) : (
                  <TagDetailsForm tag={tag} onSubmit={handleSave} />
                )}
              </ModalBody>

              {/* -------------------- Footer -------------------- */}
              <ModalFooter className="flex justify-between">
                {/* --------- Left Footer ---------*/}
                <div className="flex gap-3">
                  {canDelete && (
                    <Button
                      color="danger"
                      startContent={<Trash />}
                      onClick={handleDelete}
                      isDisabled={isLoading}
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
                    form="tag-details-form"
                    type="submit"
                    color="primary"
                    className="w-36"
                    radius="sm"
                    startContent={<Save />}
                    isDisabled={isLoading}
                  >
                    Save
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default TagEditableModal;
