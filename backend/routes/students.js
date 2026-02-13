const express = require("express");
const router = express.Router();
const {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

router.route("/").get(getStudents).post(addStudent);

router.route("/:id").put(updateStudent).delete(deleteStudent);

module.exports = router;
