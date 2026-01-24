import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import policyRoutes from "./routes/policyRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/policies", policyRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Insurance Tracker API running");
});

export default app;
