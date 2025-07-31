const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, (req, res) => {
  res.json({
    message: "You have access!",
    user: req.user,
  });
});

module.exports = router;
