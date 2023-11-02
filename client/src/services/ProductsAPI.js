import axios from "axios";

const PRODUCTS_BASE_URL = "/api/products";

class ProductsAPI {
  static getAllProducts = async () => {
    const res = await axios.get(PRODUCTS_BASE_URL);
    const products = res.data;

    return products;
  };

  static getProductById = async (productId) => {
    const res = await axios.get(`${PRODUCTS_BASE_URL}/${productId}`);
    const product = res.data;

    return product;
  };

  static getProductByName = async (productName) => {
    const res = await axios.get(`${PRODUCTS_BASE_URL}/byName/${productName}`);
    const product = res.data;

    return product;
  };

  static deleteProduct = async (productId) => {
    const res = await axios.delete(`${PRODUCTS_BASE_URL}/${productId}`);
    const deletedProduct = res.data;

    return deletedProduct;
  };

  static createProduct = async (
    name,
    brand,
    description,
    image,
    quantity,
    price,
    isAvailable,
    weight,
    dimensions,
    warrantyInfo,
    notes,
    category,
    tags,
  ) => {
    const body = JSON.stringify({
      name,
      brand,
      description,
      image,
      quantity,
      price,
      isAvailable,
      weight,
      dimensions,
      warrantyInfo,
      notes,
      category,
      tags,
    });

    const headers = {
      "Content-Type": "application/json",
    };

    const res = await axios.post(PRODUCTS_BASE_URL, body, { headers });
    const createdProduct = res.data;

    return createdProduct;
  };

  static updateProduct = async (
    productId,
    name,
    brand,
    description,
    image,
    quantity,
    price,
    isAvailable,
    weight,
    dimensions,
    warrantyInfo,
    notes,
    category,
    tags,
  ) => {
    const body = JSON.stringify({
      name,
      brand,
      description,
      image,
      quantity,
      price,
      isAvailable,
      weight,
      dimensions,
      warrantyInfo,
      notes,
      category,
      tags,
    });

    const headers = {
      "Content-Type": "application/json",
    };

    const res = await axios.patch(`${PRODUCTS_BASE_URL}/${productId}`, body, {
      headers,
    });
    const updatedProduct = res.data;

    return updatedProduct;
  };
}

export default ProductsAPI;
