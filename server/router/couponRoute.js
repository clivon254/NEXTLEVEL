

import express from "express";
import { applyCoupon, generateCoupon, getCoupon } from "../controller/couponController.js";


const couponRouter = express.Router()



couponRouter.post("/generate-coupon", generateCoupon)

couponRouter.post("/apply-coupon", applyCoupon)

couponRouter.post("/get-coupons", getCoupon)

export default couponRouter 


