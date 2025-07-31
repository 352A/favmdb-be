require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

// Load models
require("./models/User");
require("./models/Entry");

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("Models synced");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });
