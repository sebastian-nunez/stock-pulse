import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import ProductsAPI from "../services/ProductsAPI";

/**
 *  Custom hook to delete, update, and create products
 * @param {Function} onSuccessAction callback function to execute after a successful action
 * @returns {Object} deleteProduct, updateProduct, createProduct
 */
const useProducts = ({ onSuccessAction }) => {
  // react-query
  const queryClient = useQueryClient();

  const deleteProduct = useMutation(ProductsAPI.deleteProduct, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(["products"]);

      const productName = response.deletedProduct.name;
      toast.success(`${productName} successfully deleted!`);

      onSuccessAction();
    },
  });

  const updateProduct = useMutation(ProductsAPI.updateProduct, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(["products"]);

      const productName = response.updatedProduct.name;
      toast.success(`${productName} successfully updated!`);

      onSuccessAction();
    },
  });

  const createProduct = useMutation(ProductsAPI.createProduct, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(["products"]);

      const productName = response.createdProduct.name;
      toast.success(`${productName} successfully created!`);

      onSuccessAction();
    },
  });

  return { deleteProduct, updateProduct, createProduct };
};

export default useProducts;
