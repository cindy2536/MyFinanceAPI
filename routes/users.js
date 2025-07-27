//Imports the Express.js framework module
const express = require('express');
//Create a routing instance
const router = express.Router();
const db = require("../config/firebase");


//Get/users - Retrieve all users
router.get("/", async (req, res) => {
  try {
    const snapshot = await db.ref("users").once("value");
    const userdata = snapshot.val() ;

    //check if the userdata is empty
    if (!userdata) {
        return res.status(404).send("No users found! ");
    }

    // only get value ,ignore key 
    const userList = Object.values(userdata);
    res.json(userList);
  } catch (error) {
    res.status(500).send("Failed to fetch the user");
  }
});


// POST -- Add a new user
router.post("/", async (req, res) => {
  try {
    const { name, username, email, address } = req.body;

    // check whether the necessary fields are provided
    if (!name || !username || !email || !address) {
      return res.status(400).send("One or more parameter is missing");
    }

    //get current all users
    const snapshot = await db.ref("users").once("value");
    const userdata = snapshot.val() ||{};

    //calculate the next id
    const nextId = Object.keys(userdata).length + 1;

    //create new user
    const newUser = {
      id:nextId,
      name,
      username,
      email,
      address
    };

    const newUserRef = db.ref("users").push(); 
    await newUserRef.set(newUser);

    res.status(201).json({ 
      message: "newUser is created",
      user:newUser
    });

  } catch (error) {
    res.status(500).send("Failed to add the user");
  }
});


// PUT --Update an existing user by ID
router.put("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { name, username, email, address } = req.body;

    // check whether the necessary fields are provided
    if (!name && !username && !email && !address) {
      return res.status(400).send("No data to update");
    }

    // get current all users
    const snapshot = await db.ref("users").once("value");
    const userdata = snapshot.val();

    // Check if there is a user with the specified ID 
    let userUpdate = null;
    for (const [key, user] of Object.entries(userdata)) {
      if (user.id === userId) {
        userUpdate = key;
        break;
      }
    }

    if (!userUpdate) {
      return res.status(400).send(`User with ID ${userId} not found`);
    }

    // update the item
    const updatedUser = {
      ...userdata[userUpdate],
      name: name || userdata[userUpdate].name,
      username: username || userdata[userUpdate].username,
      email: email || userdata[userUpdate].email,
      address: address || userdata[userUpdate].address
    };

    await db.ref(`users/${userUpdate}`).set(updatedUser);    

    res.status(201).json({ 
      message: `User with ID ${userId} updated successfully`,
      user: updatedUser
    });

  } catch (error) {
    res.status(500).send("Failed to update the user");
  }
});

// DELETE -- Delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    // get current all users
    const snapshot = await db.ref("users").once("value");
    const userdata = snapshot.val();

    if (!userdata) {
      return res.status(400).send("No users found.");
    }

    // look for the user ID key
    let userToDelete = null;
    for (const [key, user] of Object.entries(userdata)) {
      if (user.id === userId) {
        userToDelete = key;
        break;
      }
    }

    if (!userToDelete) {
      return res.status(400).send(`User with ID ${userId} not found.`);
    }

    // delete user from firebase
    await db.ref(`users/${userToDelete}`).remove();

    res.status(201).json({
      message: `User with ID ${userId} has been deleted.`
    });

  } catch (error) {
      res.status(500).send("Failed to delete the user.");
  }
});


module.exports = router;