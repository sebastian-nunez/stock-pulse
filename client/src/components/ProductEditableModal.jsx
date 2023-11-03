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
import { isValidProductDetails } from "../../../server/utils/validator";
import ProductsAPI from "../services/ProductsAPI";
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

  const queryClient = useQueryClient();
  const isLoading = queryClient.isMutating() || queryClient.isFetching(); // handle the loading states

  const deleteProduct = useMutation(ProductsAPI.deleteProduct, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(["products"]);

      const productName = response.deletedProduct.name;
      toast.success(`${productName} successfully deleted!`);

      // close the modal and reset the form
      onOpenChange();
      setProductInfo(EMPTY_PRODUCT); // TODO: this is a hacky way to clear the form
    },
  });

  const updateProduct = useMutation(ProductsAPI.updateProduct, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(["products"]);

      const productName = response.updatedProduct.name;
      toast.success(`${productName} successfully updated!`);

      // TODO: clear out the form?

      // close the modal
      onOpenChange();
    },
  });

  const createProduct = useMutation(ProductsAPI.createProduct, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(["products"]);

      const productName = response.createdProduct.name;
      toast.success(`${productName} successfully created!`);

      // TODO: clear out the form

      // close the modal
      onOpenChange();
    },
  });

  const onFormChange = (e) => {
    const { name, value } = e.target;

    setProductInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = () => {
    if (!productInfo.product_id) {
      toast.error("Product does not have a valid ID, unable to delete!");
      return;
    }

    deleteProduct.mutate(productInfo.product_id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validate product details
    if (!isValidProductDetails(productInfo)) {
      toast.error("Invalid product details!");
      return;
    }

    // if the product has an id, it means it's an existing product
    if (productInfo.product_id) {
      updateProduct.mutate(productInfo);
    } else {
      createProduct.mutate(productInfo);
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
                  <ProductDetailsForm
                    product={productInfo}
                    onSubmit={handleSubmit}
                    onFormChange={onFormChange}
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
