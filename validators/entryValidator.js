const { z } = require("zod");

const entrySchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.string().min(1, "Type is required"),
  director: z.string().min(1, "Director is required"),
  budget: z.number().min(0, "Budget must be a positive number"),
  location: z.string().min(1, "Location is required"),
  duration: z.string().min(1, "Duration is required"),
  year: z
    .number()
    .int("Year must be an integer")
    .min(1800, "Year must be valid")
    .max(new Date().getFullYear() + 5, "Year is too far in the future"),
  details: z.string().min(1, "Details are required"),
  userId: z.number().optional(),
});

module.exports = { entrySchema };
