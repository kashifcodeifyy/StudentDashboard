const express = require("express");
const router = express.Router();
const {
  getLeads,
  addLead,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");

router.route("/").get(getLeads).post(addLead);

router.route("/:id").put(updateLead).delete(deleteLead);

module.exports = router;
