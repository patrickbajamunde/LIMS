import express from "express";
import { getAllActivities } from "../controller/activityController.js";
import { authMiddleware } from "../controller/authController.js";

const activityRouter = express.Router();

activityRouter.get("/recentActivities", getAllActivities);

export default activityRouter;