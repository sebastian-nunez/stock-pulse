import express from "express";
import CategoryController from "../controllers/categories.js";

const router = express.Router();

router.get("/api/products/categories", CategoryController.getAllCategories);
router.get(
  "/api/products/categories/:categoryId",
  CategoryController.getCategoryById
);
router.get(
  "/api/products/categories/byName/:categoryName",
  CategoryController.getCategoryByName
);
router.delete(
  "/api/products/categories/:categoryId",
  CategoryController.deleteCategory
);
router.post("/api/products/categories", CategoryController.createCategory);
router.patch(
  "/api/products/categories/:categoryId",
  CategoryController.updateCategory
);

export default router;
