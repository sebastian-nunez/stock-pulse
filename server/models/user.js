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
}

export default UserModel;
