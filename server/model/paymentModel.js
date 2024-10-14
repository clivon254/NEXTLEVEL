

import mongoose from "mongoose"


const paymentSchema = new mongoose.Schema({

    phone:{type:String, required:true},

    amount:{type:String, required:true},

    trnx_id:{type:String, required:true}
},
{timestamp:true})



const Payment = mongoose.model("Payment",paymentSchema)



export default Payment