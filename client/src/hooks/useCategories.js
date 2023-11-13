import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import CategoriesAPI from "../services/CategoriesAPI";
import { CATEGORIES_QUERY_KEY } from "../utils/constants";

/**
 *  Custom hook to delete, update, and create categories
 * @param {Function} onSuccessAction callback function to execute after a successful action
 * @returns {Object} deleteCategory, updateCategory, createCategory
 */
const useCategories = ({ onSuccessAction = () => {} }) => {
  // react-query
  const queryClient = useQueryClient();

  const deleteCategory = useMutation(CategoriesAPI.deleteCategory, {
    onSuccess: (response) => {
      queryClient.invalidateQueries([CATEGORIES_QUERY_KEY]);

      const categoryName = response.deletedCategory.name;
      toast.success(`${categoryName} successfully deleted!`);

      onSuccessAction();
    },
  });

  const updateCategory = useMutation(CategoriesAPI.updateCategory, {
    onSuccess: (response) => {
      queryClient.invalidateQueries([CATEGORIES_QUERY_KEY]);

      const categoryName = response.updatedCategory.name;
      toast.success(`${categoryName} successfully updated!`);

      onSuccessAction();
    },
  });

  const createCategory = useMutation(CategoriesAPI.createCategory, {
    onSuccess: (response) => {
      queryClient.invalidateQueries([CATEGORIES_QUERY_KEY]);

      const categoryName = response.createdCategory.name;
      toast.success(`${categoryName} successfully created!`);

      onSuccessAction();
    },
  });

  return { deleteCategory, updateCategory, createCategory };
};

export default useCategories;
