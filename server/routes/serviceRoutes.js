import express from "express";

import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

const servicerouter = express.Router();

servicerouter.post("/", createService);

servicerouter.get("/", getAllServices);

servicerouter.get("/:id", getServiceById);

servicerouter.put("/:id", updateService);

servicerouter.delete("/:id", deleteService);

export default servicerouter;