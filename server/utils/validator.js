export const isValidProductDetails = productDetails => {
  const {
    name,
    brand,
    description,
    image,
    quantity,
    price,
    isAvailable,
    weight,
    dimensions,
    warrantyInfo,
    notes,
    category,
    tags
  } = productDetails;

  return (
    name &&
    brand &&
    description &&
    image &&
    quantity &&
    price &&
    isAvailable &&
    weight &&
    dimensions &&
    warrantyInfo &&
    notes &&
    category &&
    tags &&
    Array.isArray(tags)
  );
};
