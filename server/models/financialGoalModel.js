import mongoose from "mongoose";

const pillarSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  desc: { type: String, required: true, trim: true },
  icon: { type: String, default: "FaChartLine", trim: true },
  details: [{ type: String, trim: true }],
  priority: { type: Number, default: 1 }
});

const journeyStepSchema = new mongoose.Schema({
  step: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  icon: { type: String, default: "FaBullseye", trim: true },
  text: { type: String, required: true, trim: true },
  priority: { type: Number, default: 1 }
});

const financialGoalSchema = new mongoose.Schema(
  {
    pillars: [pillarSchema],
    journeySteps: [journeyStepSchema]
  },
  { timestamps: true }
);

const FinancialGoal = mongoose.model("FinancialGoal", financialGoalSchema);

export default FinancialGoal;
