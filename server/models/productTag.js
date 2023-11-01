import { pool } from "../config/database.js";

class ProductTagModel {
  static getAll = async () => {
    const selectQuery = `
        SELECT product_id, tag_id
        FROM product_tag
    `;

    const results = await pool.query(selectQuery);
    return results.rows;
  };

  static getAllProducts = async tag_id => {
    const selectQuery = `
        SELECT *
        FROM product_tag
        WHERE tag_id = $1;
    `;

    const results = await pool.query(selectQuery, [tag_id]);
    return results.rows;
  };

  static getAllTags = async product_id => {
    const selectQuery = `
        SELECT *
        FROM product_tag
        WHERE product_id = $1;
    `;

    const results = await pool.query(selectQuery, [product_id]);
    return results.rows;
  };

  static createOne = async (product_id, tag_id) => {
    const insertQuery = `
        INSERT INTO product_tag (product_id, tag_id)
        VALUES ($1, $2)
        RETURNING *;
    `;

    const results = await pool.query(insertQuery, [product_id, tag_id]);
    return results.rows[0];
  };

  static deleteOne = async (product_id, tag_id) => {
    const deleteQuery = `
        DELETE FROM product_tag
        WHERE (product_id, tag_id) = ($1, $2)
        RETURNING *;
    `;

    const results = await pool.query(deleteQuery, [product_id, tag_id]);
    return results.rows[0];
  };

  static deleteAllTags = async product_id => {
    const deleteQuery = `
        DELETE FROM product_tag
        WHERE product_id = $1
        RETURNING *;
    `;

    const results = await pool.query(deleteQuery, [product_id]);
    return results.rows[0];
  };
}

export default ProductTagModel;
