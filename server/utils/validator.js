import { fromZodError } from "zod-validation-error";
import { categorySchema, productSchema, tagSchema } from "./schemas.js";

export const validateProductDetails = productDetails => {
  try {
    return productSchema.parse(productDetails);
  } catch (error) {
    throw fromZodError(error);
  }
};

export const validateCategoryDetails = categoryDetails => {
  try {
    return categorySchema.parse(categoryDetails);
  } catch (error) {
    throw fromZodError(error);
  }
};

export const validateTagDetails = tagDetails => {
  try {
    return tagSchema.parse(tagDetails);
  } catch (error) {
    throw fromZodError(error);
  }
};
