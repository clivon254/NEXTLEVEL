
import Order from "../model/orderModel.js"
import Product from "../model/productModel.js"
import User from "../model/userModel.js"
import { errorHandler } from "../utils/error.js"



export const createProduct = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"ony admin are allowed to add product"))
    }

    const {name,description,images,instock,regularPrice,discountPrice,wholesalePrice,tag1,tag2,sizes} = req.body

    try
    {
        const product = new Product({
            name,description,images,instock,regularPrice,discountPrice,wholesalePrice,tag1,tag2,sizes
        })

        await product.save()

        res.status(200).json({success:true, product ,message:`${name} is added successfully`})

    }
    catch(error)
    {
        next(error)
    }

}


export const getProducts = async (req,res,next) => {

    try
    {
        const sortDirection = req.query.order === "asc" ? 1 : -1

        const products = await Product.find({}).sort({createdAt:sortDirection})

        res.status(200).json({success:true, products})
    }
    catch(error)
    {
        next(error)
    }

}


export const getProduct = async (req,res,next) => {

    const {productId} = req.params

    try
    {
        const product = await Product.findById(productId)

        if(!product)
        {
            return next(errorHandler(404,"product not found"))
        }

        res.status(200).json({success:true ,product})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateProduct = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403, "You are not allowed to update the product"))
    }

    const {productId} = req.params

    try
    {
        const product = await Product.findById(productId)

        if(!product)
        {
            return next(errorHandler(404, "product not found"))
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
                $set:{
                   name:req.body.name,
                   description:req.body.description,
                   instock:req.body.instock,
                   regularPrice:req.body.regularPrice,
                   discountPrice:req.body.discountPrice,
                   wholesalePricePrice:req.body.wholesalePricePrice,
                   tag1:req.body.tag1,
                   tag2:req.body.tag2,
                   sizes:req.body.sizes,
                   images:req.body.images
                }
            },
            {new:true}
        )

        res.status(200).json({success:true ,updatedProduct})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteProduct = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403, "You are not allowed to delete product"))
    }

    const {productId} =  req.params

    try
    {
        const product = await Product.findById(productId)

        if(!product)
        {
            return next(errorHandler(404, "product not found"))
        }

        await Product.findByIdAndDelete(productId)

        res.status(200).json({success:true ,message:`${product.name} deleted successfully`})
    }
    catch(error)
    {
        next(error)
    }

}

export const stats = async (req,res,next) => {

    try
    {
        const {query} = req.query

        const numofDays = Number(query) || 28

        const currentDate = new Date()

        const startDate = new Date()

        startDate.setDate(currentDate.getDate() - numofDays)

        const totalProduct = await Product.find({}).countDocuments()
        
        const totalOrders = await Order.find({
           status:"Order Placed"
        }).countDocuments()

        const productOutStock = await Product.find({
            instock:0
        }).countDocuments()

        const totalUsers = await User.find({}).countDocuments()

        const orderStats = await Order.aggregate([
            {
                $match:{
                    createdAt:{$gte:startDate , $lte:currentDate}
                }
            },
            {
                $group:{
                    _id:{
                        $dateToString:{format:'%Y-%m-%d',date:"$createdAt"}
                    },
                    Total:{$sum:1}
                }
            },
            {$sort:{_id:1}}
        ])

        const last5Products = await Product.find({}).limit(5).sort({_id:-1})

        res.status(200).json({
            success:true,
            totalProduct,
            totalOrders,
            productOutStock,
            totalUsers,
            orderStats,
            last5Products
        })

    }
    catch(error)
    {
        next(error)
    }

}