import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    icon: {
      type: String,
      default: "FaBriefcase",
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    features: {
      type: [String],
      required: true,
    },

    learnMoreLink: {
      type: String,
      default: "#",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;