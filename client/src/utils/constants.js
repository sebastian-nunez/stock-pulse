import { rowsPerPageOptions } from "../components/ResultsWidget";
import { get_milliseconds_from_minutes } from "./helpers";

export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://stockpulse-server.up.railway.app"
    : "http://localhost:3001";

// --------------- base urls ---------------
export const USERS_BASE_URL = `${API_URL}/api/users`;
export const PRODUCTS_BASE_URL = `${API_URL}/api/products`;
export const CATEGORIES_BASE_URL = `${API_URL}/api/categories`;
export const TAGS_BASE_URL = `${API_URL}/api/tags`;
export const PRODUCT_TAG_BASE_URL = `${API_URL}/api/product-tag`;

// --------------- query keys ---------------
export const USERS_QUERY_KEY = "users";
export const PRODUCTS_QUERY_KEY = "products";
export const CATEGORIES_QUERY_KEY = "categories";
export const TAGS_QUERY_KEY = "tags";
export const PRODUCT_TAG_QUERY_KEY = "product-tag";

// --------------- stale times ---------------
export const PRODUCT_STALE_TIME_MILLISECONDS = get_milliseconds_from_minutes(5);
export const CATEGORY_STALE_TIME_MILLISECONDS =
  get_milliseconds_from_minutes(30);
export const TAG_STALE_TIME_MILLISECONDS = get_milliseconds_from_minutes(30);

// --------------- misc ---------------
export const DEFAULT_ROWS_PER_PAGE_CARD =
  rowsPerPageOptions?.length >= 1
    ? rowsPerPageOptions[1]
    : rowsPerPageOptions[0] || 18;

export const DEFAULT_ROWS_PER_PAGE_TABLE =
  rowsPerPageOptions?.length >= 2
    ? rowsPerPageOptions[2]
    : rowsPerPageOptions[0] || 40;
