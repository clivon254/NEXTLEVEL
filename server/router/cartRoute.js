


import express from "express"
import { addToCart, getCart, removeFromCart } from "../controller/cartController.js"
import { verifyToken } from "../utils/verify.js"



const cartRouter = express.Router()


cartRouter.post("/add-cart",verifyToken, addToCart)


cartRouter.post("/remove-cart",verifyToken, removeFromCart)


cartRouter.get("/get-cart",verifyToken, getCart)



export default cartRouter