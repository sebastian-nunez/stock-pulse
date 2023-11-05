import "../config/dotenv.js";
import Category from "../models/category.js";
import { validateCategoryDetails } from "../utils/validator.js";

class CategoryController {
  static getCategories = async (req, res) => {
    try {
      const categories = await Category.getAll();
      res.status(200).json(categories);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static getCategoryById = async (req, res) => {
    let { categoryId } = req.params;

    try {
      categoryId = parseInt(categoryId);

      const category = await Category.getOneById(categoryId);

      if (!category) {
        res.status(404).json({ message: "Category not found!" });
        return;
      }

      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static getCategoryByName = async (req, res) => {
    const { categoryName } = req.params;

    try {
      const category = await Category.getOneByName(categoryName);

      if (!category) {
        res.status(404).json({ message: "Category not found!" });
        return;
      }

      res.status(200).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static deleteCategory = async (req, res) => {
    let { categoryId } = req.params;

    try {
      categoryId = parseInt(categoryId);

      // check if the category exists
      const category = await Category.getOneById(categoryId);

      if (!category) {
        res.status(404).json({ message: "Category not found!" });
        return;
      }

      const deletedCategory = await Category.deleteOne(categoryId);

      res
        .status(200)
        .json({ message: "Category deleted successfully!", deletedCategory });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static createCategory = async (req, res) => {
    let { name, description } = req.body;

    try {
      // check if the required fields are provided
      validateCategoryDetails({ name, description });

      // check if the category already exists
      const category = await Category.getOneByName(name);

      if (category) {
        res.status(409).json({ message: "Category already exists!" });
        return;
      }

      // create the NEW category
      const createdCategory = await Category.createOne(name, description);

      res
        .status(201)
        .json({ message: "Category created successfully!", createdCategory });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static updateCategory = async (req, res) => {
    let { categoryId } = req.params;
    const { name, description } = req.body;

    try {
      // check if the required fields are provided
      validateCategoryDetails({ name, description });
      categoryId = parseInt(categoryId);

      // check if the category exists
      const category = await Category.getOneById(categoryId);

      if (!category) {
        res.status(404).json({ message: "Category not found!" });
        return;
      }

      // update the category
      const updatedCategory = await Category.updateOne(
        categoryId,
        name,
        description
      );

      res
        .status(200)
        .json({ message: "Category updated successfully!", updatedCategory });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

export default CategoryController;
