import express from "express";
import ensureAunthenticated from "../config/auth";
import { handleIndexRoute, handleDashboard } from "../controller/index"

const router = express.Router();

router.get("/", handleIndexRoute);
router.get("/dashboard", ensureAunthenticated, handleDashboard);

export default router;
