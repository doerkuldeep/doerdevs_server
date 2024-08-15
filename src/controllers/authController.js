
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const db = require("../config/dbConfig");
const { addTokenToBlacklist } = require("../utils/blackListToken");

dotenv.config();

const login = (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(400).send("User not found");
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid password");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  });
};

const logout = (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (token) {
    addTokenToBlacklist(token);
  }
  res.status(200).send("Logged out successfully");
};

module.exports = {
  login,
  logout,
};
