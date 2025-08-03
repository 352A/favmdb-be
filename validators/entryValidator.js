const { z } = require("zod");

const entrySchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    type: z.enum(["Movie", "TV Show"], {
      errorMap: () => ({ message: "Type must be 'Movie' or 'TV Show'" }),
    }),
    director: z.string().min(1, "Director is required"),
    budget: z.number().min(0, "Budget must be a positive number"),
    location: z.string().min(1, "Location is required"),
    year: z
      .number()
      .int("Year must be an integer")
      .min(1800, "Year must be valid")
      .max(new Date().getFullYear() + 5, "Year is too far in the future"),
    details: z.string().min(1, "Details are required"),
    userId: z.number().optional(),
    durationHours: z.number().optional(),
    durationMinutes: z.number().optional(),
    seasons: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "Movie") {
      if (
        typeof data.durationHours !== "number" ||
        typeof data.durationMinutes !== "number" ||
        data.durationHours < 0 ||
        data.durationMinutes < 0 ||
        data.durationMinutes > 59
      ) {
        ctx.addIssue({
          message:
            "Movies require valid durationHours (>= 0) and durationMinutes (0–59)",
          path: ["durationHours"],
        });
      }
    }

    if (data.type === "TV Show") {
      if (typeof data.seasons !== "number" || data.seasons < 1) {
        ctx.addIssue({
          message: "TV Shows require a valid seasons count (1+)",
          path: ["seasons"],
        });
      }
    }
  });

module.exports = { entrySchema };
