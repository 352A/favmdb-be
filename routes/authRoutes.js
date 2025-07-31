const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const { signupSchema, loginSchema } = require("../validators/authValidator");
const validate = require("../middlewares/validate");

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);

module.exports = router;
