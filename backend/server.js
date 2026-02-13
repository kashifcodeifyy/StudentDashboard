const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

// Database Connect karein
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser

// Test Route
app.get("/", (req, res) => res.send("DevDash API is Running..."));
app.use("/api/students", require("./routes/students"));
app.use("/api/students", require("./routes/leadRoutes"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
