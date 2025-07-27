
const express = require("express");
require("dotenv").config();

const userRoutes = require("./routes/users");
const expenseRoutes = require("./routes/expense");
const incomeRoutes = require("./routes/income");

const app = express();
const port = process.env.PORT || 3000;


// Middleware to parse incoming JSON requests
app.use(express.json()); 
app.use("/users",userRoutes);
app.use("/expense",expenseRoutes);
app.use("/income",incomeRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to MyFinanceAPI",
        description: "This API using Node.js with Express for tracking users, income, and expenses.",
        endpoints: {
            roots:[
                "GET /: A brief description of the REST API and Available Endpoints"
            ],
            users: [
               "GET /users  - Retrieve all users",
               "POST /users  - Add a new user",
               "PUT /users/:id  - Update an existing user by ID",
                "DELETE /users/:id - Delete a user by ID"
            ],
            expense: [
               "GET /expenses - Retrieve all expenses",
               "POST /expenses  - Add a new expense",
               "PUT /expenses/:id - Update an existing expense by ID",
               "DELETE /expenses/:id - Delete an expense by ID"
            ],
            income: [
               "GET /income  - Retrieve all income",
               "POST /income - Add a new income",
              "PUT /income/:id - Update an existing income by ID",
              "DELETE /income/:id - Delete an income by ID"
            ]
        }
    });
});


app.listen(port, () => {
  console.log(`Now is running on port ${port}`);
});
