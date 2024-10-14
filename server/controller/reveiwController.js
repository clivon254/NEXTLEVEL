

import Product from "../model/productModel.js"
import Reveiw from "../model/reveiw.js"
import { errorHandler } from "../utils/error.js"


export const createReveiw = async (req,res,next) => {

   const {rating ,content}  = req.body

   const userId  = req.user.id

   const {productId}= req.params

    try
    {
        const existingReveiw = await Reveiw.findOne({userId,productId})

        if(existingReveiw)
        {
            return next(errorHandler(400,"you have already reviewed this product"))
        }

        const newReveiw = new Reveiw({
            userId,
            productId,
            rating,
            content
        })

        await newReveiw.save()

        //update productId
        const ratings = await Reveiw.find({productId})

        const averageRating = ratings.reduce((acc,curr) => acc + curr.rating, 0) / ratings.length

        await Product.findByIdAndUpdate(productId,{rating:averageRating})

        res.status(200).json({success:true ,message:'reveiw added successfully'})

    }
    catch(error)
    {
        next(error)
    }

}


export const getReveiws = async (req,res,next) => {

    const {productId} = req.params

    try
    {
        const reveiws = await Reveiw.find({productId})
                               .populate('userId')
                        

        res.status(200).json({success:true ,reveiws})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateReveiw = async (req,res,next) => {

    const {productId} = req.params

    const userId = req.user.id

    try
    {

        const existingReveiw = await Reveiw.findOne({userId, productId})

        if(!existingReveiw)
        {
            return next(errorHandler(404,  'reveiw not found'))
        }

        const updatedReveiw = await Reveiw.findByIdAndUpdate(
            existingReveiw._id,
            {
                $set:{
                    rating:req.body.rating,
                    content:req.body.content
                }
            },
            {new :true}
        )

       //update productId
       const ratings = await Reveiw.find({productId})

       const averageRating = ratings.reduce((acc,curr) => acc + curr.rating, 0) / ratings.length

       await Product.findByIdAndUpdate(productId, {rating:averageRating})

       res.status(200).json({success:true , updatedReveiw})
       
    }
    catch(error)
    {
        next(error)
    }

}


export const deleteReveiw = async (req,res,next) => {

    const {productId} = req.params

    const userId = req.user.id

    try
    {
        const reveiw = await Reveiw.findOne({productId, userId})

        if(!reveiw)
        {
            return next(errorHandler(404,"The reveiw is not found"))
        }

        await Reveiw.findByIdAndDelete(reveiw._id)

        //update productId
       const ratings = await Reveiw.find({productId})

       const averageRating = ratings.reduce((acc,curr) => acc + curr.rating, 0) / ratings.length

       await Product.findByIdAndUpdate(productId, {rating:averageRating})

       res.status(200).json({success:true , updatedReveiw})

    }
    catch(error)
    {
        next(error)
    }

}