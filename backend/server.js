const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

connectDB();

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => res.send("DevDash API is Running..."));

app.use("/api/students", require("./routes/students"));
app.use("/api/leads", require("./routes/leadRoutes"));
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
