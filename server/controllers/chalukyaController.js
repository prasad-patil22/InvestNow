import Chalukya from "../models/chalukyaModel.js";

const defaultChalukyaData = {
  landSolutions: [
    {
      title: "Residential Plots",
      desc: "Identification and guidance for residential plot parcels in strategic corridors suited for home building.",
      icon: "FaMapMarkedAlt",
      features: ["Residential corridor mapping", "Layout boundary checks", "Access road verification", "Documentation support"],
      priority: 1
    },
    {
      title: "Agricultural Land",
      desc: "Assistance with agricultural land search, soil suitability awareness, and rural property documentation.",
      icon: "FaTree",
      features: ["Agricultural parcel evaluation", "Pahani & RTC document checks", "Boundary assessment", "Transfer guidance"],
      priority: 2
    },
    {
      title: "Commercial Land",
      desc: "Commercial land options for business enterprises, warehousing, or commercial development requirements.",
      icon: "FaBuilding",
      features: ["Commercial zone checks", "Highway connectivity focus", "Size requirement matching", "Title verification"],
      priority: 3
    },
    {
      title: "Legal Support & Documentation",
      desc: "Comprehensive support for title verification, deed registration guidance, and paper verification.",
      icon: "FaFileContract",
      features: ["Encumbrance certificate review", "Title deed verification", "Stamp duty awareness", "Registration coordination"],
      priority: 4
    }
  ],
  whyConsider: [
    { title: "Land-Focused Assistance", desc: "Dedicated guidance specifically tailored for property and land transactions.", priority: 1 },
    { title: "Property-Related Guidance", desc: "Helping buyers navigate zoning considerations, location advantages, and layout details.", priority: 2 },
    { title: "Documentation Support", desc: "Paperwork scrutiny support to ensure transparent land transfers.", priority: 3 },
    { title: "Multiple Land Categories", desc: "Coverage across residential, agricultural, and commercial land classes.", priority: 4 },
    { title: "Customer-Oriented Approach", desc: "Clear communication with no hidden promises or unverified claims.", priority: 5 }
  ],
  landJourney: [
    { step: "01", title: "Requirement", icon: "FaSearch", text: "Specify your land budget, location preferences, and land-use purpose.", priority: 1 },
    { step: "02", title: "Property Identification", icon: "FaLayerGroup", text: "Shortlist suitable plots or land parcels matching your criteria.", priority: 2 },
    { step: "03", title: "Evaluation", icon: "FaClipboardCheck", text: "Physical verification, boundary check, and location assessment.", priority: 3 },
    { step: "04", title: "Documentation", icon: "FaFileContract", text: "Title verification, EC scrutiny, and paper preparation support.", priority: 4 },
    { step: "05", title: "Decision & Closing", icon: "FaHandshake", text: "Final sale agreement execution and registration coordination.", priority: 5 }
  ]
};

// @desc    Get Chalukya Developers content
// @route   GET /api/chalukya
// @access  Public
export const getChalukyaContent = async (req, res) => {
  try {
    let data = await Chalukya.findOne();

    if (!data) {
      data = await Chalukya.create(defaultChalukyaData);
    }

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.error("Error fetching Chalukya content:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching Chalukya Developers content",
      error: error.message
    });
  }
};

// @desc    Update Chalukya Developers content
// @route   PUT /api/chalukya OR POST /api/chalukya
// @access  Private (Admin)
export const updateChalukyaContent = async (req, res) => {
  try {
    const { landSolutions, whyConsider, landJourney } = req.body;

    let data = await Chalukya.findOne();

    if (data) {
      if (landSolutions !== undefined) data.landSolutions = landSolutions;
      if (whyConsider !== undefined) data.whyConsider = whyConsider;
      if (landJourney !== undefined) data.landJourney = landJourney;

      await data.save();
    } else {
      data = await Chalukya.create({
        landSolutions,
        whyConsider,
        landJourney
      });
    }

    res.status(200).json({
      success: true,
      message: "Chalukya Developers content updated successfully",
      data
    });
  } catch (error) {
    console.error("Error updating Chalukya content:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating Chalukya Developers content",
      error: error.message
    });
  }
};
