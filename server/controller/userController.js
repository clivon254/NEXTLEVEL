


import bcryptjs from "bcryptjs"
import User from "../model/userModel.js"
import { errorHandler } from "../utils/error.js"



export const getUsers = async (req,res,next) => {

    try
    {
        const users = await User.find({})

        res.status(200).json({success:true , users})

    }
    catch(error)
    {
        next(error)
    }

}


export const getUser = async (req,res,next) => {

    const {userId} = req.params

    try
    {
        const user = await User.findById(userId)

        const {pass:password , ...rest} = user._doc

        res.status(200).json({success:true , rest})

    }
    catch(error)
    {
        next(error)
    }
}


export const updateUser = async (req,res,next) => {

    const {userId} = req.params

    if(req.user.id !== userId)
    {
        return next(errorHandler(403,"You are not allowed to update the user"))
    }

    try
    {

        if(req.body.password)
        {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set:{
                    username:req.body.username,
                    email:req.body.email,
                    password:req.body.password,
                    profilePicture:req.body.profilePicture
                }
            },
            {new:true}
        )

        const {password, ...rest} = updatedUser._doc

        res.status(200).json({success:true , rest})

    }
    catch(error)
    {
        next(error)
    }
}


export const deleteUser = async (req,res,next) => {

    const {userId} = req.params

    if(req.user.id !== userId )
    {
        return next(errorHandler(403, "You are not allowed to delete this user"))
    }

    try
    {

        await User.findByIdAndDelete(userId)

        res.status(200).json({success:true ,message:"user has been deleted"})
    }
    catch(error)
    {
        next(error)
    }
}