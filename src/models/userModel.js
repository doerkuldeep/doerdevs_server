const db = require("../config/dbConfig");

const User = {
  create: (userData, callback) => {
    const query = "INSERT INTO admin (name, email) VALUES (?, ?)";
    db.query(query, [userData.name, userData.email], callback);
  },
  findAll: (callback) => {
    const query = "SELECT * FROM admin";
    db.query(query, callback);
  },
};

module.exports = User;
