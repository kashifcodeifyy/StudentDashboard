import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILead extends Document {
  name: string;
  companyName: string;
  email: string;
  phone?: string;
  status: "Pending" | "Contacted" | "Interested" | "Converted";
}

const LeadSchema: Schema<ILead> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Pending", "Contacted", "Interested", "Converted"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);
export default Lead;
