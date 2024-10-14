

import "dotenv/config"
import mongoose from "mongoose"
import express from "express"
import cors from "cors"
import authRouter from "./router/autRoute.js"
import userRouter from "./router/userRoute.js"
import productRouter from "./router/productRoute.js"
import cartRouter from "./router/cartRoute.js"
import orderRouter from "./router/orderRoute.js"



const app = express()


const  PORT = process.env.PORT


app.use(cors())

app.use(express.json())



// DB CONECTION
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB CONNECTED"))
.catch((err) => console.log(err))




// ROUTE
app.use("/api/auth", authRouter)


app.use("/api/user", userRouter)


app.use("/api/product", productRouter)


app.use("/api/cart", cartRouter)


app.use("/api/order", orderRouter)


//API
app.get('/',(req,res) => {

    res.send("HELLO NEXT NEXTLEVEL")

})



//APP LISTENING
app.listen(PORT,() => {

    console.log(`server running on port  ${PORT}`)

})


app.use((err,req,res,next) => {

    const statusCode = err.statusCode || 500

    const message = err.message || "Internal Server Error"

    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })

})
