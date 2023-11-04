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
    name !== undefined &&
    brand !== undefined &&
    description !== undefined &&
    image !== undefined &&
    quantity !== undefined &&
    price !== undefined &&
    is_available !== undefined &&
    weight !== undefined &&
    dimensions !== undefined &&
    warranty_info !== undefined &&
    notes !== undefined &&
    category !== undefined &&
    tags !== undefined &&
    Array.isArray(tags)
  );
};

export const isValidCategoryDetails = categoryDetails => {
  const { name, description } = categoryDetails;

  return name && description;
};

export const isValidTagDetails = tagDetails => {
  const { name, description } = tagDetails;

  return name && description;
};

export const isValidProductTagDetails = productTagDetails => {
  const { product_id, tag_id } = productTagDetails;

  return product_id && tag_id;
};
