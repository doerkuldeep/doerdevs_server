const User = require("../models/userModel");

const createUser = (req, res) => {
  const userData = req.body;
  if (!userData || Object.keys(userData).length === 0) {
    return res.status(400).send("Bad Request: No user data provided");
  }

  User.create(userData, (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).send("Conflict: User already exists");
      }
      return res.status(500).send("Internal Server Error");
    }
    res.status(201).send("User created successfully");
  });
};

const getAllUsers = (req, res) => {
  User.findAll((err, results) => {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    if (results.length === 0) {
      return res.status(404).send("Not Found: No users found");
    }
    res.status(200).json(results);
  });
};

module.exports = {
  createUser,
  getAllUsers,
};
