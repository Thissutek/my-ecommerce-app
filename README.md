# E-Commerce Project

## Project Overview
This is a full-stack e-commerce web application designed to provide users with a seamless shopping experience. The project is built using the PERN stack (PostgreSQL, Express.js, React, Node.js) and includes features such as user authentication, product listings, dynamic product pages, cart functionality, and more. Tailwind CSS is used for responsive and visually appealing designs.

---

## Features

### Frontend:
1. **Landing Page**:
   - Dynamic video background implemented with Tailwind CSS.
   - Curated design to welcome users and promote products.

2. **Navbar**:
   - Responsive navigation menu with dropdowns.
   - Cart icon with real-time item count.
   - Displays the username upon login.

3. **Product Listing Page**:
   - Lists all available products.
   - Includes filtering functionality for product categories (e.g., Tees, Hoodies).

4. **Product Page**:
   - Displays individual product details including name, price, description, and image.
   - "Add to Cart" functionality.
   - Notification upon adding items to the cart.
   - Back button with Tailwind-styled arrow for navigation.

5. **Cart Page**:
   - Lists items added to the cart.
   - Displays total price and quantity.

6. **User Authentication**:
   - Login and sign-up pages integrated with JWT for secure session management.
   - Displays username in the navbar upon successful login.
   - Logout functionality via a dropdown menu.

### Backend:
1. **Server Setup**:
   - Node.js with Express.js.
   - PostgreSQL for database management.
   - API endpoints for products, cart, and user authentication.

2. **Database**:
   - Tables for `products`, `users`, and `cart`.
   - Sample products added for testing purposes.

3. **APIs**:
   - `GET /api/products`: Fetch all products.
   - `GET /api/products/:productId`: Fetch a single product by ID.
   - `POST /api/cart`: Add items to the cart.
   - `POST /api/auth/signup`: User sign-up.
   - `POST /api/auth/login`: User login with JWT.

---

## Technologies Used
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JSON Web Tokens (JWT)
- **Other Tools**: Vite (for React app setup), CORS, dotenv

---

## Installation and Setup

### Prerequisites
- Node.js and npm
- PostgreSQL

### Steps
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:
   - Frontend:
     ```bash
     npm install
     ```
   - Backend:
     ```bash
     cd backend
     npm install
     ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the backend folder and include the following:
     ```env
     DATABASE_URL=your_postgresql_connection_string
     JWT_SECRET=your_secret_key
     ```

4. **Run the Application**:
   - Backend:
     ```bash
     cd backend
     npm run dev
     ```
   - Frontend:
     ```bash
     cd root directory
     npm run dev
     ```

5. **Database Migration**:
   - Create necessary tables in PostgreSQL using SQL commands or an ORM.
   - Add sample data to the `products` table.

---

## Future Improvements
- Implement payment integration.
- Add order history for users.
- Optimize database queries for performance.
- Enhance filtering options on the product listing page.
- Implement admin panel for product management.

---

## Acknowledgements
This project is a result of collaborative efforts and iterative development. Special thanks to all contributors and resources that made this possible.

---

## Contact
For any queries or suggestions, feel free to reach out:
- **Name**: Jonathan
- **Email**: [jonathan_yau@outlook.com]

