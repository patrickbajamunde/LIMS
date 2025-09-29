import express from "express";
import { getAllActivities } from "../controller/activityController.js";
import { authMiddleware } from "../controller/authController.js";

const activityRouter = express.Router();

activityRouter.get("/recentActivities", authMiddleware, getAllActivities);

export default activityRouter;