import { pool } from "../config/database.js";

class CategoryModel {
  static getAll = async () => {
    const selectQuery = `
      SELECT *
      FROM category
      ORDER BY name, description;
    `;

    const results = await pool.query(selectQuery);
    return results.rows;
  };

  static createOne = async (name, description) => {
    const insertQuery = `
        INSERT INTO category (name, description)
        VALUES ($1, $2)
        RETURNING *;
    `;

    const results = await pool.query(insertQuery, [name, description]);

    return results.rows[0];
  };

  static getOneById = async categoryId => {
    const selectQuery = `
      SELECT *
      FROM category
      WHERE category_id = $1;
    `;
    const results = await pool.query(selectQuery, [categoryId]);
    return results.rows[0];
  };

  static getOneByName = async categoryName => {
    const selectQuery = `
        SELECT *
        FROM category
        WHERE name ILIKE $1;
    `;

    const results = await pool.query(selectQuery, [categoryName]);
    return results.rows[0];
  };

  static updateOne = async (categoryId, name, description) => {
    const updateQuery = `
        UPDATE category
        SET name = $1, description = $2
        WHERE category_id = $3
        RETURNING *;
    `;

    const results = await pool.query(updateQuery, [
      name,
      description,
      categoryId
    ]);

    return results.rows[0];
  };

  static deleteOne = async categoryId => {
    const deleteQuery = `
        DELETE FROM category
        WHERE category_id = $1
        RETURNING *;
    `;

    const results = await pool.query(deleteQuery, [categoryId]);
    return results.rows[0];
  };
}

export default CategoryModel;
