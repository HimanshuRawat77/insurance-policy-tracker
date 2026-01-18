import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();

/**
 * ✅ CORS configuration
 * This automatically handles preflight requests
 */
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options(/.*/, cors());

app.use(express.json());


app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.status(200).send("Insurance Tracker API running");
});

export default app;
