import "../config/dotenv.js";
import Category from "../models/categories.js";

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

      const deletedCategory = await Category.deleteOne(categoryId);

      if (!deletedCategory) {
        res.status(404).json({ message: "Category not found!" });
        return;
      }

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
      const createdCategory = await Category.createOne(name, description);

      if (!createdCategory) {
        res.status(409).json({ message: "Category already exists!" });
        return;
      }

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
      categoryId = parseInt(categoryId);

      const updatedCategory = await Category.updateOne(categoryId, name, description);

      if (!updatedCategory) {
        res.status(404).json({ message: "Category not found!" });
        return;
      }

      res
        .status(200)
        .json({ message: "Category updated successfully!", updatedCategory });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

export default CategoryController;
