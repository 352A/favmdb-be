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
    const { cursor, limit = 10, title, type, year } = req.query;

    const where = { userId };

    if (cursor) {
      where.createdAt = { [Op.lt]: new Date(cursor) }; // fetch older than cursor
    }

    if (title) {
      where.title = { [Op.like]: `%${title}%` };
    }

    if (type) {
      where.type = type;
    }

    if (year) {
      where.year = year;
    }

    const entries = await Entry.findAll({
      where,
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit),
    });

    const nextCursor =
      entries.length > 0
        ? entries[entries.length - 1].createdAt.toISOString()
        : null;

    res.json({
      entries,
      nextCursor,
      hasMore: entries.length === parseInt(limit),
    });
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
