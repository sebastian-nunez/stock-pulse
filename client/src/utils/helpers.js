export const EMPTY_PRODUCT = {
  name: "",
  brand: "",
  description: "",
  image: "",
  quantity: null,
  price: null,
  is_available: true,
  weight: null,
  dimensions: "",
  warranty_info: "",
  notes: "",
  category: "",
  tags: [],
};

export const REGEX_MATCH_NON_ALPHA_NUMERIC = /[^a-zA-Z0-9]/g;
export const ANY_CATEGORY = "Any";

/**
* Helper function to get milliseconds from minutes

 * @param {int} minutes number of minutes
 * @returns {int} milliseconds
 */
export const get_milliseconds_from_minutes = (minutes) => {
  return minutes * 60 * 1000;
};

/**
 * Helper function to convert datetime string to MM/DD/YYYY format
 * @param {String} datetimeString datetime string (ex. 2023-11-08T05:00:00.000Z)
 * @returns {String} formatted date string (11/08/2023)
 */
export const convertDatetimeToMMDDYYYY = (datetimeString) => {
  const date = new Date(datetimeString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based, so we add 1
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
};

/**
 * Helper function to normalize text. Removes leading and trailing whitespace, converts to lowercase, and removes all non-alphanumeric characters
 * @param {String} text text to normalize
 * @returns {String} normalized text
 */
export const normalizeText = (text) => {
  if (!text) {
    return "";
  }

  return text.trim().toLowerCase().replace(REGEX_MATCH_NON_ALPHA_NUMERIC, "");
};
