

import express from "express"
import { addSubcriber, sendSubcriber } from "../controller/subscriberController.js"
import { verifyToken } from "../utils/verify.js"


const subscribeRouter = express.Router()


subscribeRouter.post('/add-subscriber', addSubcriber)


subscribeRouter.post('/send-subscribe',verifyToken, sendSubcriber)



export default subscribeRouter 