

import mongoose from "mongoose"


const productSchema = new mongoose.Schema({

    name:{type:String, required:true},

    description:{type:String, required:true},

    images:{type:Array, required:true},

    instock:{type:Number, required:true},

    regularPrice:{type:Number, required:true},

    discountPrice:{type:Number, required:true},

    wholesalePrice:{type:Number, required:true},

    rating:{type:Number, default:5}
},
  {
    timestamps:true
  }
)

const Product = mongoose.model('Product', productSchema)


export default Product

