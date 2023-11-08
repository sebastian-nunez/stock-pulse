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
  const productId = product?.product_id || null;

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
    },
  });

  const handleDelete = () => {
    if (!product.product_id) {
      toast.error("Product does not have a valid ID, unable to delete!");
      return;
    }

    deleteProduct.mutate(product.product_id);
  };

  const handleSave = (productDetails) => {
    // if the product has an id, it means it's an existing product
    if (productId) {
      // add the product id to the product details
      const updatedProductDetails = {
        product_id: productId,
        ...productDetails,
      };

      updateProduct.mutate(updatedProductDetails);
    } else {
      createProduct.mutate(productDetails);
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
                  <ProductDetailsForm product={product} onSubmit={handleSave} />
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
    </>
  );
};

export default ProductEditableModal;
