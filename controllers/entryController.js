const Entry = require("../models/Entry");
const { Op, fn, col, where: whereClause } = require("sequelize");

exports.createEntry = async (req, res) => {
  try {
    const { title, type, director, budget, location, duration, year, details } =
      req.body;
    const userId = req.user.userId;

    const entry = await Entry.create({
      title,
      type,
      director,
      budget,
      location,
      duration,
      year,
      details,
      userId,
    });

    res.status(201).json(entry);
  } catch (err) {
    console.error("Failed to create entry:", err);
    res.status(500).json({ error: "Something went wrong creating the entry" });
  }
};

exports.getEntries = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { title, type, year } = req.query;

    const conditions = [{ userId }];

    if (title) {
      conditions.push(
        whereClause(fn("LOWER", col("title")), {
          [Op.like]: `%${title.toLowerCase()}%`,
        })
      );
    }

    if (type) {
      conditions.push({ type });
    }

    if (year) {
      conditions.push({ year });
    }

    const entries = await Entry.findAll({
      where: { [Op.and]: conditions },
      order: [["createdAt", "DESC"]],
    });

    res.json(entries);
  } catch (err) {
    console.error("Failed to fetch entries:", err);
    res.status(500).json({ error: "Something went wrong fetching entries" });
  }
};

exports.updateEntry = async (req, res) => {
  try {
    const entryId = req.params.id;
    const userId = req.user.userId;
    const updatedData = req.body;

    const entry = await Entry.findOne({ where: { id: entryId, userId } });

    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    await entry.update(updatedData);
    res.json(entry);
  } catch (err) {
    console.error("Failed to update entry:", err);
    res.status(500).json({ error: "Something went wrong updating the entry" });
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const entryId = req.params.id;
    const userId = req.user.userId;

    const entry = await Entry.findOne({ where: { id: entryId, userId } });

    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    await entry.destroy();
    res.json({ message: "Entry deleted successfully" });
  } catch (err) {
    console.error("Failed to delete entry:", err);
    res.status(500).json({ error: "Something went wrong deleting the entry" });
  }
};

exports.getEntryById = async (req, res) => {
  try {
    const entryId = req.params.id;
    const userId = req.user.userId;

    const entry = await Entry.findOne({ where: { id: entryId, userId } });

    if (!entry) {
      return res.status(404).json({ error: "Entry not found" });
    }

    res.json(entry);
  } catch (err) {
    console.error("Failed to fetch entry:", err);
    res.status(500).json({ error: "Something went wrong fetching the entry" });
  }
};
