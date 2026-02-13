const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

connectDB();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => res.send("DevDash API is Running..."));
app.use("/api/students", require("./routes/students"));
app.use("/api/leads", require("./routes/leadRoutes"));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
