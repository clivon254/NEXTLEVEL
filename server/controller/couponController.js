
import Coupon from "../model/coupons.js"
import { errorHandler } from "../utils/error.js"


export const generateCoupon = async (req,res,next) => {

    const {discount,maxUses} = req.body

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You not allowed to generated coupons"))
    }

    try
    {
        const coupon = new Coupon({
            code:generateRandomCode(),
            discount,
            maxUses
        })

        await coupon.save()

        res.status(200).json({success:true , coupon, message:"cououn has been generated"})

    }
    catch(error)
    {
        next(error)
    }

}


export const applyCoupon = async (req,res,next) => {

    const {code,totalCartAmount} = req.body

    try
    {
        const coupon = await Coupon.findOne({code})

        if(!coupon)
        { 
            return next(errorHandler(404,'Coupon not found'))
        }

        if(coupon.uses >= coupon.maxUses)
        {
            return next(errorHandler(400,'Coupon has been used maximum times'))
        }

        if(coupon.expiresAt &&  coupon.expiresAt < Date.now())
        {
            return next(errorHandler(400,'Coupon has expired'))
        }

        coupon.uses += 1

        const discountAmount = (totalCartAmount * coupon.discount) /100

        const newTotalCartAmount = totalCartAmount - discountAmount

        res.status(200).json({success:true , newTotalCartAmount})

    }
    catch(error)
    {
        next(error)
    }

}


export const getCoupon = async (req,res,next) => {

    try
    {
        const coupons = await Coupon.find({}).sort({_id:-1})

        res.status(200).json({success:true , coupons})

    }
    catch(error)
    {
        next(error)
    }

}


function generateRandomCode() {

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
    const codeLength = 8; // adjust the length of the code as needed
  
    let code = '';
  
    for (let i = 0; i < codeLength; i++) {
  
      code += characters[Math.floor(Math.random() * characters.length)];
  
    }
  
    return code;
  
  }