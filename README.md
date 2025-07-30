# MyFinanceAPI
A simple REST API using Node.js with Express for tracking users, income, and expenses. Built with Node.js, Express, and Firebase Realtime Database.


## Live Deployment
🔗 https://myfinanceapi-nfec.onrender.com


## Project Structure
MyFinanceAPI/
├── config/ # Firebase configuration
│ └── firebase.js
├── controllers/ # Business logic for each route
│ ├── expenseController.js
│ ├── incomeController.js
│ └── usersController.js
├── public/ # static resource
│ ├── index.html
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
    - Organized routing using Express Router
    - Modular architecture with a dedicated `controllers/` directory for business logic separation
    - Secure configuration using `.env` and environment variables
    - Deployment-ready: Hosted on Render

## API Endpoints
    - GET /: A brief description of the REST API and Available Endpoints

### Users Endpoints

| Method | Endpoint         | Description                      |
|--------|------------------|----------------------------------|
| GET    | `/users`         | Retrieve all users               |
| POST   | `/users`         | Add a new user                   |
| PUT    | `/users/:id`     | Update user by ID                |
| DELETE | `/users/:id`     | Delete user by ID                |

### Income Endpoints

| Method | Endpoint         | Description                      |
|--------|------------------|----------------------------------|
| GET    | `/income`        | Retrieve all income data         |
| POST   | `/income`        | Add new income data              |
| PUT    | `/income/:id`    | Update income data by ID         |
| DELETE | `/income/:id`    | Delete income data by ID         |

### Expense Endpoints

| Method | Endpoint         | Description                      |
|--------|------------------|----------------------------------|
| GET    | `/expenses`      | Retrieve all expense data        |
| POST   | `/expenses`      | Add new expense data             |
| PUT    | `/expenses/:id`  | Update expense data by ID        |
| DELETE | `/expenses/:id`  | Delete expense data by ID        |

> All data is stored in Firebase Realtime Database. Use Postman tool for testing.


## API Overview Page (HTML)
A simple static page is included to provide a visual overview of the API and direct access to key endpoints.

### Location: /public/index.html

### Features: Shows API name and description
    -- Text linking to:
       /users
       /income
       /expense

## Environment Variables

Create a `.env` file in the root folder based on the .env example file

FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

Important: Never commit or share your .env file publicly.


## Installation & Run Locally

> Use any terminal (e.g., Git Bash, PowerShell, or VS Code Terminal)

### 1. Clone the repository
```bash
git clone https://github.com/cindy2536/MyFinanceAPI.git
```
### 2. Navigate into the project folder
```bash
cd MyFinanceAPI
```
### 3. Install dependencies
```bash
npm install
```
### 4. Initialize Firebase Database with Sample Data
```bash
node initialdata.js
```
### 5. Start the server
```bash
node index.js  
```
> Manually open a browser and type http://localhost:3000


## Contact
If you have any questions, suggestions, or collaboration requests, feel free to reach out:
-- Github: https://github.com/cindy2536
