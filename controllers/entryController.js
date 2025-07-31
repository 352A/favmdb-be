const Entry = require("../models/Entry");

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

    const entries = await Entry.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    res.json(entries);
  } catch (err) {
    console.error("Failed to fetch entries:", err);
    res.status(500).json({ error: "Something went wrong fetching entries" });
  }
};
