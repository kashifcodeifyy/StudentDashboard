import { Request, Response } from "express";
import Lead from "../models/Lead";

export const getLeads = async (req: Request, res: Response) => {
  try {
    const leads = await Lead.find();
    return res.status(200).json(leads);
  } catch (err) {
    return res.status(500).json({ error: "Database error" });
  }
};

export const addLead = async (req: Request, res: Response) => {
  try {
    const newLead = new Lead(req.body);
    const savedLead = await newLead.save();
    return res.status(201).json(savedLead);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};

export const updateLead = async (req: Request, res: Response) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedLead);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};

export const deleteLead = async (req: Request, res: Response) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    return res.status(200).json({ id: req.params.id });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
