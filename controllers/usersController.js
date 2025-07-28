// Handles business logic for the users endpoints 
// Responsible for implementing specific function 

const db = require("../config/firebase");

// GET /users - Retrieve all users
exports.getAllUsers = async (req, res) => {
  try {
    //Fetch data from the "users" node in Firebase Realtime Database
    const snapshot = await db.ref("users").once("value");
    const userdata = snapshot.val();

    //Check whether any user data exists    
    if (!userdata) {
      // If no users found, respond with 404 Not Found
      return res.status(404).send("No users found!");
    }

    // Extract only the user objects, ignoring the keys
    const userList = Object.values(userdata);
    res.json(userList);
  } catch (error) {
    res.status(500).send("Failed to fetch users.");
  }
};

// POST /users - Add a new user
exports.addUser = async (req, res) => {
  try {
    const { name, username, email, address } = req.body;

    // check whether the necessary fields are provided
    if (!name || !username || !email || !address) {
      return res.status(400).send("One or more parameters are missing.");
    }

    //Fetch existing users to calculate next ID
    const snapshot = await db.ref("users").once("value");
    const userdata = snapshot.val() || {};
    //Calculate next user id  
    const nextId = Object.keys(userdata).length + 1;

    //Add new user
    const newUser = { 
        id: nextId,
        name, 
        username, 
        email, 
        address 
    };
    
    const newUserRef = db.ref("users").push(); //Generate a unique ID
    await newUserRef.set(newUser);   //write data

    res.status(201).json({
      message: "New user added successfully.",
      user: newUser
    });
  } catch (error) {
    res.status(500).send("Failed to add user.");
  }
};

// PUT /users/:id - Update an existing user by ID
exports.updateUser = async (req, res) => {
  try {

    //get id from the URL parameter of the request
    //Parse the id of string type to an integer
    const userId = parseInt(req.params.id); 
    const { name, username, email, address } = req.body;

    // check whether the necessary fields are provided
    if (!name && !username && !email && !address) {
      return res.status(400).send("No data to update.");
    }

    // get current all users
    const snapshot = await db.ref("users").once("value");
    const userdata = snapshot.val();
    
    // Check if there is a user with the specified ID
    let userKey = null;

    //Traverse all key-value pairs of the userdata object
    for (const [key, user] of Object.entries(userdata)) {   
      if (user.id === userId) {  //check current user's id , the target userId
        userKey = key;   //Find the matching user
        break;
      }
    }

    if (!userKey) {
      return res.status(400).send(`User with ID ${userId} not found.`);
    }
    //update the user data
    const updatedUser = {
      ...userdata[userKey],
      name: name || userdata[userKey].name,
      username: username || userdata[userKey].username,
      email: email || userdata[userKey].email,
      address: address || userdata[userKey].address
    };

    await db.ref(`users/${userKey}`).set(updatedUser);

    res.status(201).json({
      message: `User with ID ${userId} updated successfully.`,
      user: updatedUser
    });
  } catch (error) {
    res.status(500).send("Failed to update user.");
  }
};

// DELETE /users/:id - Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const snapshot = await db.ref("users").once("value");
    const userdata = snapshot.val();

    if (!userdata) {
      return res.status(400).send("No users found.");
    }

    let userKey = null;
    for (const [key, user] of Object.entries(userdata)) {
      if (user.id === userId) {
        userKey = key;
        break;
      }
    }

    if (!userKey) {
      return res.status(400).send(`User with ID ${userId} not found.`);
    }

    await db.ref(`users/${userKey}`).remove();

    res.status(201).json({
      message: `User with ID ${userId} has been deleted.`
    });
  } catch (error) {
    res.status(500).send("Failed to delete user.");
  }
};
