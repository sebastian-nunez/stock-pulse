import { pool } from "../config/database.js";
import { categoryData } from "../data/categories.js";
import { productTagData } from "../data/productTags.js";
import { productData } from "../data/products.js";
import { tagData } from "../data/tags.js";
import { userData } from "../data/users.js";

// ------------------------- user_table -------------------------
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

// ------------------------- category -------------------------
const createCategoryTable = async () => {
  const createQuery = `
      DROP TABLE IF EXISTS category CASCADE;

      CREATE TABLE IF NOT EXISTS category (
        category_id         SERIAL PRIMARY KEY,
        name                VARCHAR(25) UNIQUE NOT NULL,
        description         VARCHAR(255) DEFAULT 'No description provided.'
      );
    `;

  try {
    await pool.query(createQuery);
    console.log("Created the category table!");
  } catch (error) {
    console.log(error);
  }
};

const seedCategories = async () => {
  const insertQuery = `
      INSERT INTO category (name, description)
      VALUES ($1, $2);
    `;

  categoryData.map(async category => {
    try {
      await pool.query(insertQuery, [category.name, category.description]);
      console.log(`Inserted ${category.name} into category table!`);
    } catch (error) {
      console.log(error);
    }
  });
};

await createCategoryTable();
await seedCategories();

// ------------------------- tags -------------------------
const createTagTable = async () => {
  const createQuery = `
      DROP TABLE IF EXISTS tag CASCADE;

      CREATE TABLE IF NOT EXISTS tag (
        tag_id              SERIAL PRIMARY KEY,
        name                VARCHAR(25) UNIQUE NOT NULL,
        description         VARCHAR(255) DEFAULT 'No description provided.'
      );
    `;

  try {
    await pool.query(createQuery);
    console.log("Created the tag table!");
  } catch (error) {
    console.log(error);
  }
};

const seedTags = async () => {
  const insertQuery = `
      INSERT INTO tag (name, description)
      VALUES ($1, $2);
    `;

  tagData.map(async tag => {
    try {
      await pool.query(insertQuery, [tag.name, tag.description]);
      console.log(`Inserted ${tag.name} into tag table!`);
    } catch (error) {
      console.log(error);
    }
  });
};

await createTagTable();
await seedTags();

// ------------------------- products -------------------------
const createProductTable = async () => {
  const createQuery = `
      DROP TABLE IF EXISTS product CASCADE;

      CREATE TABLE IF NOT EXISTS product (
        product_id          SERIAL PRIMARY KEY,
        name                VARCHAR(100) NOT NULL UNIQUE,
        brand               VARCHAR(100) NOT NULL,
        description         VARCHAR(255) NOT NULL,
        image               VARCHAR(255) NOT NULL,
        quantity            INT NOT NULL,
        price               MONEY NOT NULL CHECK (price > 0),
        is_available        BOOLEAN NOT NULL,
        weight              DECIMAL(10, 2) NOT NULL,
        dimensions          VARCHAR(50) DEFAULT 'Unknown',
        warranty_info       VARCHAR(255) DEFAULT 'No warranty information available.',
        notes               TEXT DEFAULT 'No notes available.',
        date_added          DATE DEFAULT CURRENT_DATE,
        category_id         INT,
        FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE SET NULL
    );
    `;

  try {
    await pool.query(createQuery);
    console.log("Created the product table!");
  } catch (error) {
    console.log(error);
  }
};

const seedProducts = async () => {
  const insertQuery = `
      INSERT INTO product (name, brand, description, image, quantity, price, is_available, weight, dimensions, warranty_info, category_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
    `;

  productData.map(async product => {
    try {
      await pool.query(insertQuery, [
        product.name,
        product.brand,
        product.description,
        product.image,
        product.quantity,
        product.price,
        product.is_available,
        product.weight,
        product.dimensions,
        product.warranty_info,
        product.category_id
      ]);

      console.log(`Inserted ${product.name} into product table!`);
    } catch (error) {
      console.log(error);
    }
  });
};

await createProductTable();
await seedProducts();

// ------------------------- product_tag -------------------------
const createProductTagTable = async () => {
  const createQuery = `
      DROP TABLE IF EXISTS product_tag CASCADE;

      CREATE TABLE IF NOT EXISTS product_tag (
        product_id          INT,
        tag_id              INT,
        PRIMARY KEY (product_id, tag_id),
        FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE,
        FOREIGN KEY (tag_id) REFERENCES tag(tag_id) ON DELETE CASCADE
    );
    `;

  try {
    await pool.query(createQuery);
    console.log("Created the product_tag table!");
  } catch (error) {
    console.log(error);
  }
};

const seedProductTags = async () => {
  const insertQuery = `
      INSERT INTO product_tag (product_id, tag_id)
      VALUES ($1, $2);
    `;

  productTagData.map(async productTag => {
    try {
      await pool.query(insertQuery, [productTag.product_id, productTag.tag_id]);
      console.log(
        `Created product_tag with id (${productTag.product_id}, ${productTag.tag_id})!`
      );
    } catch (error) {
      console.log(error);
    }
  });
};

await createProductTagTable();
await seedProductTags();

// ------------------------- product_details -------------------------
const createProductDetailsView = async () => {
  const createQuery = `
    CREATE VIEW product_details AS (
      SELECT
        p.product_id,
        p.name,
        p.brand,
        p.description,
        p.image,
        p.quantity,
        p.price,
        p.is_available,
        p.weight,
        p.dimensions,
        p.warranty_info,
        p.notes,
        p.date_added,
        c.name AS category,
        array_agg(t.name) AS tags
      FROM product p
      LEFT JOIN category c ON p.category_id = c.category_id
      LEFT JOIN product_tag pt ON pt.product_id = p.product_id
      LEFT JOIN tag t ON t.tag_id = pt.tag_id
      GROUP BY p.product_id, c.name
    );
  `;

  try {
    await pool.query(createQuery);
    console.log("Created the product_details view!");
  } catch (error) {
    console.log(error);
  }
};

await createProductDetailsView();
