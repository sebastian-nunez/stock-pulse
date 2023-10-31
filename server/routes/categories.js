import express from "express";
import CategoryController from "../controllers/categories.js";

const router = express.Router();

router.get("/", CategoryController.getCategories);
router.get("/:categoryId", CategoryController.getCategoryById);
router.get("/byName/:categoryName", CategoryController.getCategoryByName);
router.delete("/:categoryId", CategoryController.deleteCategory);
router.post("/", CategoryController.createCategory);
router.patch("/:categoryId", CategoryController.updateCategory);

export default router;
