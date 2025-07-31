const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    if (Array.isArray(err.issues)) {
      const messages = err.issues.map((e) => e.message);
      console.error("Validation failed:", messages);
      return res.status(400).json({ error: messages });
    }

    console.error("Unexpected validation error:", err);
    return res.status(400).json({ error: ["Invalid input"] });
  }
};

module.exports = validate;
