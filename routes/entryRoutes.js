const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");
const { entrySchema } = require("../validators/entryValidator");
const { createEntry, getEntries } = require("../controllers/entryController");
const { updateEntry } = require("../controllers/entryController");
const { deleteEntry } = require("../controllers/entryController");
const { getEntryById } = require("../controllers/entryController");

router.get("/entries/:id", authMiddleware, getEntryById);
router.delete("/entries/:id", authMiddleware, deleteEntry);
router.put("/entries/:id", authMiddleware, validate(entrySchema), updateEntry);
router.post("/entries", authMiddleware, validate(entrySchema), createEntry);
router.get("/entries", authMiddleware, getEntries);

module.exports = router;
