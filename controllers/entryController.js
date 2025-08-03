const Entry = require("../models/Entry");
const { Op, fn, col, where: whereClause } = require("sequelize");

exports.createEntry = async (req, res) => {
  try {
    const {
      title,
      type,
      director,
      budget,
      location,
      durationHours,
      durationMinutes,
      seasons,
      year,
      details,
    } = req.body;
    const userId = req.user.id;

    const entry = await Entry.create({
      title,
      type,
      director,
      budget,
      location,
      durationHours,
      durationMinutes,
      seasons,
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
    const userId = req.user.id;
    const {
      cursor,
      limit = 10,
      title,
      type,
      year,
      director,
      location,
      budget,
      minBudget,
      maxBudget,
    } = req.query;

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

    if (director) {
      where.director = { [Op.like]: `%${director}%` };
    }

    if (location) {
      where.location = { [Op.like]: `%${location}%` };
    }

    if (budget) {
      where.budget = budget;
    }

    if (minBudget || maxBudget) {
      where.budget = {
        ...(minBudget && { [Op.gte]: Number(minBudget) }),
        ...(maxBudget && { [Op.lte]: Number(maxBudget) }),
      };
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
    const userId = req.user.id;
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
    const userId = req.user.id;

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
    const userId = req.user.id;

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
