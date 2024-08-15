const db = require("../config/dbConfig");

const User = {
  create: (userData, callback) => {
    const query = "INSERT INTO users (name, email) VALUES (?, ?)";
    db.query(query, [userData.name, userData.email], callback);
  },
  findAll: (callback) => {
    const query = "SELECT * FROM users";
    db.query(query, callback);
  },
};

module.exports = User;
