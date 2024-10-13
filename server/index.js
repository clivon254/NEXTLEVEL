

import "dotenv/config"
import mongoose from "mongoose"
import express from "express"
import cors from "cors"



const app = express()


const  PORT = process.env.PORT


app.use(cors())

app.use(express.json())


// DB CONECTION
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB CONNECTED"))
.catch((err) => console.log(err))



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
