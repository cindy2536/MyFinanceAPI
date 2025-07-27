// Defines income routes and connects them to incomeController

//Imports the Express.js framework module
const express = require("express");

//Create a routing instance
const router = express.Router();

//Import incomecontroller functions
const {
  getAllIncome,
  addIncome,
  updateIncome,
  deleteIncome
} = require("../controllers/incomeController");

// Define routes and link to controller 
// Route to get all income
router.get("/", getAllIncome);

// Route to add a new income
router.post("/", addIncome);

// Route to update an existing income by ID
router.put("/:id", updateIncome);

// Route to delete an income by ID
router.delete("/:id", deleteIncome);

module.exports = router;
