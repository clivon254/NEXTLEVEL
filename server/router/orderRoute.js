


import express from "express";
import { adminOrders, afterDelivery, callback, mpesaPayment, stripePayment, updateStatus, userOrders, verifyOrder } from "../controller/orderController.js";
import { generateToken, verifyToken } from "../utils/verify.js";


const orderRouter = express.Router()


orderRouter.post('/stripe', verifyToken, stripePayment)


orderRouter.post('/verify-order',verifyOrder)


orderRouter.post('/mpesa', generateToken,verifyToken, mpesaPayment)


orderRouter.post('/callback', verifyToken, callback)


orderRouter.post('/COD',verifyToken, afterDelivery)


orderRouter.post('/admin-orders', verifyToken, adminOrders)


orderRouter.post('/user-orders', verifyToken, userOrders)


orderRouter.put('/update-status', verifyToken, updateStatus)



export default orderRouter