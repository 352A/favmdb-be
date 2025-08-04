require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const cookieParser = require("cookie-parser");
const connectWithRetry = require("./utils/connectWithRetry");

// Load models
require("./models/User");
require("./models/Entry");

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const entryRoutes = require("./routes/entryRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api", entryRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
connectWithRetry(sequelize)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("💥 Failed to start server due to DB error:", err);
    process.exit(1);
  });
