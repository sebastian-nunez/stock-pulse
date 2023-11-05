import { fromZodError } from "zod-validation-error";
import {
  categorySchema,
  productSchema,
  tagSchema
} from "../../client/src/utils/schemas.js";

export const validateProductDetails = productDetails => {
  try {
    productSchema.parse(productDetails);
  } catch (error) {
    throw fromZodError(error);
  }
};

export const validateCategoryDetails = categoryDetails => {
  try {
    categorySchema.parse(categoryDetails);
  } catch (error) {
    throw fromZodError(error);
  }
};

export const validateTagDetails = tagDetails => {
  try {
    tagSchema.parse(tagDetails);
  } catch (error) {
    throw fromZodError(error);
  }
};
