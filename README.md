# StockPulse

> An efficient and intuitive inventory management application designed for e-commerce businesses.
>
> Streamline your stock control, categorize products, track sales, and manage your inventory seamlessly.

## Table of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Technologies](#technologies)
4. [User Stories](#user-stories)
5. [Tables](#tables)
6. [License](#license)

## Features

- **Product Management:**
  - Add, update, and remove products with ease.
  - Categorize products for efficient organization.

- **Inventory Control:**
  - Monitor product quantities and make adjustments as needed.
  - Receive low-stock alerts for timely restocking.

- **Category & Tag Management:**
  - Create, update, and remove categories and tags for products.
  - Assign products to multiple tags.

- **User-friendly Interface:**
  - Browse products, view details, and manage the shopping cart effortlessly.

## Getting Started

1. **Clone the repository:** `git clone https://github.com/sebastian-nunez/stock-pulse`
2. **Set up the backend:**
   - Navigate to the backend directory: `cd server`
   - Install dependencies: `npm install`
   - Update the environment variables: rename `.env.template` to `.env` and fill in variables
   - Run the backend server: `npm run start`
3. **Set up the frontend:**
   - Navigate to the frontend directory: `cd client`
   - Install dependencies: `npm install`
   - Run the frontend app: `npm run dev`
4. Open your browser and visit [http://localhost:5173](http://localhost:5173) to access StockPulse.

## Technologies

- **Languages:** JavaScript, Node.js
- **Frameworks:** React.js (Vite), Express.js
- **UI Components:** NextUI, TailwindCSS
- **Database:** PostgreSQL
- **Hosting:** Railway

## User Stories

### As an Admin, I want to:

1. **Manage Products:**
   - Add new products to the inventory, including their name, description, and price.
   - Update product details like name, description, and price.
   - Remove products from the inventory.

2. **Categorize Products:**
   - Add new categories for products.
   - Assign products to one or more categories.
   - Update category details.
   - Remove categories.

3. **Manage Inventory:**
   - View a list of products and their current inventory levels.
   - Adjust the quantity of products in the inventory (e.g., add stock, remove stock).

## Tables

In this schema, we have the following relationships:

1. **One-to-Many Relationship (Category to Products):**
   - Each product belongs to one category.

2. **Many-to-Many Relationship (Products to Tags):**
   - Products can have multiple tags, and each tag can be associated with multiple products.

### `product`

Stores information about individual products.

| Field       | Type          | Description                      |
|-------------|---------------|----------------------------------|
| id          | SERIAL        | Unique identifier for the product|
| name        | VARCHAR(50)   | Name of the product              |
| description | VARCHAR(255)  | Description of the product       |
| image       | TEXT          | Image of the product             |
| quantity    | INT           | Quantity of the product in stock |
| price       | MONEY         | Price of the product             |
| category_id | INT           | Foreign key referencing a category|

### `category`

Stores information about product categories.

| Field       | Type          | Description                      |
|-------------|---------------|----------------------------------|
| id          | SERIAL        | Unique identifier for the category|
| name        | VARCHAR(100)  | Name of the category              |

### `tag`

Stores information about product tags. Ex. Discounted, Hotsale, Rebate etc.

| Field       | Type          | Description                      |
|-------------|---------------|----------------------------------|
| id          | SERIAL        | Unique identifier for the tag     |
| name        | VARCHAR(25)   | Name of the tag                  |

### `product_tag`

Establishes a many-to-many relationship between products and tags.

| Field       | Type          | Description                      |
|-------------|---------------|----------------------------------|
| product_id  | INT           | Foreign key referencing products  |
| tag_id      | INT           | Foreign key referencing tags      |
| PRIMARY KEY | (product_id, tag_id) | Composite primary key         |

## License

This project is licensed under the [MIT License](https://github.com/sebastian-nunez/stock-pulse/blob/main/LICENSE)
