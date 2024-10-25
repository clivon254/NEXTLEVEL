

import express from "express";
import { applyCoupon, generateCoupon, getCoupon } from "../controller/couponController.js";
import { verifyToken } from "../utils/verify.js";


const couponRouter = express.Router()



couponRouter.post("/generate-coupon",verifyToken, generateCoupon)


couponRouter.post("/apply-coupon", verifyToken, applyCoupon)


couponRouter.get("/get-coupons", getCoupon)



export default couponRouter 


