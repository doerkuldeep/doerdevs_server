// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { isTokenBlacklisted } = require('../utils/blackListToken');

dotenv.config();

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }

  if (isTokenBlacklisted(token)) {
    return res.sendStatus(403);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
