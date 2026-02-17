import express, { Router } from "express";
import {
  getLeads,
  addLead,
  updateLead,
  deleteLead,
} from "../controllers/leadController";

const router: Router = express.Router();

router.get("/", getLeads);

router.post("/", addLead);

router.put("/:id", updateLead);

router.delete("/:id", deleteLead);

export default router;
