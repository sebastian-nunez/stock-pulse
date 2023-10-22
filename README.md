# StockPulse

**CodePath WEB103 Final Project**

**Designed and developed by:** Priscilla Colon, Sebastian Nunez

🔗 **Link to deployed app:**

## Table of Contents

- [About](#about)
- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Technologies](#technologies)
- [System Design](#system-design)
  - [High Level](#high-level)
  - ["Get All Users" Trace](#get-all-users-trace)
- [User Stories](#user-stories)
- [ER Diagram](#er-diagram)
- [Tables](#tables)
  - [`product`](#product)
  - [`category`](#category)
  - [`tag`](#tag)
  - [`product_tag`](#product_tag)
- [Wireframes](#wireframes)
- [License](#license)

## About

**Description:** An efficient and intuitive inventory management application designed for e-commerce businesses.

**Purpose:** To streamline your stock control, categorize products, track sales, and manage your inventory seamlessly.

**Inspiration:** StockPulse was created with the vision to promote growth and customer satisfaction while effortlessly overseeing and organizing their products and sales.

## Features

- **Product Management:**

  - Add, update, and remove products with ease.
  - Categorize and tag products for efficient organization.

- **Inventory Control:**

  - Monitor product quantities and make adjustments as needed.
  - Receive low-stock alerts for timely restocking.

- **Category & Tag Management:**

  - Create, update, and remove categories and tags for products.
  - Assign products to multiple tags.

- **User-friendly Interface:**
  - Browse products, view details, and manage the shopping cart effortlessly.

## Demo

![demo](demos/stock-pulse-demo-2.gif)

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

**Note:** Service currently relies on `Railway` for database hosting and management. You can sign up and host your own instance. [Learn more about Railway](https://railway.app/)

## Technologies

- **Frontend**
  - **Languages:** JavaScript, JSX
  - **Frameworks:** React.js (Vite)
  - **UI Components:** NextUI, TailwindCSS
  - **Icons:** Lucide Icons
  - **Data Fetching:** useQuery, Axios
  - **Form Validation:** react-hook-form, zod
  - **Notifications/Toasts:** react-hot-toast
- **Backend:**
  - **Languages:** Node.js
  - **Frameworks:** Express
- **Database:** PostgreSQL
- **Hosting:** Railway
- **Design:** Whimsical

## System Design

### High Level

![System Design](demos/stock-pulse-system-design.png)

### "Get All Users" Trace

![High level trace](demos/stock-pulse-design-1.png)
_Diagram ignores any authentication/authorization measures_.

## User Stories

### As an Admin, I want to:

1. **Manage Products:**

   - Add new products to the inventory, including their name, description, and price.
   - Update product details like name, description, and price.
   - Remove products from the inventory.

2. **Categorize & Tag Products:**

   - Add new categories or tags for products.
   - Assign products to one category or multiple tags.
   - Update category or tag details.
   - Remove categories or tags.

3. **Manage Inventory:**
   - View a list of products and their current inventory levels.
   - Adjust the quantity of products in the inventory (e.g., add stock, remove stock).

## ER Diagram

_ER Diagram to be added soon..._

## Tables

In this schema, we have the following relationships:

1. **One-to-Many Relationship (Category to Products):**

   - Each product belongs to one category.

2. **Many-to-Many Relationship (Products to Tags):**
   - Products can have multiple tags, and each tag can be associated with multiple products.

### `product`

Stores information about individual products.

| Field         | Type          | Description                                               | Constraints                                   |
| ------------- | ------------- | --------------------------------------------------------- | --------------------------------------------- |
| product_id    | SERIAL        | Unique identifier for the product                         | Primary Key                                   |
| name          | VARCHAR(100)  | Name of the product                                       | Not Null, Unique                              |
| brand         | VARCHAR(100)  | Brand or manufacturer of the product                      | Not Null                                      |
| description   | VARCHAR(255)  | Description of the product                                | Not Null                                      |
| image         | VARCHAR(255)  | Image of the product                                      | Not Null                                      |
| quantity      | INT           | Quantity of the product in stock                          | Not Null                                      |
| price         | MONEY         | Price of the product in USD                               | Not Null                                      |
| is_available  | BOOLEAN       | Information about the product's availability (true/false) | Not Null, true or false                       |
| weight        | DECIMAL(10,2) | Weight of the product (in lbs)                            | Not Null                                      |
| dimensions    | VARCHAR(50)   | Dimensions of the product (Length x Width x Height)       | Default: "Unknown."                           |
| warranty_info | VARCHAR(255)  | Details about the product's warranty                      | Default: "No warranty information available." |
| notes         | TEXT          | Any notes about the product                               |                                               |
| date_added    | DATE          | Date when the product was added to the inventory          | Not Null, Default: CURRENT_DATE               |
| category_id   | INT           | Foreign key referencing a category                        | Foreign Key, ON DELETE SET NULL               |

### `category`

Stores information about product categories.

| Field       | Type         | Description                        | Constraints                         |
| ----------- | ------------ | ---------------------------------- | ----------------------------------- |
| category_id | SERIAL       | Unique identifier for the category | Primary Key                         |
| name        | VARCHAR(25)  | Name of the category               | Not Null, Unique                    |
| description | VARCHAR(255) | Description of the category        | Default: "No description provided." |

### `tag`

Stores information about product tags. Ex. Discounted, Hotsale, Rebate etc.

| Field       | Type         | Description                   | Constraints                         |
| ----------- | ------------ | ----------------------------- | ----------------------------------- |
| tag_id      | SERIAL       | Unique identifier for the tag | Primary Key                         |
| name        | VARCHAR(25)  | Name of the tag               | Not Null, Unique                    |
| description | VARCHAR(255) | Description of the tag        | Default: "No description provided." |

### `product_tag`

Establishes a many-to-many relationship between products and tags.

| Field       | Type                 | Description                      | Constraints                    |
| ----------- | -------------------- | -------------------------------- | ------------------------------ |
| product_id  | INT                  | Foreign key referencing products | Foreign Key, ON DELETE CASCADE |
| tag_id      | INT                  | Foreign key referencing tags     | Foreign Key, ON DELETE CASCADE |
| PRIMARY KEY | (product_id, tag_id) | Composite primary key            | Primary Key                    |

## Wireframes

_Wireframes to be added soon..._

## License

This project is licensed under the [MIT License](https://github.com/sebastian-nunez/stock-pulse/blob/main/LICENSE)
