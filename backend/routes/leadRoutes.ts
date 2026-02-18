import express, { Router } from "express";
import {
  getLeads,
  addLead,
  updateLead,
  deleteLead,
} from "../controllers/leadController";

import { validateBody, leadSchema } from "../validators/zodSchemas";

const router: Router = express.Router();

router.get("/", getLeads);

router.post("/", validateBody(leadSchema), addLead);

router.put("/:id", validateBody(leadSchema.partial()), updateLead);

router.delete("/:id", deleteLead);

export default router;
