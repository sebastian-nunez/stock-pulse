import { pool } from "../config/database.js";

class TagModel {
  static getAll = async () => {
    const selectQuery = `
      SELECT *
      FROM tag
      ORDER BY name;
    `;

    const results = await pool.query(selectQuery);
    return results.rows;
  };

  static getOneById = async tagId => {
    const selectQuery = `
      SELECT *
      FROM tag
      WHERE tag_id = $1;
    `;

    const results = await pool.query(selectQuery, [tagId]);
    return results.rows[0];
  };

  static getOneByName = async tagName => {
    const selectQuery = `
      SELECT *
      FROM tag
      WHERE name = $1;
    `;

    const results = await pool.query(selectQuery, [tagName]);
    return results.rows[0];
  };

  static createOne = async (name, description) => {
    const insertQuery = `
      INSERT INTO tag (name, description)
      VALUES ($1, $2)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
    `;

    const results = await pool.query(insertQuery, [name, description]);
    return results.rows[0];
  };

  static updateOne = async (tagId, name, description) => {
    const updateQuery = `
      UPDATE tag
      SET name = $1, description = $2
      WHERE tag_id = $3
      RETURNING *;
    `;

    const results = await pool.query(updateQuery, [name, description, tagId]);
    return results.rows[0];
  };

  static deleteOne = async tagId => {
    const deleteQuery = `
      DELETE FROM tag
      WHERE tag_id = $1
      RETURNING *;
    `;

    const results = await pool.query(deleteQuery, [tagId]);
    return results.rows[0];
  };
}

export default TagModel;
