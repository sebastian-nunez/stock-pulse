import express from "express";
import ProductsController from "../controllers/products";

const router = express.Router();

router.get("/", ProductsController.getProducts);
router.get("/:productId", ProductsController.getProductById);
router.post("/", ProductsController.createProduct);
router.delete("/:productId", ProductsController.deleteProduct);
router.patch("/:productId", ProductsController.updateProduct);

export default router;
