

import mongoose from "mongoose"


const orderSchema = new mongoose.Schema({

    userId:{type:String, required:true},

    items:{type:Array, required:true},

    address:{type:Object, required:true},

    date:{type:String, default:Date.now()},

    payment:{type:Boolean, default:false},

    paymentMethod:{type:String, required:true}
},
    {
        timestamps:true
    }
)

const Order = mongoose.model('Order',orderSchema)


export default Order