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
import useCategories from "../hooks/useCategories";
import CategoryDetailsForm from "./CategoryDetailsForm";

const CategoryEditableModal = ({
  title,
  canDelete = true,
  category,
  isOpen,
  onOpenChange,
}) => {
  // state
  const categoryId = category?.category_id || null;

  // react-query
  const { createCategory, updateCategory, deleteCategory } = useCategories({
    onSuccessAction: () => {
      onOpenChange(); // close the modal
    },
  });

  // determine if the category is loading
  const isLoading =
    createCategory.isLoading ||
    updateCategory.isLoading ||
    deleteCategory.isLoading;

  const handleDelete = () => {
    if (!categoryId) {
      toast.error("Category does not have a valid ID, unable to delete!");
      return;
    }

    deleteCategory.mutate(categoryId);
  };

  const handleSave = async (categoryDetails) => {
    // if the category has an id, it means it's an existing category
    if (categoryId) {
      // add the category id to the category details
      const updatedCategoryDetails = {
        category_id: categoryId,
        ...categoryDetails,
      };

      updateCategory.mutate(updatedCategoryDetails);
    } else {
      createCategory.mutate(categoryDetails);
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
                  <CategoryDetailsForm
                    category={category}
                    onSubmit={handleSave}
                  />
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
                    form="category-details-form"
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

export default CategoryEditableModal;
