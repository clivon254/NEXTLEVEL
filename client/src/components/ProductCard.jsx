


import React from 'react'
import { MdShoppingCartCheckout } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function ProductCard({product}) {

  

  return (

    <div className="w-full flex flex-col gap-y-1 rounded-t-xl shadow">

        {/* image */}
        <div className="w-full h-[150px]">

            <Link to={`/product/${product._id}`}>

                <img 
                    src={product?.images[0]} 
                    alt="" 
                    className="w-full h-full rounded-t-xl"
                />

            </Link>

        </div>

        <div className="space-y-2 px-2">

            <span className="text-[9px] dark:bg-secondaryLight bg-secondaryDark px-2 rounded-full">{product.tag2}</span>

            <h2 className="font-semibold text-wrap">{product.name}</h2>

            <div className="flex gap-1 items-center">

                <span className="text-[10px] text-red-300 line-through">{product?.regularPrice?.toLocaleString('en-Kenya', { style: 'currency', currency: 'KES' })}</span>

                <span className="font-semibold text-sm">{product?.discountPrice?.toLocaleString('en-Kenya', { style: 'currency', currency: 'KES' })}</span>   

            </div>

        </div>

    </div>

  )

}
