import { pool } from "../config/database.js";

class UserModel {
  static getAll = async () => {
    const selectQuery = `
      SELECT *
      FROM users
      ORDER BY id;
    `;

    const results = await pool.query(selectQuery);
    return results.rows;
  };
}

export default UserModel;
