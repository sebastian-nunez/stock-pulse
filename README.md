# StockPulse

StockPulse is an efficient and intuitive inventory management application designed for e-commerce businesses. Streamline your stock control, categorize products, track sales, and manage your inventory seamlessly.

Built using React (Vite), NextUI, TailwindCSS for the frontend, Node.js/Express for the backend, and PostgreSQL for the database. 

Hosted through [Railway](https://railway.app/).

## Features

- **Product Management:**
  - Add, update, and remove products with ease.
  - Categorize products for efficient organization.

- **Inventory Control:**
  - Monitor product quantities and make adjustments as needed.
  - Receive low-stock alerts for timely restocking.

- **Category Management:**
  - Create, update, and remove categories for products.
  - Assign products to multiple categories.

- **User-friendly Interface:**
  - Browse products, view details, and manage the shopping cart effortlessly.

## Getting Started

1. **Clone the repository:** `git clone https://github.com/sebastian-nunez/stock-pulse`
2. **Set up the backend:**
   - Navigate to the backend directory: `cd server`
   - Install dependencies: `npm install`
   - Update the enviroment variables: rename `.env.template` to `.env` and fill in variables
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
- **Database:** PostgresSQL
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

## License

This project is licensed under the [MIT License](https://github.com/sebastian-nunez/stock-pulse/blob/main/LICENSE)


