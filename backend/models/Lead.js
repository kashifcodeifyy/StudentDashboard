const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    companyName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Contacted", "Interested", "Converted"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", LeadSchema);
