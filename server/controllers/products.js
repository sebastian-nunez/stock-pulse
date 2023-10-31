import Product from "../models/product.js";

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

  static createProduct = async (req, res) => {
    const productDetails = req.body;

    try {
      const createdProduct = await Product.createOne(productDetails);

      if (!createdProduct) {
        res.status(409).json({ message: "Product already exists!" });
        return;
      }

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

    try {
      productId = parseInt(productId);

      const updatedProduct = await Product.updateOne(productId, productDetails);

      if (!updatedProduct) {
        res.status(404).json({ message: "Product not found!" });
        return;
      }

      res
        .status(200)
        .json({ message: "Product updated successfully!", updatedProduct });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

export default ProductsController;
