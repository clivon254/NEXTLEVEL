
import User from "../model/userModel.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from "bcryptjs"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"



export const signup = async (req,res,next) => {

    const {username,password,email} = req.body

    if(!username || !password || !email || username === "" || email === "" || password === "")
    {
        return next(errorHandler(400, "please fill all the feilds"))
    }

    const hashedPassword = bcryptjs.hashSync(password ,10)

    const newUser = new User({
        username,
        password:hashedPassword,
        email
    })

    try
    {
        await newUser.save()

        res.status(200).json({success:true , message:`You have successfully signed up ${newUser.username}`})

    }
    catch(error)
    {
        next(error)
    }
}


export const signin = async (req,res,next) => {

    const {email, password} = req.body ;

    if(!email || !password || email === "" || password === "")
    {
        return next(errorHandler(400,"please fill all the required fields"))
    }

    try
    {
        const user = await User.findOne({email})

        if(!user)
        {
            return next(errorHandler(404,"user not found"))
        }

        const isMatch = await bcryptjs.compare(password, user.password)

        if(!isMatch)
        {
            return next(errorHandler(401, "invalid password"))
        }

        const token = jwt.sign(
            {id:user._id , isAdmin:user.isAdmin},
            process.env.JWT_SECRETE
        )

        const {password:pass, ...rest} = user._doc


        res.status(200).json({success:true ,rest ,token})

    }   
    catch(error)
    {
        next(error)
    }
}


export const google = async (req,res,next) => {

    try
    {
        const user = await User.findOne({email:req.body.email})

        if(user)
        {
            const token = jwt.sign(
                {id:user._id , isAdmin:user.isAdmin},
                process.env.JWT_SECRETE
            )
    
            const {password:pass, ...rest} = user._doc
    
    
            res.status(200).json({success:true ,rest ,token})
        }
        else
        {
            const generatedPassword = Math.random().toString(36).slice(-8) + 
                                      Math.random().toString(36).slice(-8) 

            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)

            const newUser = new User({
                username:req.body.name.split(' ').join(' ').toLowerCase() + Math.random().toString(36).slice(-8),
                email:req.body.email,
                password:hashedPassword,
                profilePicture:req.body.photo
            })

            await newUser.save()

            const token = jwt.sign(
                {id:newUser._id , isAdmin:newUser.isAdmin},
                process.env.JWT_SECRETE
            )
    
            const {password:pass, ...rest} = newUser._doc
    
    
            res.status(200).json({success:true ,rest ,token})
        }

    }
    catch(error)
    {
        next(error)
    }
}


export const forgotPassword = async (req,res,next) => {

    const {email} = req.body

    const user = await User.findOne({email})

    if(!user)
    {
        return next(errorHandler(404,"User not found"))
    }

    try
    {

        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRETE,
            {expiresIn:"1h"}
        )

        var transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.AUTH_USER,
                pass:process.env.AUTH_PASS
            }
        })

        var mailOptions = {
            from:"NEXTLEVEL CLOTHING",
            to:user.email,
            subject:"Reset Password",
            text:`Click on this link to reset your password:http://localhost:5173/reset-password/${token}`
        }

        transporter.sendMail(mailOptions, (error ,info) => {

            if(error)
            {
                console.log(error)
            }
            else
            {
                console.log("Email sent" + info.response)
            }

        })

        res.status(200).json({success:true ,message:"Link sent to your email successfully"})

   }
    catch(error)
    {
        next(error)
    }
}


export const resetPassword = async (req,res,next) => {

    const {token} = req.params

    const {password, confirmPassword} = req.body

    try
    {
        const decodedToken = jwt.verify(token ,process.env.JWT_SECRETE)

       const user = await User.findById(decodedToken.id)

       if(!user)
       {
         return res.status(404).json({success:false ,message:"User not found"})
       }

       if(password !==  confirmPassword)
       {
        return next(errorHandler(400,"password and confirmedPassword must be same"))
       }

       const hashedPassword = bcryptjs.hashSync(password, 10)

       user.password = hashedPassword

       await user.save()

       res.status(200).json({success:true ,message:"password successfully reset"})

    }
    catch(error)
    {
        next(error)
    }
}




