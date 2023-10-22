import { pool } from "../config/database.js";

class UserModel {
  static getAll = async () => {
    const selectQuery = `
      SELECT *
      FROM user_table
      ORDER BY firstname, lastname;
    `;

    const results = await pool.query(selectQuery);
    return results.rows;
  };

  static createOne = async ({ firstname, lastname, role, image }) => {
    const insertQuery = `
      INSERT INTO user_table (firstname, lastname, role, image)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const results = await pool.query(insertQuery, [
      firstname,
      lastname,
      role,
      image
    ]);

    return results.rows[0];
  };
}

export default UserModel;
