import { get_milliseconds_from_minutes } from "../utils/types";

export const PRODUCT_STALE_TIME_MILLISECONDS = get_milliseconds_from_minutes(5);
export const CATEGORY_STALE_TIME_MILLISECONDS =
  get_milliseconds_from_minutes(30);
export const TAG_STALE_TIME_MILLISECONDS = get_milliseconds_from_minutes(30);
