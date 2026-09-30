import mongoose from "mongoose";

const solutionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  desc: { type: String, required: true, trim: true },
  icon: { type: String, default: "FaMapMarkedAlt", trim: true },
  features: [{ type: String, trim: true }],
  priority: { type: Number, default: 1 }
});

const whySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  desc: { type: String, required: true, trim: true },
  priority: { type: Number, default: 1 }
});

const journeyStepSchema = new mongoose.Schema({
  step: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  text: { type: String, required: true, trim: true },
  icon: { type: String, default: "FaSearch", trim: true },
  priority: { type: Number, default: 1 }
});

const chalukyaSchema = new mongoose.Schema(
  {
    landSolutions: [solutionSchema],
    whyConsider: [whySchema],
    landJourney: [journeyStepSchema]
  },
  { timestamps: true }
);

const Chalukya = mongoose.model("Chalukya", chalukyaSchema);

export default Chalukya;
