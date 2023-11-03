import Category from "../models/category.js";
import Product from "../models/product.js";
import ProductTag from "../models/productTag.js";
import Tag from "../models/tag.js";
import { isValidProductDetails } from "../utils/validator.js";

class ProductsController {
  static getProducts = async (req, res) => {
    try {
      const products = await Product.getAll();

      if (!products) {
        res.status(404).json({ message: "No products found!" });
        return;
      }

      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static getProductById = async (req, res) => {
    let { productId } = req.params;

    try {
      productId = parseInt(productId);

      const product = await Product.getOneById(productId);

      if (!product) {
        res.status(404).json({ message: "Product not found!" });
        return;
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static getProductByName = async (req, res) => {
    const { productName } = req.params;

    try {
      const product = await Product.getOneByName(productName);

      if (!product) {
        res.status(404).json({ message: "Product not found!" });
        return;
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static createProduct = async (req, res) => {
    const productDetails = req.body;
    const { name, category, tags } = productDetails;

    // check if the required fields are provided
    if (!isValidProductDetails(productDetails)) {
      res.status(400).json({
        message:
          "Please provide all the required fields within the body of the request!"
      });

      return;
    }

    try {
      // check if the product already exists
      const product = await Product.getOneByName(name);

      if (product) {
        res.status(409).json({ message: "Product already exists!" });
        return;
      }

      // check if the category already exists (if not, create it!)
      let categoryFound = await Category.getOneByName(category);

      if (!categoryFound) {
        categoryFound = await Category.createOne(
          category,
          "No description available."
        );
      }

      // create the product
      const newProductDetails = {
        ...productDetails,
        categoryId: categoryFound.category_id
      };
      const createdProduct = await Product.createOne(newProductDetails);

      // get all the tag ids
      const tagIds = [];

      for (let tagName of tags) {
        let tagFound = await Tag.getOneByName(tagName);

        if (!tagFound) {
          tagFound = await Tag.createOne(tagName, "No description available.");
        }

        tagIds.push(tagFound.tag_id);
      }

      // add the tags to the product
      tagIds.forEach(async tagId => {
        await ProductTag.createOne(createdProduct.product_id, tagId);
      });

      res
        .status(201)
        .json({ message: "Product created successfully!", createdProduct });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static deleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
      const deletedProduct = await Product.deleteOne(productId);

      if (!deletedProduct) {
        res.status(404).json({ message: "Product not found!" });
        return;
      }

      res
        .status(200)
        .json({ message: "Product deleted successfully!", deletedProduct });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  static updateProduct = async (req, res) => {
    let { productId } = req.params;
    const productDetails = req.body;
    const { category, tags } = productDetails;

    // check if the required fields are provided
    if (!isValidProductDetails(productDetails)) {
      res.status(400).json({
        message:
          "Please provide all the required fields within the body of the request!"
      });
      return;
    }

    try {
      productId = parseInt(productId);

      // check if the product exists
      const product = await Product.getOneById(productId);

      if (!product) {
        res.status(404).json({ message: "Product not found!" });
        return;
      }

      // delete all the tags associated with the product
      await ProductTag.deleteAllTags(productId);

      // get all the NEW tag ids
      const tagIds = [];

      for (let tagName of tags) {
        let tagFound = await Tag.getOneByName(tagName);

        if (!tagFound) {
          tagFound = await Tag.createOne(tagName, "No description available.");
        }

        tagIds.push(tagFound.tag_id);
      }

      // add the tags to the product
      tagIds.forEach(async tagId => {
        await ProductTag.createOne(productId, tagId);
      });

      // check if the category already exists (if not, create it and save the category_id)
      let categoryFound = await Category.getOneByName(category);

      if (!categoryFound) {
        categoryFound = await Category.createOne(
          category,
          "No description available."
        );
      }

      // update the product
      const updatedProductDetails = {
        ...productDetails,
        categoryId: categoryFound.category_id
      };

      const updatedProduct = await Product.updateOne(
        productId,
        updatedProductDetails
      );

      res
        .status(200)
        .json({ message: "Product updated successfully!", updatedProduct });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

export default ProductsController;
