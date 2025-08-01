const express = require("express");
const router = express.Router();
const { signup, login, logout } = require("../controllers/authController");
const { signupSchema, loginSchema } = require("../validators/authValidator");
const validate = require("../middlewares/validate");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/me", authMiddleware, (req, res) => {
  const { userId, name, email } = req.user;
  res.json({ user: { id: userId, name, email } });
});

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);

module.exports = router;
