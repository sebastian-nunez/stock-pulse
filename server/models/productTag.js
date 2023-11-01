import { pool } from "../config/database.js";

class ProductTagModel {
  static getAll = async () => {
    const selectQuery = `
        SELECT *
        FROM product_tag_details;
    `;

    const results = await pool.query(selectQuery);
    return results.rows;
  };

  static getAllProducts = async tagId => {
    const selectQuery = `
        SELECT *
        FROM product_tag_details
        WHERE tag_id = $1;
    `;

    const results = await pool.query(selectQuery, [tagId]);
    return results.rows;
  };

  static getAllTags = async productId => {
    const selectQuery = `
        SELECT *
        FROM product_tag_details
        WHERE product_id = $1;
    `;

    const results = await pool.query(selectQuery, [productId]);
    return results.rows;
  };

  static createOne = async (productId, tagId) => {
    const insertQuery = `
        INSERT INTO product_tag (product_id, tag_id)
        VALUES ($1, $2)
        RETURNING *;
    `;

    const results = await pool.query(insertQuery, [productId, tagId]);
    return results.rows[0];
  };

  static deleteOne = async (productId, tagId) => {
    const deleteQuery = `
        DELETE FROM product_tag
        WHERE (product_id, tag_id) = ($1, $2)
        RETURNING *;
    `;

    const results = await pool.query(deleteQuery, [productId, tagId]);
    return results.rows[0];
  };

  static deleteAllTags = async productId => {
    const deleteQuery = `
        DELETE FROM product_tag
        WHERE product_id = $1
        RETURNING *;
    `;

    const results = await pool.query(deleteQuery, [productId]);
    return results.rows[0];
  };
}

export default ProductTagModel;
