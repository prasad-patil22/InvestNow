import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, "Card title is required"],
    trim: true 
  },
  desc: { 
    type: String, 
    required: [true, "Card description is required"],
    trim: true 
  },
  icon: { 
    type: String, 
    default: "FaShieldAlt",
    trim: true 
  },
  priority: { 
    type: Number, 
    default: 1 
  }
});

const aboutSchema = new mongoose.Schema(
  {
    vision: {
      type: String,
      default: "To help individuals and businesses make informed financial decisions and work towards their long-term financial goals."
    },
    mission: [
      {
        type: String,
        trim: true
      }
    ],
    coreValues: [cardSchema],
    whyChooseUs: [cardSchema],
    whoWeServe: [cardSchema]
  },
  { timestamps: true }
);

const About = mongoose.model("About", aboutSchema);

export default About;
