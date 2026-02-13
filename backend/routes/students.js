const express = require("express");
const router = express.Router();
const {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

// Root routes
router.route("/").get(getStudents).post(addStudent);

// Routes with ID
router.route("/:id").put(updateStudent).delete(deleteStudent);

module.exports = router;
