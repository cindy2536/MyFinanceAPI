# MyFinanceAPI

A simple REST API using Node.js with Express for tracking users, income, and expenses. Built with **Node.js**, **Express**, and **Firebase Realtime Database**.

## 🌐 Live Deployment

🔗 https://myfinanceapi-nfec.onrender.com

---

## 📁 Project Structure

MyFinanceAPI/
├── config/ # Firebase configuration
│ └── firebase.js
├── controllers/ # Business logic for each route
│ ├── expenseController.js
│ ├── incomeController.js
│ └── usersController.js
├── routes/ # API route definitions
│ ├── expenses.js
│ ├── income.js
│ └── users.js
├── .env # Environment variables
├── index.js # Entry point
├── initialdata.js # Firebase database initialization
├── package-lock.json # Dependency version lock file
├── package.json # Project dependencies
└── README.md # Project documentation

---

## 💡 Technologies Used

### 🧰 Development Tools
- Visual Studio Code – Code Editor
- Git & GitHub – Version Control
- Postman – API Testing
- Render – Cloud Deployment

### 🛠️ Backend Stack
- Node.js – JavaScript Runtime
- Express.js – Web Framework
- Firebase Realtime Database – Cloud Data Storage
- dotenv – Environment Variable Management

---

## ✨ Features

- Full CRUD operations for **Users**, **Income**, and **Expenses**
- Modular structure using Express Router and controller logic
- Firebase Realtime Database integration
- Hosted on Render with environment variables from `.env` file

---

## 📡 API Endpoints

### 🔸 Users Endpoints

| Method | Endpoint       | Description                   |
|--------|----------------|-------------------------------|
| GET    | `/users`       | Retrieve all users            |
| POST   | `/users`       | Add a new user                |
| PUT    | `/users/:id`   | Update user by ID             |
| DELETE | `/users/:id`   | Delete user by ID             |

### 🔸 Income Endpoints

| Method | Endpoint        | Description                       |
|--------|------------------|----------------------------------|
| GET    | `/income`        | Retrieve all income data         |
| POST   | `/income`        | Add new income data              |
| PUT    | `/income/:id`    | Update income data by ID         |
| DELETE | `/income/:id`    | Delete income data by ID         |

### 🔸 Expense Endpoints

| Method | Endpoint         | Description                       |
|--------|------------------|-----------------------------------|
| GET    | `/expenses`      | Retrieve all expense data         |
| POST   | `/expenses`      | Add new expense data              |
| PUT    | `/expenses/:id`  | Update expense data by ID         |
| DELETE | `/expenses/:id`  | Delete expense data by ID         |

> All data is stored in Firebase Realtime Database. Use Postman or similar tools for testing.

---

## 🔐 Environment Variables

Create a `.env` file in the root folder and add the following Firebase credentials:

FIREBASE_API_KEY=AIzaSyDvoUZgoZ3RNm4nsMGO4uBm_MLZEa1JtGQ
FIREBASE_AUTH_DOMAIN=myfinance-7c7ab.firebaseapp.com
FIREBASE_DATABASE_URL=https://myfinance-7c7ab-default-rtdb.firebaseio.com
FIREBASE_PROJECT_ID=myfinance-7c7ab
FIREBASE_STORAGE_BUCKET=myfinance-7c7ab.appspot.com
FIREBASE_MESSAGING_SENDER_ID=61672119479
FIREBASE_APP_ID=1:61672119479:web:48832670deda5998650132

⚠️ Important: Never commit or share your .env file publicly.


## Technologies Used

### Development Tools
    - Visual Studio Code – Code Editor
    - Git & GitHub – Version Control
    - Postman – API Testing
    - Render – Cloud Deployment

### Backend Stack
    - Node.js – JavaScript Runtime
    - Express.js – Web Framework
    - Firebase Realtime Database – Cloud Data Storage
    - dotenv – Environment Variable Management


## Features
    - CRUD operations for "Users", "Income", and "Expenses"
    - Organized route handling via Express Router
    - Modular code using controllers for each domain
    - Hosted on Render with environment variables managed via `.env`

## API Endpoints

** Users Endpoints **

| Method | Endpoint               | Description                       |
|--------|------------------------|-----------------------------------|
| GET    | `/users`               | Retrieve all users                |
| POST   | `/users`               | Add a new user                    |
| PUT    | `/users/:id`           | Update an existing user by ID     |
| DELETE | `/users/:id`           | Delete a user by ID               |

** Income Endpoints **

| Method | Endpoint               | Description                       |
|--------|------------------------|-----------------------------------|
| GET    | `/income`              | Retrieve all income data          |
| POST   | `/income`              | Add a new income data             |
| PUT    | `/income/:id`          | Update an existing income by ID   |
| DELETE | `/income/:id`          | Delete an income by ID            |

** Expense Endpoints **

| Method | Endpoint               | Description                       |
|--------|------------------------|-----------------------------------|
| GET    | `/expenses`            | Retrieve all expense data         |
| POST   | `/expenses`            | Add a new expense data            |
| PUT    | `/expenses/:id`        | Update an existing expense by ID  |
| DELETE | `/expenses/:id`        | Delete an expense by ID           |

> Test using Postman. All data is stored in Firebase Realtime Database.

## Environment Variables
Create a .env file in the root folder and add your Firebase credentials:

FIREBASE_API_KEY=AIzaSyDvoUZgoZ3RNm4nsMGO4uBm_MLZEa1JtGQ
FIREBASE_AUTH_DOMAIN=myfinance-7c7ab.firebaseapp.com
FIREBASE_DATABASE_URL=https://myfinance-7c7ab-default-rtdb.firebaseio.com
FIREBASE_PROJECT_ID=myfinance-7c7ab
FIREBASE_STORAGE_BUCKET=myfinance-7c7ab.appspot.com
FIREBASE_MESSAGING_SENDER_ID=61672119479
FIREBASE_APP_ID=1:61672119479:web:48832670deda5998650132

⚠️ **Never share your `.env` file publicly!**

---

## 🛠️ Installation & Run Locally

> Use any terminal (e.g., **Git Bash**, PowerShell, or VS Code Terminal)

```bash
# 1. Clone the repository
git clone https://github.com/cindy2536/MyFinanceAPI.git

# 2. Navigate into the project folder
cd MyFinanceAPI

# 3. Install dependencies
npm install

# 4. Initialize Firebase Database with Sample Data
node initialdata.js

# 5. Start the server
node index.js
```
> The server will run at http://localhost:3000 or the port specified in .env.


## 📦 About package-lock.json
This file is automatically generated during npm install.

It ensures consistent dependency versions across different machines.

Always commit it to Git to avoid unexpected behaviors on other environments.

## 📬 Contact
Feel free to open an issue or pull request on GitHub.
Made with ❤️ by @cindy2536

