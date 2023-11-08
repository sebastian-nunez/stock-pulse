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

/**
* Helper function to get milliseconds from minutes

 * @param {int} minutes number of minutes
 * @returns {int} milliseconds
 */
export const get_milliseconds_from_minutes = (minutes) => {
  return minutes * 60 * 1000;
};
