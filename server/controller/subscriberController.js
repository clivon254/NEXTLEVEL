

import Subscribe from "../model/subscriberModel.js"
import { errorHandler } from "../utils/error.js"
import nodemailer from "nodemailer"


export const addSubcriber = async (req,res,next) => {

   const {email} = req.body

    try
    {
        const existingEmail = await Subscribe.findOne({email})

        if(existingEmail)
        {
            return next(errorHandler(400, "The email has already been subscribed"))
        }

        const newSubScriber = new Subscribe({
            email
        })

        await newSubScriber.save()


        res.status(200).json({success:true , message:"subscribe added successfully"})

    }
    catch(error)
    {
        next(error)
    }

}

export const sendSubcriber = async (req,res,next) => {

    const {message,subject} = req.body

    const userId = req.user.userId

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403, "you are not allowed to send message to the users"))
    }

    try
    {
        const subcribers = await Subscribe.find({})

        const recipientEmails = subcribers.map((subscriber) => subscriber.email).join(", ")

        var transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.AUTH_USER,
                pass:process.env.AUTH_PASS
            }
        })

        var mailOptions = {
            from:"NEXT LEVEL CLOTHING",
            to:recipientEmails,
            subject:subject,
            text:message
        }

        transporter.sendMail(mailOptions, (error,info) => {

            if(error)
            {
                console.log(error)
            }
            else
            {
                console.log("Email sent" + info.response)
            }
        })


        res.status(200).json({success:true , message:"messages sent successfully"})

    }
    catch(error)
    {
        next(error)
    }

}