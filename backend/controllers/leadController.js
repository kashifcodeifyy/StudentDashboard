const Lead = require("../models/Lead");

// 1. Get Leads

exports.getLeads = async (req, res) => {
  console.log("Incoming Request: Fetching Students...");
  try {
    const leads = await Lead.find();
    console.log(" Data fetched from DB:", leads.length);
    return res.status(200).json(leads);
  } catch (err) {
    console.error("DB Query Error:", err.message);
    return res.status(500).json({ error: "Database error" });
  }
};

// 2. Add Lead
exports.addLead = async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    const savedLead = await newLead.save();
    return res.status(201).json(savedLead);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// 3. Update Lead
exports.updateLead = async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedLead);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// 4. Delete Lead
exports.deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    return res.status(200).json({ id: req.params.id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
