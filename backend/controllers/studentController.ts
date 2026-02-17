import { Request, Response } from "express";
import Student from "../models/Student";

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find();
    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json({ error: "Database error" });
  }
};

export const addStudent = async (req: Request, res: Response) => {
  const { name, email, course } = req.body;

  if (!name || !email || !course) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const newStudent = new Student({ name, email, course });
    const savedStudent = await newStudent.save();
    return res.status(201).json(savedStudent);
  } catch (err) {
    return res.status(500).json({ error: "Not saved" });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!student) return res.status(404).json({ error: "Not found" });
    return res.status(200).json(student);
  } catch (err) {
    return res.status(500).json({ error: "Update failed" });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ error: "Not found" });
    return res.status(200).json({ id: req.params.id, msg: "Removed" });
  } catch (err) {
    return res.status(500).json({ error: "Delete failed" });
  }
};
