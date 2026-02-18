import express, { Router } from "express";
import { signup, login } from "../controllers/authController";
import {
  userSchema,
  loginSchema,
  validateBody,
} from "../validators/zodSchemas";

const router: Router = express.Router();

router.post("/signup", validateBody(userSchema), signup);
router.post("/login", validateBody(loginSchema), login);

export default router;
