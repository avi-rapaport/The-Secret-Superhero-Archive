import z from "zod";

export const heroSchema = z.object({
  codeName: z.string().trim().min(1, { message: "code name cannot be empty!" }),
  powers: z
    .array(z.string())
    .nonempty({ message: "powers array cannot be empty!" }),
  threatLevel: z.number().int().min(1).max(10),
  status: z.enum(["active", "retired", "missing", "deceased"]),
  affiliations: z.array(z.string()).optional(),
  origin: z.string(),
  firstSighting: z.string().datetime(),
  notes: z.string(),
});
