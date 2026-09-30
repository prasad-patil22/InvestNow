import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: [true, "Full name is required"], trim: true },
    email: { type: String, required: [true, "Email address is required"], trim: true, lowercase: true },
    phone: { type: String, required: [true, "Phone number is required"], trim: true },
    service: { type: String, default: "General Enquiry", trim: true },
    message: { type: String, required: [true, "Message is required"], trim: true },
    status: { type: String, enum: ["Pending", "Replied"], default: "Pending" },
    reply: { type: String, default: "" },
    repliedAt: { type: Date }
  },
  { timestamps: true }
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);

export default Enquiry;
