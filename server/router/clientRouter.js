import express from 'express'
import {createClient, deleteRequest, getClient, getClientId, updateRequest, userRequest} from '../controller/receivingController.js'
import { authMiddleware } from "../controller/authController.js"

const clientRouter = express.Router()

clientRouter.post('/newClient', authMiddleware, createClient);
clientRouter.get('/getClient', getClient);
clientRouter.get('/getClient/:id', getClientId);
clientRouter.get('/userRequest', authMiddleware, userRequest);
clientRouter.delete('/delete/arf/:id', authMiddleware, deleteRequest)
clientRouter.put('/update/arf/:id', authMiddleware, updateRequest)

export default clientRouter;