import express from "express";
import ProductTagController from "../controllers/productTag.js";

const router = express.Router();

//get all products tags GET /api/products/product-tag
router.get("/", ProductTagController.getProductTags);
//get products with a specific tag GET /api/products/product-tag/products/:tagId
router.get("/products/:tagId", ProductTagController.getProductsWithTag);
//get all tags of a specific product GET /api/products/product-tag/tags/:productId
router.get("/tags/:productId", ProductTagController.getTagsOfProduct);
//create a product tag POST /api/products/product-tag
router.post("/", ProductTagController.createProductTag);
//delete a product tag DELETE /api/products/product-tag
router.delete("/", ProductTagController.deleteProductTag);
//delete all tags of a specific product DELETE /api/products/product-tag/tags/:productId
router.delete("/tags/:productId", ProductTagController.deleteAllTagsOfProduct);

export default router;
