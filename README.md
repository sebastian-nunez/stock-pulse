# StockPulse

> An efficient and intuitive inventory management application designed for e-commerce businesses.

## CodePath WEB103 Final Project

**Designed and developed by:** Priscilla Colon, Sebastian Nunez

**Link to deployed app:** <https://stockpulse.up.railway.app/>

**Demo Video:** <https://www.youtube.com/watch?v=ZLVxP9Sl_cY>

![landing page](demos/screenshots/landingpage.png)

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Demos](#demos)
- [Getting Started](#getting-started)
- [Kanban Board](#kanban-board)
- [Wireframes](#wireframes)
- [ER Diagram](#er-diagram)
- [System Design](#system-design)
  - [High Level](#high-level)
  - ["Get All Users" Trace](#get-all-users-trace)
- [Tables](#tables)
  - [`product`](#product)
  - [`category`](#category)
  - [`tag`](#tag)
  - [`product_tag`](#product_tag)
- [License](#license)

## Features

- **Product Management:**

  - [x] Add, update, and remove products with ease.
  - [x] Categorize and tag products for efficient organization.

- **Category & Tag Management:**

  - [x] Create, update, and remove categories and tags for products.
  - [x] Assign products to multiple tags.

- **User-friendly Interface:**

  - [x] Browse products, view details, and manage inventory via an **Inventory** or "card view"
  - [x] Browse products, view details, and manage inventory via a **Dashboard** or "tabular view"
  - [x] End-to-end form and input validation
  - [ ] Login via OAuth using GitHub

- **Inventory Control:**
  - [x] Monitor product quantities and make adjustments as needed.
  - [ ] Receive low-stock alerts for timely restocking.

## Screenshots

### Project Overview

![All wireframes](demos/stock-pulse-wireframes-overview.png)

> _StockPulse - Design Process Overview_

### Product Browser

![product view](demos/screenshots/productgrid.png)

### Inventory Table

![table view](demos/screenshots/tableview.png)

### Login

![login](demos/screenshots/login.png)

### Error Handling

![404](demos/screenshots/404.png)

![500](demos/screenshots/500%20error.png)

### Loading Skeletons

![loading skeleton 1](demos/screenshots/loading_skeleton_1.png)

![loading skeleton 2](demos/screenshots/loading_skeleton_2.png)

## Technologies

- **Frontend**
  - **Languages:** JavaScript
  - **Frameworks:** React.js (Vite)
  - **UI Components:** NextUI, TailwindCSS
  - **Icons:** Lucide Icons
  - **Data Fetching:** useQuery, Axios
  - **Form Validation:** react-hook-form, Zod
  - **Notifications/Toasts:** react-hot-toast
- **Backend:**
  - **Languages:** Node.js
  - **Frameworks:** Express
  - **Authentication:** Passport, OAuth2
- **Database:** PostgreSQL
- **Hosting:** Railway
- **Design:** Whimsical

## Demos

### Video Walkthrough

[Here's a GIF walkthrough of the final project](https://www.youtube.com/watch?v=ZLVxP9Sl_cY)

### Product Details

> Users are able to see an individual product's full details via a responsive modal

![Product Details Demo](demos/stock-pulse-details-2.gif)

### Responsive Design & Accessibility

> StockPulse was design with a responsive architecture while following the latest WAI-ARIA accessability standards to accommodate a mobile and desktop experience.

![Responsive Design Demo](demos/stock-pulse-responsive-2.gif)

### Inventory Pagination

> Users are able to scroll through different pages of products

![Pagination Demo](demos/stock-pulse-pagination-1.gif)

### Product Management Modals

> Input forms are fully validated before submission including user-friendly error messages and hints. Error and success notifications are displayed.

![Product Modal Demo](demos/playground-product-modals-2.gif)

### Loading Skeletons & Error Handling

> We've implemented loading skeletons to maximize UX and give users as much feedback as possible. Moreover, we've implemented extensive error handling through messages, modals, and cards.

![Loading Skeletons Demo](demos/stock-pulse-product-grid-loading-skeleton.gif)

> _Loading Skeletons_

![Error Handling Demo](demos/stock-pulse-error-handling.gif)

> _Error Handling_

### Filtering Capabilities

> Users are able to filter items by their, related tags, and category.

![Product Filtering Demo](demos/stock-pulse-product-filtering-1.gif)

### Product Inventory Grid

> Within the Inventory view, users will be able to see the most relevant details about a product. Also, they're able to click on an item and expand all it's details; moreover, users can edit an item.

![Product Grid Demo](demos/stock-pulse-product-grid-1.gif)

## End-to-End API Validation

> All API endpoints validate their data and send helpful error messages back to the client.

![E2E Validation Demo](demos/stock-pulse-e2e-api-validation.gif)

## Getting Started

1. **Clone the repository:** `git clone https://github.com/sebastian-nunez/stock-pulse`
2. **Set up the backend:**
   - Navigate to the backend directory: `cd server`
   - Install dependencies: `npm install`
   - Update the environment variables: make a copy of the `.env.template` rename it to `.env` and fill in the variables
   - Run the backend server: `npm run start`
3. **Set up the frontend:**
   - Navigate to the frontend directory: `cd client`
   - Install dependencies: `npm install`
   - Run the frontend app: `npm run dev`
4. Open your browser and visit [http://localhost:5173](http://localhost:5173) to access StockPulse.
   **Note:** The service currently relies on `Railway` for database hosting and management. You can sign up and host your own instance. [Learn more about Railway](https://railway.app/)

## Kanban Board

> You can find the full board on [Whimsical.](https://whimsical.com/kanban-board-7xwirWDMp5HDHfk6cUiFwX)

![Kanban Board](demos/stock-pulse-kanban-board.png)

## Wireframes

### Home

![Home](demos/stock-pulse-wireframes-home.png)

### Login/Sign up

![Sign up](demos/stock-pulse-wireframes-signup.png)
![Log in](demos/stock-pulse-wireframes-login.png)

### Dashboard

![Dashboard](demos/stock-pulse-wireframes-dashboard.png)

### Inventory

![Inventory](demos/stock-pulse-wireframes-inventory.png)

### Product Management

![Product Details](demos/stock-pulse-wireframes-product-details.png)
![Edit Product](demos/stock-pulse-wireframes-edit-product.png)
![Add Product](demos/stock-pulse-wireframes-add-product.png)

## ER Diagram

![ER Diagram](demos/stock-pulse-ER-diagram.png)

## System Design

### High Level

![System Design](demos/stock-pulse-system-design.png)

### "Get All Users" Trace

![High-level trace](demos/stock-pulse-design-1.png)

_The diagram ignores any authentication/authorization measures_.

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
| price         | DECIMAL(12,2) | Price of the product in USD                               | Not Null                                      |
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

## License

This project is licensed under the [MIT License](https://github.com/sebastian-nunez/stock-pulse/blob/main/LICENSE)
