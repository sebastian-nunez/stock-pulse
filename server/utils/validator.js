export const isValidProductDetails = productDetails => {
  const {
    name,
    brand,
    description,
    image,
    quantity,
    price,
    is_available,
    weight,
    dimensions,
    warranty_info,
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
    is_available &&
    weight &&
    dimensions &&
    warranty_info &&
    notes &&
    category &&
    tags &&
    Array.isArray(tags)
  );
};
