import express, { Router } from "express";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController";
import { validateBody, studentSchema } from "../validators/zodSchemas";

const router: Router = express.Router();

router.get("/", getStudents);

router.post("/", validateBody(studentSchema), addStudent);

router.put("/:id", validateBody(studentSchema.partial()), updateStudent);

router.delete("/:id", deleteStudent);

export default router;
