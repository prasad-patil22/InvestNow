import About from "../models/aboutModel.js";

// Default initial data to seed if DB is empty
const defaultAboutData = {
  vision: "To help individuals and businesses make informed financial decisions and work towards their long-term financial goals.",
  mission: [
    "Provide transparent, objective guidance tailored around each client's specific financial goals.",
    "Deliver accessible financial solutions spanning loans, insurance, investments, and property documentation.",
    "Foster long-term relationships built on integrity, responsiveness, and responsible financial advice."
  ],
  coreValues: [
    { title: "Trust", desc: "Building long-term relationships anchored on confidence, reliability, and security.", icon: "FaShieldAlt", priority: 1 },
    { title: "Transparency", desc: "Clear information and straightforward guidance without hidden complexities.", icon: "FaEye", priority: 2 },
    { title: "Integrity", desc: "Adhering to ethical business practices and high professional standards at all times.", icon: "FaHandshake", priority: 3 },
    { title: "Customer Focus", desc: "Designing financial solutions tailored around your personal needs and priorities.", icon: "FaUserCheck", priority: 4 },
    { title: "Professionalism", desc: "Delivering knowledgeable financial consultation with diligence and accountability.", icon: "FaUserTie", priority: 5 },
    { title: "Long-Term Thinking", desc: "Focusing on sustainable wealth planning and future stability over short-term trends.", icon: "FaChartLine", priority: 6 }
  ],
  whyChooseUs: [
    { title: "Experienced Guidance", desc: "Structured assistance from knowledgeable consultants dedicated to your success.", icon: "FaUserTie", priority: 1 },
    { title: "Transparent Approach", desc: "Open communication regarding products, terms, eligibility, and risk considerations.", icon: "FaEye", priority: 2 },
    { title: "Multiple Financial Solutions", desc: "Access solutions across Mutual Funds, Insurance, Loans, Wealth Management, and Land Links.", icon: "FaBriefcase", priority: 3 },
    { title: "Goal-Oriented Planning", desc: "Financial strategies tailored around specific milestones such as retirement, home, or business.", icon: "FaBullseye", priority: 4 },
    { title: "Personalized Support", desc: "Dedicated assistance through every stage of your financial planning and execution.", icon: "FaUserCheck", priority: 5 },
    { title: "Relationship-Focused Service", desc: "We prioritize long-term client relationships over transactional interactions.", icon: "FaHandshake", priority: 6 }
  ],
  whoWeServe: [
    { title: "Individuals", desc: "Tailored planning for personal wealth growth, savings, and financial security.", icon: "FaUserCheck", priority: 1 },
    { title: "Families", desc: "Comprehensive protection and goal-based planning for family health and education.", icon: "FaUsers", priority: 2 },
    { title: "Salaried Professionals", desc: "Tax-efficient savings, SIP plans, and loan assistance for working individuals.", icon: "FaUserTie", priority: 3 },
    { title: "Business Owners", desc: "Business loans, corporate insurance, and capital management solutions.", icon: "FaBriefcase", priority: 4 },
    { title: "Entrepreneurs", desc: "Financial guidance for startup funding requirements and cash flow planning.", icon: "FaLightbulb", priority: 5 },
    { title: "Corporate Clients", desc: "Group coverage, banking assistance, and corporate financial consultation.", icon: "FaBuilding", priority: 6 },
    { title: "Property/Land Buyers", desc: "Land documentation, title verification support, and property loan assistance.", icon: "FaHome", priority: 7 }
  ]
};

// @desc    Get About Us page content
// @route   GET /api/about
// @access  Public
export const getAboutContent = async (req, res) => {
  try {
    let about = await About.findOne();
    
    // Seed default if empty
    if (!about) {
      about = await About.create(defaultAboutData);
    }

    res.status(200).json({
      success: true,
      data: about
    });
  } catch (error) {
    console.error("Error fetching About content:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching About Us content",
      error: error.message
    });
  }
};

// @desc    Update or create About Us page content
// @route   PUT /api/about OR POST /api/about
// @access  Private (Admin)
export const updateAboutContent = async (req, res) => {
  try {
    const { vision, mission, coreValues, whyChooseUs, whoWeServe } = req.body;

    let about = await About.findOne();

    if (about) {
      if (vision !== undefined) about.vision = vision;
      if (mission !== undefined) about.mission = mission;
      if (coreValues !== undefined) about.coreValues = coreValues;
      if (whyChooseUs !== undefined) about.whyChooseUs = whyChooseUs;
      if (whoWeServe !== undefined) about.whoWeServe = whoWeServe;

      await about.save();
    } else {
      about = await About.create({
        vision,
        mission,
        coreValues,
        whyChooseUs,
        whoWeServe
      });
    }

    res.status(200).json({
      success: true,
      message: "About Us content updated successfully",
      data: about
    });
  } catch (error) {
    console.error("Error updating About content:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating About Us content",
      error: error.message
    });
  }
};
