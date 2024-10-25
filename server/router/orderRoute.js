


import express from "express";
import { adminOrders, afterDelivery, callback, mpesaPayment, stripePayment, updateStatus, userOrders, verifyOrder } from "../controller/orderController.js";
import { generateToken, verifyToken } from "../utils/verify.js";


const orderRouter = express.Router()


orderRouter.post('/stripe', verifyToken, stripePayment)


orderRouter.post('/verify-order',verifyOrder)


orderRouter.post('/mpesa', generateToken,verifyToken, mpesaPayment)


orderRouter.post('/callback', callback)


orderRouter.post('/COD',verifyToken, afterDelivery)


orderRouter.get('/admin-orders', verifyToken, adminOrders)


orderRouter.get('/user-orders', verifyToken, userOrders)


orderRouter.put('/update-status', updateStatus)



export default orderRouter