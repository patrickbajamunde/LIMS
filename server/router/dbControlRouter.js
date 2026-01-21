import express from 'express';
import { countCorn, countRegulatory, countLgu, countResearch, countWalkin, countHVC, countRice, countGovtAgency, getForRelease, getReleased} from '../controller/dbConfigControl.js';
import { authMiddleware } from "../controller/authController.js"

const dbControlRouter = express.Router();

dbControlRouter.get('/countReg',countRegulatory);
dbControlRouter.get('/countCorn',countCorn);
dbControlRouter.get('/countLgu',countLgu);
dbControlRouter.get('/countResearch',countResearch);
dbControlRouter.get('/countWalkin',countWalkin);
dbControlRouter.get('/countHVC',countHVC);
dbControlRouter.get('/countRice',countRice);
dbControlRouter.get('/countGovtAgency',countGovtAgency);
dbControlRouter.get('/forRelease', authMiddleware,getForRelease)
dbControlRouter.get('/released',getReleased)

export default dbControlRouter;