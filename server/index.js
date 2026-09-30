import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";


import adminRoutes from "./routes/adminRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import financialGoalRoutes from "./routes/financialGoalRoutes.js";
import chalukyaRoutes from "./routes/chalukyaRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import servicerouter from "./routes/serviceRoutes.js";

dotenv.config();

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Robust CORS Configuration for Vercel Frontend & Render Backend
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const cleanOrigin = origin.replace(/\/$/, "");
    if (
      allowedOrigins.includes(cleanOrigin) ||
      cleanOrigin.endsWith(".vercel.app") ||
      cleanOrigin.includes("localhost")
    ) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins to prevent CORS blocks in production
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
}));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/financial-goals", financialGoalRoutes);
app.use("/api/chalukya", chalukyaRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/services",servicerouter)

// Health check API
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});



// Server Initialization
const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL ;

mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected Successfully to MongoDB database");
    app.listen(PORT, () => console.log(`Server is running on Port:${PORT}`));
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message);
    app.listen(PORT, () => console.log(`Server running on Port:${PORT} (Express standalone mode)`));
  });
