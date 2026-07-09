import express from "express";
import { getPredictions } from "../controllers/xgboostController.js";

const router = express.Router();

router.get("/predictions", getPredictions);

export default router;