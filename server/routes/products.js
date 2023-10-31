import express from "express";
import ProductsController from "../controllers/products.js";

const router = express.Router();

router.get("/", ProductsController.getProducts);
router.get("/:productId", ProductsController.getProductById);
router.get("/byName/:productName", ProductsController.getProductByName);
router.post("/", ProductsController.createProduct);
router.delete("/:productId", ProductsController.deleteProduct);
router.patch("/:productId", ProductsController.updateProduct);

export default router;
