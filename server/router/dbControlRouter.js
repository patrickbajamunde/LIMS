import express from 'express';
import { countCorn, countRegulatory, countLgu, countResearch, countWalkin, countHVC, countRice, countGovtAgency, getForRelease, getReleased} from '../controller/dbConfigControl.js';
import { authMiddleware } from "../controller/authController.js"

const dbControlRouter = express.Router();

dbControlRouter.get('/countReg', authMiddleware, countRegulatory);
dbControlRouter.get('/countCorn', authMiddleware, countCorn);
dbControlRouter.get('/countLgu', authMiddleware, countLgu);
dbControlRouter.get('/countResearch', authMiddleware, countResearch);
dbControlRouter.get('/countWalkin', authMiddleware, countWalkin);
dbControlRouter.get('/countHVC', authMiddleware, countHVC);
dbControlRouter.get('/countRice', authMiddleware, countRice);
dbControlRouter.get('/countGovtAgency', authMiddleware, countGovtAgency);
dbControlRouter.get('/forRelease', authMiddleware,getForRelease)
dbControlRouter.get('/released', authMiddleware, getReleased)

export default dbControlRouter;