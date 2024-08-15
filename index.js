const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");
const db = require("./src/config/dbConfig");
const logger = require("./src/middleware/logger");
const authenticateToken = require("./src/middleware/auth");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Use the logger middleware
app.use(logger);

// Authentication routes
app.use("/api/auth", authRoutes);

// Protect user routes with authentication middleware
app.use("/api/users", authenticateToken, userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
