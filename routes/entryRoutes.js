const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");
const { entrySchema } = require("../validators/entryValidator");
const { createEntry, getEntries } = require("../controllers/entryController");

router.post("/entries", authMiddleware, validate(entrySchema), createEntry);
router.get("/entries", authMiddleware, getEntries);

module.exports = router;
