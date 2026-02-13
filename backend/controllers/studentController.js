// controllers/studentController.js
const Student = require("../models/Student");

// 1. Get All Students
exports.getStudents = async (req, res) => {
  console.log("Incoming Request: Fetching Students...");
  try {
    const students = await Student.find();
    console.log(" Data fetched from DB:", students.length);
    return res.status(200).json(students);
  } catch (err) {
    console.error("DB Query Error:", err.message);
    return res.status(500).json({ error: "Database error" });
  }
};

// 2. Add Student
exports.addStudent = async (req, res) => {
  console.log("📥 Incoming Request: Adding Student...", req.body);
  const { name, email, course } = req.body;

  if (!name || !email || !course) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const newStudent = new Student({ name, email, course });
    const savedStudent = await newStudent.save();
    console.log("✅ Student Saved!");
    return res.status(201).json(savedStudent);
  } catch (err) {
    console.error("❌ Save Error:", err.message);
    return res.status(500).json({ error: "Could not save student" });
  }
};

// 3. Update Student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!student) return res.status(404).json({ error: "Student not found" });
    return res.status(200).json(student);
  } catch (err) {
    return res.status(500).json({ error: "Update failed" });
  }
};

// 4. Delete Student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    return res.status(200).json({ id: req.params.id, msg: "Student removed" });
  } catch (err) {
    return res.status(500).json({ error: "Delete failed" });
  }
};
