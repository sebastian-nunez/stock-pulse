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
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import ProductsAPI from "../services/ProductsAPI";
import ProductDetailsForm from "./ProductDetailsForm";

const ProductEditableModal = ({
  title,
  canDelete = true,
  product,
  isOpen,
  onOpenChange,
}) => {
  const [productDetails, setProductDetails] = useState(product || null);

  // react-query
  const queryClient = useQueryClient();
  const isLoading =
    queryClient.isMutating(["products"]) ||
    queryClient.isFetching(["tags", "categories", "products"]); // handle the loading states

  const deleteProduct = useMutation(ProductsAPI.deleteProduct, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(["products"]);

      const productName = response.deletedProduct.name;
      toast.success(`${productName} successfully deleted!`);

      // close the modal
      onOpenChange();
      setProductDetails(null); // reset the product details
    },
  });

  const updateProduct = useMutation(ProductsAPI.updateProduct, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(["products"]);

      const productName = response.updatedProduct.name;
      toast.success(`${productName} successfully updated!`);

      // close the modal (keep the state of the form)
      onOpenChange();
    },
  });

  const createProduct = useMutation(ProductsAPI.createProduct, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(["products"]);

      const productName = response.createdProduct.name;
      toast.success(`${productName} successfully created!`);

      // close the modal
      onOpenChange();
      setProductDetails(null); // reset the product details
    },
  });

  const handleDelete = () => {
    if (!product.product_id) {
      toast.error("Product does not have a valid ID, unable to delete!");
      return;
    }

    deleteProduct.mutate(product.product_id);
  };

  const handleSave = (formValues, reset) => {
    // convert tags string to array (ensure it's a string first)
    // const tagsArray =
    //   formValues?.tags?.length > 0 ? `${formValues?.tags}`.split(",") : [];

    // combine the existing product details with the form values
    const newProductDetails = {
      ...productDetails,
      ...formValues,
      // tags: tagsArray,
    };
    setProductDetails(newProductDetails); // async state update

    // if the product has an id, it means it's an existing product
    if (newProductDetails.product_id) {
      // detect if there are any changes
      if (
        JSON.stringify(newProductDetails) === JSON.stringify(productDetails)
      ) {
        toast.error("No changes detected, nothing to update!");
        return;
      }

      updateProduct.mutate(newProductDetails);
    } else {
      createProduct.mutate(newProductDetails);
    }

    reset(); // reset the form
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
                  <ProductDetailsForm
                    product={productDetails}
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
                    form="product-details-form"
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

      <Toaster position="top-right" />
    </>
  );
};

export default ProductEditableModal;
