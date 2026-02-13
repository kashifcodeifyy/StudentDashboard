const Student = require("../models/Student");

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json({ error: "Database error" });
  }
};

exports.addStudent = async (req, res) => {
  const { name, email, course } = req.body;

  if (!name || !email || !course) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const newStudent = new Student({ name, email, course });
    const savedStudent = await newStudent.save();
    return res.status(201).json(savedStudent);
  } catch (err) {
    return res.status(500).json({ error: " not save " });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!student) return res.status(404).json({ error: " not found" });
    return res.status(200).json(student);
  } catch (err) {
    return res.status(500).json({ error: " failed" });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ error: " not found" });
    return res.status(200).json({ id: req.params.id, msg: " removed" });
  } catch (err) {
    return res.status(500).json({ error: " failed" });
  }
};
