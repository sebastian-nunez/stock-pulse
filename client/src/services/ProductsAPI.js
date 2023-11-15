import axios from "axios";
import { PRODUCTS_BASE_URL } from "../utils/constants.js";
import { validateProductDetails } from "../utils/validator.js";

class ProductsAPI {
  static getAllProducts = async () => {
    const res = await axios.get(PRODUCTS_BASE_URL);
    validateProductDetails(res.data[0]); // validate the first product

    return res.data;
  };

  static getProductById = async (productId) => {
    const res = await axios.get(`${PRODUCTS_BASE_URL}/${productId}`);
    const validatedProduct = validateProductDetails(res.data);

    return validatedProduct;
  };

  static getProductByName = async (productName) => {
    const res = await axios.get(`${PRODUCTS_BASE_URL}/byName/${productName}`);
    const validatedProduct = validateProductDetails(res.data);

    return validatedProduct;
  };

  static deleteProduct = async (productId) => {
    const res = await axios.delete(`${PRODUCTS_BASE_URL}/${productId}`);
    const deletedProduct = res.data;

    return deletedProduct;
  };

  static createProduct = async (productDetails) => {
    const validatedProduct = validateProductDetails(productDetails);

    const body = JSON.stringify(validatedProduct);
    const headers = {
      "Content-Type": "application/json",
    };

    const res = await axios.post(PRODUCTS_BASE_URL, body, { headers });
    const createdProduct = res.data;

    return createdProduct;
  };

  static updateProduct = async (productDetails) => {
    const validatedProduct = validateProductDetails(productDetails);

    if (!validatedProduct.product_id) {
      throw new Error("Product id is required!");
    }

    const body = JSON.stringify(validatedProduct);
    const headers = {
      "Content-Type": "application/json",
    };

    const res = await axios.patch(
      `${PRODUCTS_BASE_URL}/${validatedProduct.product_id}`,
      body,
      {
        headers,
      },
    );
    const updatedProduct = res.data;

    return updatedProduct;
  };
}

export default ProductsAPI;
