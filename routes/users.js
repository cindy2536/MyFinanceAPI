// Defines users routes and connects them to usersController

//Imports the Express.js framework module
const express = require('express');

//Create a routing instance
const router = express.Router();

// Import userscontroller functions
const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser
} = require("../controllers/usersController");

// Define routes and link to controller 
// Route to get all users
router.get("/", getAllUsers);

// Route to add a new user
router.post("/", addUser);

// Route to update a user by ID
router.put("/:id", updateUser);

// Route to delete a user by ID
router.delete("/:id", deleteUser);

module.exports = router;
