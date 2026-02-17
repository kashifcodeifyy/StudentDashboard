import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import corsOptions from "./config/corsOptions";
import connectDB from "./config/db";

// Routes ko yahan import karein (require ki jagah)
import studentRoutes from "./routes/students";
import leadRoutes from "./routes/leadRoutes";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();

connectDB();

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("DevDash API is Running...");
});

// Ab yahan variables use karein
app.use("/api/students", studentRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
