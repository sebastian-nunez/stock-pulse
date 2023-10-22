import { pool } from "../config/database.js";

class UserModel {
  static getAll = async () => {
    const selectQuery = `
      SELECT *
      FROM user_table
      ORDER BY firstname, lastname;
    `;

    try {
      const results = await pool.query(selectQuery);
      return results.rows;
    } catch (error) {
      console.log(error);
    }
  };

  static createOne = async ({ firstname, lastname, role, image }) => {
    const insertQuery = `
      INSERT INTO user_table (firstname, lastname, role, image)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    try {
      const results = await pool.query(insertQuery, [
        firstname,
        lastname,
        role,
        image
      ]);

      return results.rows[0];
    } catch (error) {
      console.log(error);
    }
  };
}

export default UserModel;
