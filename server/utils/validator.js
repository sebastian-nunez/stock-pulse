import { fromZodError } from "zod-validation-error";
import { productSchema } from "../../client/src/utils/schemas.js";

export const validateProductDetails = productDetails => {
  try {
    productSchema.parse(productDetails);
  } catch (error) {
    throw fromZodError(error);
  }
};

export const isValidCategoryDetails = categoryDetails => {
  const { name, description } = categoryDetails;

  return name !== undefined && description !== undefined;
};

export const isValidTagDetails = tagDetails => {
  const { name, description } = tagDetails;

  return name !== undefined && description;
};

export const isValidProductTagDetails = productTagDetails => {
  const { product_id, tag_id } = productTagDetails;

  return product_id && tag_id;
};
