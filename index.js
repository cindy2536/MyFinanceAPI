
const express = require("express");
require("dotenv").config();

const userRoutes = require("./routes/users");
const expenseRoutes = require("./routes/expense");
const incomeRoutes = require("./routes/income");
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;


// Middleware to parse incoming JSON requests
app.use(express.json()); 
app.use("/users",userRoutes);
app.use("/expense",expenseRoutes);
app.use("/income",incomeRoutes);

//Serve static files index.html from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
