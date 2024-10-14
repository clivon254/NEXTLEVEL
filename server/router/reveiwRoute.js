

import express from "express"
import { verifyToken } from "../utils/verify.js"
import { createReveiw, deleteReveiw, getReveiws, updateReveiw } from "../controller/reveiwController.js"


const reveiwRouter = express.Router()


reveiwRouter.post("/create-reveiw/:productId", verifyToken, createReveiw)


reveiwRouter.get("/get-reveiws/:productId", verifyToken, getReveiws)


reveiwRouter.put("/update-reveiw/:productId", verifyToken, updateReveiw)


reveiwRouter.delete("/delete-reveiw/:productId", verifyToken, deleteReveiw)



export default reveiwRouter



