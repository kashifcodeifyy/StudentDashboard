import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name cannot exceed 50 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export const studentSchema = z.object({
  name: z.string().trim().min(2, "Name is too short"),
  email: z.string().trim().email("Invalid email address"),
  course: z.string().trim().min(1, "Course is required"),
});

export const leadSchema = z.object({
  name: z.string().min(2, "Lead name is required").trim(),
  companyName: z.string().min(1, "Company name is required").trim(),
  email: z.string().email("Invalid email format"),
  phone: z.string().optional(),
  status: z
    .enum(["Pending", "Contacted", "Interested", "Converted"])
    .default("Pending"),
});

export const validateBody =
  (schema: z.ZodSchema) => (req: any, res: any, next: any) => {
    try {
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          success: false,
          error: "Request body is empty or missing",
        });
      }

      schema.parse(req.body);
      next();
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errorMessage =
          error.issues?.[0]?.message ||
          error.errors?.[0]?.message ||
          "Validation failed";

        return res.status(400).json({
          success: false,
          error: errorMessage,
        });
      }

      console.error("Zod Middleware Error:", error);
      return res.status(500).json({
        success: false,
        error: "Internal Server Error",
      });
    }
  };
