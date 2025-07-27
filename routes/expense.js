// Defines expense routes and connects them to expenseController

//Imports the Express.js framework module
const express = require("express");

//Create a routing instance
const router = express.Router();

//Import expensecontroller functions
const {
  getAllExpense,
  addExpense,
  updateExpense,
  deleteExpense
} = require("../controllers/expenseController");

//Define routes and link to controller 
//Route to get all expenses
router.get("/", getAllExpense);

// Route to add a new expense
router.post("/", addExpense);

// Route to update an existing expense by ID
router.put("/:id", updateExpense);

// Route to delete an expense by ID
router.delete("/:id", deleteExpense);

module.exports = router;

