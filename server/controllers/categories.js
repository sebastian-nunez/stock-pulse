import "../config/dotenv.js";
import Category from "../models/categories.js";

class CategoryController {
  static getCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static getCategoryById = async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static getCategoryByName = async (req, res) => {
    try {
      const category = await Category.findOne({ name: req.params.name });
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static deleteCategory = async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static createCategory = async (req, res) => {
    const { name, description } = req.body;
    const category = new Category({
      name,
      description,
    });

    try {
      const newCategory = await category.save();
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static updateCategory = async (req, res) => {
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          description: req.body.description,
        },
        { new: true }
      );
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default CategoryController;
