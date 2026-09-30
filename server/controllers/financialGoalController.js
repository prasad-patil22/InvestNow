import FinancialGoal from "../models/financialGoalModel.js";

const defaultFinancialGoalData = {
  pillars: [
    {
      title: "Wealth Creation",
      desc: "Build a structured approach toward long-term wealth through diversified financial planning and suitable investment options.",
      icon: "FaChartLine",
      details: [
        "Systematic investment planning (SIP)",
        "Multi-asset diversification",
        "Tax-conscious strategies",
        "Long-term compounding focus"
      ],
      priority: 1
    },
    {
      title: "Retirement Planning",
      desc: "Plan for financial independence by considering your long-term income and investment needs post-employment.",
      icon: "FaUmbrella",
      details: [
        "Retirement corpus estimation",
        "Pension & debt allocation",
        "Inflation-adjusted planning",
        "Regular income focus"
      ],
      priority: 2
    },
    {
      title: "Education Planning",
      desc: "Prepare financially for important higher education goals with structured savings and disciplined planning.",
      icon: "FaGraduationCap",
      details: [
        "Target milestone calculation",
        "Child education funds",
        "Risk-balanced portfolio",
        "Timed maturity alignment"
      ],
      priority: 3
    },
    {
      title: "Home & Property",
      desc: "Plan for property-related financial goals with a clear financial roadmap, home loan eligibility checks, and land options.",
      icon: "FaHome",
      details: [
        "Down-payment planning",
        "Home loan assistance",
        "Property title verification",
        "Chalukya land opportunities"
      ],
      priority: 4
    },
    {
      title: "Business Growth",
      desc: "Support business expansion, capital expenditure, and working capital requirements through suitable financial solutions.",
      icon: "FaBriefcase",
      details: [
        "Commercial loan assistance",
        "Working capital guidance",
        "Corporate risk insurance",
        "Business expansion support"
      ],
      priority: 5
    },
    {
      title: "Family & Asset Protection",
      desc: "Plan for protection needs involving family health, life risk coverage, emergency funds, and valuable asset security.",
      icon: "FaShieldAlt",
      details: [
        "Term life insurance review",
        "Health coverage evaluation",
        "Emergency fund planning",
        "Asset risk mitigation"
      ],
      priority: 6
    }
  ],
  journeySteps: [
    {
      step: "01",
      name: "Goal Identification",
      icon: "FaBullseye",
      text: "Define clear, quantifiable financial milestones (e.g., retirement age, target property date).",
      priority: 1
    },
    {
      step: "02",
      name: "Assessment",
      icon: "FaClipboardList",
      text: "Evaluate current income, assets, existing debt, and personal risk tolerance.",
      priority: 2
    },
    {
      step: "03",
      name: "Planning",
      icon: "FaCogs",
      text: "Structure an asset allocation roadmap incorporating suitable savings and investment instruments.",
      priority: 3
    },
    {
      step: "04",
      name: "Implementation",
      icon: "FaCheckDouble",
      text: "Execute planned financial actions, SIP setups, loan applications, or insurance policies.",
      priority: 4
    },
    {
      step: "05",
      name: "Periodic Review",
      icon: "FaSyncAlt",
      text: "Review progress annually and rebalance the portfolio as life circumstances evolve.",
      priority: 5
    }
  ]
};

// @desc    Get Financial Goals content
// @route   GET /api/financial-goals
// @access  Public
export const getFinancialGoalsContent = async (req, res) => {
  try {
    let data = await FinancialGoal.findOne();

    if (!data) {
      data = await FinancialGoal.create(defaultFinancialGoalData);
    }

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.error("Error fetching Financial Goals content:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching Financial Goals content",
      error: error.message
    });
  }
};

// @desc    Update Financial Goals content
// @route   PUT /api/financial-goals OR POST /api/financial-goals
// @access  Private (Admin)
export const updateFinancialGoalsContent = async (req, res) => {
  try {
    const { pillars, journeySteps } = req.body;

    let data = await FinancialGoal.findOne();

    if (data) {
      if (pillars !== undefined) data.pillars = pillars;
      if (journeySteps !== undefined) data.journeySteps = journeySteps;

      await data.save();
    } else {
      data = await FinancialGoal.create({
        pillars,
        journeySteps
      });
    }

    res.status(200).json({
      success: true,
      message: "Financial Goals content updated successfully",
      data
    });
  } catch (error) {
    console.error("Error updating Financial Goals content:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating Financial Goals content",
      error: error.message
    });
  }
};
