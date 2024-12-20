

import mongoose from "mongoose"


const couponSchema = new mongoose.Schema({

    code:{type:String ,required:true ,unique:true},

    discount:{type:Number , required:true},

    maxUses:{type:Number , required:true},

    uses:{type:Number, default:0},

    expiresAt:{type:Date}
},
{
    timestamps:true
}
)


const Coupon = mongoose.model('Coupon', couponSchema)


export default Coupon