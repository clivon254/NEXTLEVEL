


import Stripe from "stripe"
import User from "../model/userModel.js"
import Order from "../model/orderModel.js"
import Payment from "../model/paymentModel.js"
import Product from "../model/productModel.js"
import axios from "axios"



const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY)


// stripe
export const stripePayment = async (req,res,next) => {

    const frontend_url = "https://nextlevel-1-9qp2.onrender.com"

    const {items,address,paymentmethod,amount} = req.body

    const userId = req.user.id

    try
    {
        const newOrder = new Order({
            items,
            address,
            paymentmethod,
            amount,
            userId
        })

        await User.findByIdAndUpdate(userId, {cartData:{}})

        const line_items = items.map((item) => (
            {
                price_data:{
                    currency:'usd',
                    product_data:{
                        name:item.name,
                    },
                    unit_amount:item.discountPrice
                },
                quantity:item.quantity
            }
        ))

        line_items.push({
            price_data:{
                currency:'usd',
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:100
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        await newOrder.save()

        res.status(200).json({success:true ,session_url:session.url, newOrder})
    }
    catch(error)
    {
        next(error)
    }

}


export const verifyOrder = async (req,res,next) => {

    const {orderId, success} = req.body

    try
    {
        if(success === 'true')
        {
            await Order.findByIdAndUpdate(orderId,{payment:true})

            res.status(200).json({success:true ,message:"Paid"})
        }
        else
        {
            await Order.findByIdAndDelete(orderId)

            res.status({success:true ,message:"Not paid"})
        }

    }
    catch(error)
    {
        next(error)
    }

}

// mpesa
export const mpesaPayment = async (req,res,next) => {

    const {items,address,paymentmethod,amount} = req.body

    const userId = req.user.id

    const token = req.token ;

    try
    {
        const newOrder = new Order({
            items,
            address,
            paymentmethod,
            amount,
            userId
        })

        await User.findByIdAndUpdate(userId, {cartData:{}})

        const phone = address.phone.substring(1)

        const date = new Date()

        const timestamp = 
            date.getFullYear() +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            ("0" + date.getDate()).slice(-2) +
            ("0" + date.getHours()).slice(-2) +
            ("0" + date.getMinutes()).slice(-2) +
            ("0" + date.getSeconds()).slice(-2) 
    
        const shortcode = process.env.PAYBILL

        const passkey = process.env.PASS_KEY

        const password = new Buffer.from(shortcode + passkey + timestamp).toString("base64")

        await axios.post(
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        {    
            "BusinessShortCode": shortcode,    
            "Password": password,    
            "Timestamp":timestamp,    
            "TransactionType": "CustomerPayBillOnline",    
            "Amount": amount,    
            "PartyA":`254${phone}`,    
            "PartyB":shortcode,    
            "PhoneNumber":`254${phone}`,    
            "CallBackURL": "https://nextlevel-dj4d.onrender.com/api/order/callback",    
            "AccountReference":"NEXT LEVEL CLOTHING",    
            "TransactionDesc":"Test"
        },
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        .then((response) => {

            let resData = response.resData

            console.log(resData)

            res.status(200).json({success:true , resData})

            newOrder.save()
        })
    }
    catch(error)
    {
        console.log(error.message)

        next(error)
    }

}


export const callback = async (req,res,next) => {

    try
    {
        const callbackData = req.body

        if(!callbackData.Body.stkCallback.CallbackMetadata)
        {
            console.log(callbackData.Body)

            res.json("ok")
        }

        const phone = callbackData.Body.stkCallback.CallbackMetadata.Item[4].Value

        const amount = callbackData.Body.stkCallback.CallbackMetadata.Item[0].Value

        const trnx_id = callbackData.Body.stkCallback.CallbackMetadata.Item[1].Value

        const payment = new Payment({
            phone,
            amount,
            trnx_id
        })

        console.log(callbackData.Body.stkCallback.CallbackMetadata)

        await payment.save()

        res.status(200).json({success:true, payment})

    }
    catch(error)
    {
        next(error)
    }

}

// after delivery
export const afterDelivery = async (req,res,next) => {

    const {items,address,paymentmethod,amount} = req.body

    const userId = req.user.id

    try
    {
        const newOrder = new Order({
            items,
            address,
            paymentmethod,
            amount,
            userId
        })


        await newOrder.save()

        await User.findByIdAndUpdate(userId, {cartData:{}})

        res.status(200).json({success:true , newOrder})
    }
    catch(error)
    {
        next(error)
    }

}


// orders
export const adminOrders = async (req,res,next) => {

    try
    {
        const sortDirection = req.query.order === 'asc' ? 1 : -1

        const orders = await Order.find({}).sort({createdAt:sortDirection})

        res.status(200).json({success:true , orders})
    }
    catch(error)
    {
        next(error)
    }

}


export const userOrders = async (req,res,next) => {


    try
    {
        const sortDirection = req.query.order === 'asc' ? 1 : -1

        const orders = await Order.find({userId:req.user.id}).sort({createdAt:sortDirection})

        res.status(200).json({success:true ,orders})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateStatus = async (req,res,next) => {

    const {orderId, status} =req.body

    try
    {
        await Order.findByIdAndUpdate(orderId, {status:status})

        res.status(200).json({success:true, message:"status has been updated"})

    }
    catch(error)
    {
        next(error)
    }

}
