import axios from "axios";
import { validateCategoryDetails } from "../../../server/utils/validator";
import { CATEGORIES_BASE_URL } from "../utils/constants.js";

class CategoriesAPI {
  static getCategories = async () => {
    const res = await axios.get(CATEGORIES_BASE_URL);
    validateCategoryDetails(res.data[0]); // validate the first category

    return res.data;
  };

  static getCategoryById = async (categoryId) => {
    const res = await axios.get(`${CATEGORIES_BASE_URL}/${categoryId}`);
    const validatedCategory = validateCategoryDetails(res.data);

    return validatedCategory;
  };

  static getCategoryByName = async (categoryName) => {
    const res = await axios.get(
      `${CATEGORIES_BASE_URL}/byName/${categoryName}`,
    );
    const validatedCategory = validateCategoryDetails(res.data);

    return validatedCategory;
  };

  static deleteCategory = async (categoryId) => {
    const res = await axios.delete(`${CATEGORIES_BASE_URL}/${categoryId}`);
    const deletedCategory = res.data;

    return deletedCategory;
  };

  static createCategory = async (categoryDetails) => {
    const validatedCategory = validateCategoryDetails(categoryDetails);

    const body = JSON.stringify(validatedCategory);

    const headers = {
      "Content-Type": "application/json",
    };

    const res = await axios.post(CATEGORIES_BASE_URL, body, { headers });
    const createdCategory = res.data;

    return createdCategory;
  };

  static updateCategory = async (categoryDetails) => {
    const validatedCategory = validateCategoryDetails(categoryDetails);

    if (!validatedCategory.category_id) {
      throw new Error("Category id is required!");
    }

    const body = JSON.stringify(validatedCategory);

    const headers = {
      "Content-Type": "application/json",
    };

    const res = await axios.patch(
      `${CATEGORIES_BASE_URL}/${validatedCategory.category_id}`,
      body,
      {
        headers,
      },
    );
    const updatedCategory = res.data;

    return updatedCategory;
  };
}

export default CategoriesAPI;
