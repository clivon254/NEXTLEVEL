
import Product from "../model/productModel.js"
import User from "../model/userModel.js"
import { errorHandler } from "../utils/error.js"



export const addToCart = async (req,res,next) => {

    const {size,itemId} = req.body

    const {id} = req.user

    try
    {
        const product = await Product.findById(itemId)

        if(!product)
        {
            return next(errorHandler(404,"product not found"))
        }

        const userData = await User.findById(id)

        if(!userData)
        {
            return next(errorHandler(404,"user not found"))
        }

        let cartData = await userData.cartData

        if(cartData[itemId])
        {
            if(cartData[itemId][size])
            {
                cartData[itemId][size] += 1
            }
            else
            {
                cartData[itemId][size] = 1
            }
        }
        else
        {
            cartData[itemId][size] = 1
        }

        await User.findByIdAndUpdate(id, {cartData})

        res.status(200).json({success:true , message:`${product.name} added to the cart `})

    }
    catch(error)
    {
        next(error)
    }

}


export const removeFromCart = async (req,res,next) => {


    const {id} = req.user

    const {itemId} = req.body

    try
    {
        const product = await Product.findById(itemId)

        if(!product)
        {
            return next(errorHandler(404,"product not found"))
        }

        let userData = await User.findById(id)

        if(!userData)
        {
            return next(errorHandler(404, "userData not found"))
        }

        let cartData = await userData.cartData

        if(cartData[itemId] > 0)
        {
            cartData[itemId] -= 1
        }
        else
        {
           return next(errorHandler(404,`${product.name} is not in the cart`))
        }

        await User.findByIdAndUpdate(id, {cartData})

        res.status(200).json({success:true, message:`${product.name} removed from cart`})

    }
    catch(error)
    {
        next(error)
    }

}


export const getCart = async (req,res,next) => {

    const {id} = req.user

    try
    {
        let userData = await User.findById(id)

        if(!userData)
        {
            return next(errorHandler(404, "userData not found"))
        }

        let cartData = await userData.cartData

        res.status(200).json({success:true ,cartData})
    }
    catch(error)
    {
        next(error)
    }

}