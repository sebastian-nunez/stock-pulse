import express from "express";
import ProductTagController from "../controllers/productTag.js";

const router = express.Router();

//get all products tags GET /api/products/product-tag
router.get("/product-tag", ProductTagController.getProductTags);
//get products with a specific tag GET /api/products/product-tag/products/:tagId
router.get(
  "/product-tag/products/:tagId",
  ProductTagController.getProductsWithTag
);
//get all tags of a specific product GET /api/products/product-tag/tags/:productId
router.get(
  "/product-tag/tags/:productId",
  ProductTagController.getTagsOfProduct
);
//create a product tag POST /api/products/product-tag
router.post("/product-tag", ProductTagController.createProductTag);
//delete a product tag DELETE /api/products/product-tag
router.delete("/:tagId", ProductTagController.deleteProductTag);
//delete all tags of a specific product DELETE /api/products/product-tag/tags/:productId
router.delete(
  "/product-tag/tags/:productId",
  ProductTagController.deleteAllTagsOfProduct
);

export default router;
