import Express from 'express';
import { createReport, deleteReports, getReports, getReportsId, updateReports, userReports } from '../controller/reportController.js';
import { authMiddleware } from "../controller/authController.js"
const reportRouter = Express.Router();

reportRouter.post('/newReport', authMiddleware, createReport);
reportRouter.get('/reportData', getReports);
reportRouter.get('/reportData/:id', getReportsId);
reportRouter.get('/userReports', authMiddleware, userReports)
reportRouter.delete('/delete/report/:id', authMiddleware,deleteReports)
reportRouter.put('/update/report/:id', authMiddleware, updateReports)

export default reportRouter;