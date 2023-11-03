import axios from "axios";
import { isValidProductTagDetails } from "../../../server/utils/validator";

const PRODUCT_TAGS_BASE_URL = "/api/product-tag";

class ProductTagsAPI {
  static getProductTags = async () => {
    const res = await axios.get(PRODUCT_TAGS_BASE_URL);
    const productTags = res.data;

    return productTags;
  };

  static getProductsWithTag = async (tagId) => {
    const res = await axios.get(`${PRODUCT_TAGS_BASE_URL}/products/${tagId}`);
    const products = res.data;

    return products;
  };

  static getTagsOfProduct = async (productId) => {
    const res = await axios.get(`${PRODUCT_TAGS_BASE_URL}/tags/${productId}`);
    const tags = res.data;

    return tags;
  };

  static deleteProductTag = async (productTagDetails) => {
    if (!isValidProductTagDetails(productTagDetails)) {
      throw new Error("Invalid product tag details!");
    }

    const res = await axios.delete(
      `${PRODUCT_TAGS_BASE_URL}/?productId=${product_id}&tagId=${tag_id}`,
    );
    const deletedProductTag = res.data;

    return deletedProductTag;
  };

  static deleteAllTagsOfProduct = async (productId) => {
    const res = await axios.delete(
      `${PRODUCT_TAGS_BASE_URL}/tags/${productId}`,
    );
    const deletedProductTags = res.data;

    return deletedProductTags;
  };

  static createProductTag = async (productTagDetails) => {
    if (!isValidProductTagDetails(productTagDetails)) {
      throw new Error("Invalid product tag details!");
    }
    const body = JSON.stringify(productTagDetails);

    const headers = {
      "Content-Type": "application/json",
    };

    const res = await axios.post(PRODUCT_TAGS_BASE_URL, body, { headers });
    const createdProductTag = res.data;

    return createdProductTag;
  };
}

export default ProductTagsAPI;
