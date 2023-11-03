import { pool } from "../config/database.js";

class ProductModel {
  static getAll = async () => {
    const selectQuery = `
        SELECT *
        FROM product_details
        ORDER BY name, description;
    `;

    const results = await pool.query(selectQuery);
    return results.rows;
  };

  static getOneById = async productId => {
    const selectQuery = `
        SELECT *
        FROM product_details
        WHERE product_id = $1;
    `;

    const results = await pool.query(selectQuery, [productId]);
    return results.rows[0];
  };

  static getOneByName = async productName => {
    const selectQuery = `
        SELECT *
        FROM product_details
        WHERE name ILIKE $1;
    `;

    const results = await pool.query(selectQuery, [productName]);
    return results.rows[0];
  };

  static deleteOne = async productId => {
    const deleteQuery = `
        DELETE FROM product
        WHERE product_id = $1
        RETURNING *;
    `;

    const results = await pool.query(deleteQuery, [productId]);
    return results.rows[0];
  };

  static createOne = async productDetails => {
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
      category_id
    } = productDetails;

    const insertQuery = `
        INSERT INTO product (
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
          category_id
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *;
    `;

    const results = await pool.query(insertQuery, [
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
      category_id
    ]);

    return results.rows[0];
  };

  static updateOne = async (productId, productDetails) => {
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
      category_id
    } = productDetails;

    const updateQuery = `
        UPDATE product
        SET name = $1,
            brand = $2,
            description = $3,
            image = $4,
            quantity = $5,
            price = $6,
            is_available = $7,
            weight = $8,
            dimensions = $9,
            warranty_info = $10,
            notes = $11,
            category_id = $12
        WHERE product_id = $13
        RETURNING *;
    `;

    const results = await pool.query(updateQuery, [
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
      category_id,
      productId
    ]);

    return results.rows[0];
  };
}

export default ProductModel;
