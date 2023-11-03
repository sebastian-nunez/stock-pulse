import axios from "axios";
import { isValidCategoryDetails } from "../../../server/utils/validator";

const CATEGORIES_BASE_URL = "/api/categories";

class CategoriesAPI {
  static getCategories = async () => {
    const res = await axios.get(CATEGORIES_BASE_URL);
    const categories = res.data;

    return categories;
  };

  static getCategoryById = async (categoryId) => {
    const res = await axios.get(`${CATEGORIES_BASE_URL}/${categoryId}`);
    const category = res.data;

    return category;
  };

  static getCategoryByName = async (categoryName) => {
    const res = await axios.get(
      `${CATEGORIES_BASE_URL}/byName/${categoryName}`,
    );
    const category = res.data;

    return category;
  };

  static deleteCategory = async (categoryId) => {
    const res = await axios.delete(`${CATEGORIES_BASE_URL}/${categoryId}`);
    const deletedCategory = res.data;

    return deletedCategory;
  };

  static createCategory = async (categoryDetails) => {
    if (!isValidCategoryDetails(categoryDetails)) {
      throw new Error("Invalid category details!");
    }

    const body = JSON.stringify(categoryDetails);

    const headers = {
      "Content-Type": "application/json",
    };

    const res = await axios.post(CATEGORIES_BASE_URL, body, { headers });
    const createdCategory = res.data;

    return createdCategory;
  };

  static updateCategory = async (categoryDetails) => {
    if (
      !isValidCategoryDetails(categoryDetails) ||
      !categoryDetails.category_id
    ) {
      throw new Error("Invalid category details!");
    }

    const body = JSON.stringify(categoryDetails);

    const headers = {
      "Content-Type": "application/json",
    };

    const res = await axios.patch(
      `${CATEGORIES_BASE_URL}/${categoryDetails.category_id}`,
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
