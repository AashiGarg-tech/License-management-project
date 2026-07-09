import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dashboardRoutes from "./routes/dashboard.js";

import authRoutes from "./routes/auth.js";
import licenseRoutes from "./routes/license.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/license", licenseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.get("/", (req, res) => {
  res.send("API running");
});

const PORT =
  process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(
    `Server running on ${PORT}`
  );
});
