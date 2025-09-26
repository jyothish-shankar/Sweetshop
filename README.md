🍬 Sweet Shop Management System

A full-stack application designed to manage a sweet shop's operations, including user authentication, product management, and inventory control. Built with JavaScript (Node.js) for the backend and MySQL for the database.

📦 Project Structure
sweetshop/
_____                  # Backend API (Node.js + Express)
│   ├── config/               # Database and server configurations
│   ├── controllers/          # Route handlers
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   ├── middlewares/          # Authentication and authorization
│   └── server.js             # Entry point
├── frontend/                 # Frontend Application (HTML/CSS/JS)
│   ├── assets/               # Static files (images, fonts, etc.)
│   ├── components/           # Reusable UI components
│   ├── pages/                # Application pages
│   ├── services/             # API service functions
│   └── index.html            # Main HTML file
└── README.md                 # Project documentation

⚙️ Technologies Used

Backend: Node.js, Express.js

Frontend: HTML, CSS, JavaScript

Database: MySQL

Authentication: JWT (JSON Web Tokens)

Testing: Jest, Supertest

Environment Management: dotenv

🚀 Features

User Authentication: Register and login users with JWT-based authentication.

Product Management: Add, update, delete, and list sweets.

Inventory Control: Purchase and restock sweets with admin privileges.

Search & Filter: Search sweets by name, category, and price range.

Admin Dashboard: Manage products and inventory with admin access.

🛠️ Setup Instructions
1. Clone the Repository
git clone https://github.com/yourusername/sweetshop.git
cd sweetshop

2. Backend Setup
a. Install Dependencies
cd backend
npm install

b. Configure Environment Variables

Create a .env file in the backend directory and add the following:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=sweetshop_db
JWT_SECRET=your_jwt_secret

c. Initialize Database
mysql -u root -p
CREATE DATABASE sweetshop_db;


Run the SQL scripts in the backend/db/ folder to set up the necessary tables.

d. Start the Backend Server
npm start


The backend API will be running on http://localhost:5000.

3. Frontend Setup
a. Open the frontend/ Directory
cd frontend

b. Open index.html in a Web Browser

The frontend application will be accessible locally.

🧪 Running Tests
Backend Tests
cd backend
npm test


This will run the Jest tests located in the backend/tests/ directory.

📄 API Endpoints
Authentication

POST /api/auth/register: Register a new user.

POST /api/auth/login: Login and receive a JWT token.

Sweets

GET /api/sweets: List all sweets.

GET /api/sweets/:id: Get details of a specific sweet.

POST /api/sweets: Add a new sweet (Admin only).

PUT /api/sweets/:id: Update a sweet's details (Admin only).

DELETE /api/sweets/:id: Delete a sweet (Admin only).

Inventory

POST /api/sweets/:id/purchase: Purchase a sweet, decreasing its quantity.

POST /api/sweets/:id/restock: Restock a sweet, increasing its quantity (Admin only).

🧑‍💻 Contributing

Feel free to fork the repository, make changes, and submit pull requests. Contributions are welcome!

📄 License

This project is licensed under the MIT License.****
