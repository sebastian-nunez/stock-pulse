import { userData } from "../data/users.js";
import { pool } from "../config/database.js";

const createUserTable = async () => {
  const createQuery = `
      DROP TABLE IF EXISTS user_table;

      CREATE TABLE IF NOT EXISTS user_table (
        id                  SERIAL PRIMARY KEY,
        firstname           VARCHAR(50) NOT NULL,
        lastname            VARCHAR(50) NOT NULL,
        role                VARCHAR(25) NOT NULL,
        image               VARCHAR(255)
      );
    `;

  try {
    await pool.query(createQuery);
    console.log("Created the user_table!");
  } catch (error) {
    console.log(error);
  }
};

const seedUsers = async () => {
  const insertQuery = `
      INSERT INTO user_table (firstname, lastname, role, image)
      VALUES ($1, $2, $3, $4);
    `;

  userData.map(async user => {
    try {
      await pool.query(insertQuery, [
        user.firstname,
        user.lastname,
        user.role,
        user.image
      ]);
      console.log(
        `Inserted ${user.firstname} ${user.lastname} into user_table!`
      );
    } catch (error) {
      console.log(error);
    }
  });
};

await createUserTable();
await seedUsers();
