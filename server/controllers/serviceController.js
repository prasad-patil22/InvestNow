import Service from "../models/serviceModel.js";

// ===============================
// CREATE SERVICE
// ===============================
export const createService = async (req, res) => {
  try {
    const {
      title,
      icon,
      description,
      features,
      learnMoreLink,
    } = req.body;

    const service = await Service.create({
      title,
      icon: icon || "FaBriefcase",
      description,
      features,
      learnMoreLink: learnMoreLink || "#",
    });

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    console.error("Create Service Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create service",
      error: error.message,
    });
  }
};


// ===============================
// GET ALL SERVICES
// ===============================
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Get Services Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch services",
      error: error.message,
    });
  }
};


// ===============================
// GET SERVICE BY ID
// ===============================
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    console.error("Get Service Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch service",
      error: error.message,
    });
  }
};


// ===============================
// UPDATE SERVICE
// ===============================
export const updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    console.error("Update Service Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update service",
      error: error.message,
    });
  }
};


// ===============================
// DELETE SERVICE
// ===============================
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete Service Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete service",
      error: error.message,
    });
  }
};