import express from "express"

import { create, getSamples, getSamplesId, userSamples } from "../controller/sampleController.js"
import { authMiddleware } from "../controller/authController.js"

const route = express.Router()

route.post("/samples", authMiddleware, create)
route.get("/userSamples", authMiddleware, userSamples)
route.get("/samples",getSamples)
route.get("/samples/:id", getSamplesId)  

export default route;