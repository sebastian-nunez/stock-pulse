import { get_milliseconds_from_minutes } from "../utils/types";

// --------------- base urls ---------------
export const USERS_BASE_URL = "/api/users";
export const TAGS_BASE_URL = "/api/tags";
export const PRODUCT_TAGS_BASE_URL = "/api/product-tag";
export const PRODUCTS_BASE_URL = "/api/products";
export const CATEGORIES_BASE_URL = "/api/categories";

// --------------- stale times ---------------
export const PRODUCT_STALE_TIME_MILLISECONDS = get_milliseconds_from_minutes(5);
export const CATEGORY_STALE_TIME_MILLISECONDS =
  get_milliseconds_from_minutes(30);
export const TAG_STALE_TIME_MILLISECONDS = get_milliseconds_from_minutes(30);
