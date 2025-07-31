const { z } = require("zod");

const entrySchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["Movie", "TV Show"], {
    errorMap: () => ({ message: "Type must be 'Movie' or 'TV Show'" }),
  }),
  director: z.string().min(1, "Director is required"),
  budget: z.string().min(1, "Budget is required"),
  location: z.string().min(1, "Location is required"),
  duration: z.string().min(1, "Duration is required"),
  year: z.string().min(1, "Year is required"),
  details: z.string().optional(),
});

module.exports = { entrySchema };
