import axios from "axios";

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

  static createCategory = async (name, description) => {
    const body = JSON.stringify({
      name,
      description,
    });

    const headers = {
      "Content-Type": "application/json",
    };

    const res = await axios.post(CATEGORIES_BASE_URL, body, { headers });
    const createdCategory = res.data;

    return createdCategory;
  };

  static updateCategory = async (categoryId, name, description) => {
    const body = JSON.stringify({
      categoryId,
      name,
      description,
    });

    const headers = {
      "Content-Type": "application/json",
    };

    const res = await axios.patch(
      `${CATEGORIES_BASE_URL}/${categoryId}`,
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
