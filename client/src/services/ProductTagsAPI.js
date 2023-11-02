import axios from "axios";

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

  static deleteProductTag = async (productId, tagId) => {
    const res = await axios.delete(
      `${PRODUCT_TAGS_BASE_URL}/?productId=${productId}&tagId=${tagId}`,
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

  static createProductTag = async (productId, tagId) => {
    const body = JSON.stringify({
      productId,
      tagId,
    });

    const headers = {
      "Content-Type": "application/json",
    };

    const res = await axios.post(PRODUCT_TAGS_BASE_URL, body, { headers });
    const createdProductTag = res.data;

    return createdProductTag;
  };
}

export default ProductTagsAPI;
